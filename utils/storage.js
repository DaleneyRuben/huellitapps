import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LOST_PETS: 'lostPets',
  INITIALIZED: 'storageInitialized',
  NOTIFICATIONS: 'notifications',
};

// Helper function to calculate time lost string from date
const calculateTimeLost = lostDate => {
  const now = new Date();
  const diffTime = now - lostDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Hoy';
  } else if (diffDays === 1) {
    return '1 día';
  } else if (diffDays < 7) {
    return `${diffDays} días`;
  } else if (diffDays < 14) {
    return '1 semana';
  } else if (diffDays < 21) {
    return '2 semanas';
  } else if (diffDays < 30) {
    return '3 semanas';
  } else if (diffDays < 60) {
    return '1 mes';
  } else if (diffDays < 90) {
    return '2 meses';
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} mes${months > 1 ? 'es' : ''}`;
  }
};

// Convert hardcoded pet data to storage format
const convertPetToStorageFormat = pet => {
  // Calculate a date based on timeLost string
  const now = new Date();
  let lostDate = new Date(now);

  // Parse timeLost string to approximate date
  if (pet.timeLost.includes('mes') && pet.timeLost.includes('días')) {
    const match = pet.timeLost.match(/(\d+)\s*mes/);
    const months = match ? parseInt(match[1]) : 1;
    lostDate.setMonth(lostDate.getMonth() - months);
    const daysMatch = pet.timeLost.match(/(\d+)\s*días/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      lostDate.setDate(lostDate.getDate() - days);
    }
  } else if (pet.timeLost.includes('semanas')) {
    const match = pet.timeLost.match(/(\d+)/);
    const weeks = match ? parseInt(match[1]) : 1;
    lostDate.setDate(lostDate.getDate() - weeks * 7);
  } else if (pet.timeLost.includes('días')) {
    const match = pet.timeLost.match(/(\d+)/);
    const days = match ? parseInt(match[1]) : 1;
    lostDate.setDate(lostDate.getDate() - days);
  } else if (pet.timeLost.includes('mes')) {
    const match = pet.timeLost.match(/(\d+)/);
    const months = match ? parseInt(match[1]) : 1;
    lostDate.setMonth(lostDate.getMonth() - months);
  }

  return {
    id: pet.id,
    petType: pet.type,
    name: pet.petName,
    address: pet.zone, // Convert zone to address
    breed: '', // Not in hardcoded data
    characteristics: pet.characteristics,
    date: lostDate.toISOString(),
    hour: 12, // Default
    minute: 0,
    period: 'PM',
    imageUri: pet.imageUrl,
    latitude: pet.latitude,
    longitude: pet.longitude,
    createdAt: new Date().toISOString(),
  };
};

// Initial hardcoded pets data
const INITIAL_PETS = [
  // Test pets near default location (Universidad Privada del Valle Sede La Paz)
  {
    id: 23,
    petName: 'Max',
    timeLost: '2 días',
    type: 'dog',
    zone: 'Cerca de Universidad Privada del Valle, La Paz',
    characteristics:
      'Perro labrador dorado, muy amigable. Usa collar rojo con placa de identificación.',
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    latitude: -16.5045,
    longitude: -68.12,
  },
  {
    id: 24,
    petName: 'Bella',
    timeLost: 'Hoy',
    type: 'dog',
    zone: 'Universidad Privada del Valle, La Paz',
    characteristics:
      'Perrita pequeña blanca con manchas marrones. Muy juguetona y cariñosa.',
    imageUrl:
      'https://content.dogagingproject.org/wp-content/uploads/2020/11/helena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg',
    latitude: -16.5015,
    longitude: -68.125,
  },
  {
    id: 25,
    petName: 'Whiskers',
    timeLost: '3 días',
    type: 'cat',
    zone: 'Zona Universidad, La Paz',
    characteristics:
      'Gato atigrado gris y negro, ojos verdes. Muy tranquilo y amigable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6d87zy2l97Gbuz1xheO71Fzw31vhLFurSyg&s',
    latitude: -16.5055,
    longitude: -68.118,
  },
  {
    id: 26,
    petName: 'Charlie',
    timeLost: '1 día',
    type: 'dog',
    zone: 'Universidad Privada del Valle, La Paz',
    characteristics:
      'Perro pequeño, color marrón con patas blancas. Muy energético y le gusta correr.',
    imageUrl:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=60',
    latitude: -16.5005,
    longitude: -68.122,
  },
  {
    id: 1,
    petName: 'Michito',
    timeLost: '1 mes y 3 días',
    type: 'cat',
    zone: 'Sopocachi, Av. Arce y Belisario Salinas',
    characteristics:
      'Gato naranja, con chompa roja. Es malo, no le gustan las personas, es muy asustadizo.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6d87zy2l97Gbuz1xheO71Fzw31vhLFurSyg&s',
    latitude: -16.504,
    longitude: -68.123,
  },
  {
    id: 2,
    petName: 'Luna',
    timeLost: '2 semanas',
    type: 'dog',
    zone: 'Miraflores, Calle 21 de Calacoto',
    characteristics:
      'Perrita blanca con manchas negras, muy cariñosa y juguetona. Usa collar azul con cascabel.',
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    latitude: -16.502,
    longitude: -68.12,
  },
  {
    id: 3,
    petName: 'Toby',
    timeLost: '5 días',
    type: 'dog',
    zone: 'San Pedro, Plaza España',
    characteristics:
      'Perro golden retriever, pelo dorado, muy amigable. Responde al nombre Toby y le gustan las galletas.',
    imageUrl:
      'https://content.dogagingproject.org/wp-content/uploads/2020/11/helena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg',
    latitude: -16.505,
    longitude: -68.125,
  },
  {
    id: 4,
    petName: 'Mittens',
    timeLost: '3 semanas',
    type: 'cat',
    zone: 'Centro, Plaza Murillo',
    characteristics:
      'Gato gris con patas blancas, ojos verdes. Muy tímido pero cariñoso una vez que confía.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg',
    latitude: -16.5,
    longitude: -68.15,
  },
  {
    id: 5,
    petName: 'Bolita',
    timeLost: '3 semanas',
    type: 'cat',
    zone: 'Centro, Plaza Murillo',
    characteristics:
      'Gato gris con patas blancas, ojos verdes. Muy tímido pero cariñoso una vez que confía.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDjheMimCJ9F7ijyF295zUUA4UCAXgIF4cw&s',
    latitude: -16.5,
    longitude: -68.15,
  },
  {
    id: 6,
    petName: 'Pelusa',
    timeLost: '1 semana',
    type: 'cat',
    zone: 'Zona Sur, Calacoto',
    characteristics:
      'Gato blanco con manchas negras, muy peludo. Le gusta dormir en el sol y maúlla mucho.',
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=60',
    latitude: -16.505,
    longitude: -68.155,
  },
  {
    id: 7,
    petName: 'Naranjito',
    timeLost: '4 días',
    type: 'cat',
    zone: 'Obrajes, Av. 14 de Septiembre',
    characteristics:
      'Gato naranja pequeño, muy juguetón. Tiene una mancha blanca en el pecho.',
    imageUrl:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&q=60',
    latitude: -16.507,
    longitude: -68.154,
  },
  {
    id: 8,
    petName: 'Pepe',
    timeLost: '2 meses',
    type: 'cat',
    zone: 'San Miguel, Calle Linares',
    characteristics:
      'Gato completamente negro, ojos amarillos. Es muy independiente y le gusta salir de noche.',
    imageUrl:
      'https://cdn0.uncomo.com/es/posts/6/2/3/como_preparar_la_casa_para_mi_nuevo_gato_21326_600.jpg',
    latitude: -16.498,
    longitude: -68.149,
  },
  {
    id: 9,
    petName: 'Manchitas',
    timeLost: '10 días',
    type: 'cat',
    zone: 'Irpavi, Calle 1',
    characteristics:
      'Gata tricolor (blanco, negro y naranja), muy cariñosa. Responde al nombre Manchitas.',
    imageUrl:
      'https://pxcdn.reduno.com.bo/reduno/012023/1673038537687.webp?cw=400&ch=225&extw=jpg',
    latitude: -16.508,
    longitude: -68.156,
  },
  {
    id: 10,
    petName: 'Tigre',
    timeLost: '6 días',
    type: 'cat',
    zone: 'Achumani, Av. Ballivián',
    characteristics:
      'Gato atigrado gris y negro, patrón rayado. Es muy activo y le gusta cazar pájaros.',
    imageUrl:
      'https://media.ambito.com/p/e8153b7df7239d4fdea8d90675b3114c/adjuntos/239/imagenes/040/296/0040296921/375x211/smart/gatos-maceta-1jpg.jpg',
    latitude: -16.51,
    longitude: -68.157,
  },
  {
    id: 11,
    petName: 'Blanquito',
    timeLost: '3 días',
    type: 'cat',
    zone: 'Cota Cota, Calle 11',
    characteristics:
      'Gato blanco con ojos azules, sordo. Muy tranquilo y amigable, le gusta estar en casa.',
    imageUrl:
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop&q=60',
    latitude: -16.512,
    longitude: -68.158,
  },
  {
    id: 12,
    petName: 'Don gato',
    timeLost: '2 semanas',
    type: 'cat',
    zone: 'Villa Fátima, Av. Naciones Unidas',
    characteristics:
      'Gato gris claro, pelo corto. Tiene una cicatriz pequeña en la oreja izquierda.',
    imageUrl: 'https://lapatria.bo/wp-content/uploads/2020/09/FOTO-1-GATO.png',
    latitude: -16.495,
    longitude: -68.145,
  },
  {
    id: 13,
    petName: 'Chiquito',
    timeLost: '8 días',
    type: 'cat',
    zone: 'La Paz Centro, Calle Comercio',
    characteristics:
      'Gato pequeño, color crema con manchas marrones. Es joven, aproximadamente 1 año.',
    imageUrl:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop&q=60',
    latitude: -16.5,
    longitude: -68.15,
  },
  {
    id: 14,
    petName: 'Bigotes',
    timeLost: '5 días',
    type: 'cat',
    zone: 'El Alto, Zona 16 de Julio',
    characteristics:
      'Gato negro con bigotes largos y blancos, muy característicos. Es curioso y amigable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZNA-6jR1t-ESYon5NtRZf6L3Qw7IUouUMdw&s',
    latitude: -16.48,
    longitude: -68.14,
  },
  {
    id: 15,
    petName: 'Patitas',
    timeLost: '1 mes',
    type: 'cat',
    zone: 'Zona Norte, Av. Juan Pablo II',
    characteristics:
      'Gata siamesa, color crema con puntos oscuros en orejas, patas y cola. Muy vocal.',
    imageUrl:
      'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=400&fit=crop&q=60',
    latitude: -16.493,
    longitude: -68.146,
  },
  {
    id: 16,
    petName: 'Max',
    timeLost: '1 semana',
    type: 'dog',
    zone: 'Zona Sur, Calacoto',
    characteristics:
      'Perro labrador negro, muy juguetón. Le encanta jugar con pelotas y es muy amigable con los niños.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yp4siNnAGNGCMXjFrcVz5vjrg4wSXkey-g&s',
    latitude: -16.505,
    longitude: -68.155,
  },
  {
    id: 17,
    petName: 'Rocky',
    timeLost: '3 días',
    type: 'dog',
    zone: 'Obrajes, Av. 14 de Septiembre',
    characteristics:
      'Perro pequeño, color marrón claro. Tiene una mancha blanca en el pecho y es muy activo.',
    imageUrl:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=60',
    latitude: -16.507,
    longitude: -68.154,
  },
  {
    id: 18,
    petName: 'Bella',
    timeLost: '2 semanas',
    type: 'dog',
    zone: 'San Miguel, Calle Linares',
    characteristics:
      'Perrita beagle, tricolor (blanco, negro y marrón). Muy curiosa y le gusta seguir olores.',
    imageUrl:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop&q=60',
    latitude: -16.498,
    longitude: -68.149,
  },
  {
    id: 19,
    petName: 'Choco',
    timeLost: '5 días',
    type: 'dog',
    zone: 'Irpavi, Calle 1',
    characteristics:
      'Perro chocolate, pelo corto y brillante. Muy cariñoso y le gusta estar cerca de las personas.',
    imageUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&q=60',
    latitude: -16.508,
    longitude: -68.156,
  },
  {
    id: 20,
    petName: 'Lucky',
    timeLost: '10 días',
    type: 'dog',
    zone: 'Achumani, Av. Ballivián',
    characteristics:
      'Perro mestizo, color crema con manchas marrones. Tiene una pata delantera con una cicatriz pequeña.',
    imageUrl:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&q=60',
    latitude: -16.51,
    longitude: -68.157,
  },
  {
    id: 21,
    petName: 'Rex',
    timeLost: '4 días',
    type: 'dog',
    zone: 'Cota Cota, Calle 11',
    characteristics:
      'Perro pastor alemán, color negro y marrón. Muy inteligente y leal, responde bien a comandos.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAeQh3LdidSVcYwyfS7CikxDkGekmKwV-ew&s',
    latitude: -16.512,
    longitude: -68.158,
  },
  {
    id: 22,
    petName: 'Daisy',
    timeLost: '6 días',
    type: 'dog',
    zone: 'Villa Fátima, Av. Naciones Unidas',
    characteristics:
      'Perrita pequeña, blanca con manchas grises. Muy dulce y tranquila, le gusta dormir mucho.',
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop&q=60',
    latitude: -16.495,
    longitude: -68.145,
  },
];

// Initialize storage with default pets if not already initialized
export const initializeStorage = async () => {
  try {
    const initialized = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (initialized === 'true') {
      // Storage already initialized, but check if we need to add new test pets
      const petsJson = await AsyncStorage.getItem(STORAGE_KEYS.LOST_PETS);
      const existingPets = petsJson ? JSON.parse(petsJson) : [];
      const testPetIds = [23, 24, 25, 26]; // IDs of test pets near default location
      const hasTestPets = testPetIds.some(id =>
        existingPets.some(pet => pet.id === id)
      );

      // If test pets don't exist, add them
      if (!hasTestPets) {
        const testPets = INITIAL_PETS.filter(pet =>
          testPetIds.includes(pet.id)
        );
        const convertedTestPets = testPets.map(convertPetToStorageFormat);
        const updatedPets = [...existingPets, ...convertedTestPets];
        await AsyncStorage.setItem(
          STORAGE_KEYS.LOST_PETS,
          JSON.stringify(updatedPets)
        );
      }
      return;
    }

    // Convert and save initial pets
    const convertedPets = INITIAL_PETS.map(convertPetToStorageFormat);
    await AsyncStorage.setItem(
      STORAGE_KEYS.LOST_PETS,
      JSON.stringify(convertedPets)
    );
    await AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

// Load all lost pets from storage
export const loadLostPets = async () => {
  try {
    await initializeStorage(); // Ensure storage is initialized
    const petsJson = await AsyncStorage.getItem(STORAGE_KEYS.LOST_PETS);
    if (!petsJson) {
      return [];
    }
    const pets = JSON.parse(petsJson);
    return pets;
  } catch (error) {
    console.error('Error loading lost pets:', error);
    return [];
  }
};

// Save all lost pets to storage
export const saveLostPets = async pets => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LOST_PETS, JSON.stringify(pets));
  } catch (error) {
    console.error('Error saving lost pets:', error);
  }
};

// Add a new lost pet
export const addLostPet = async petData => {
  try {
    const pets = await loadLostPets();
    const newPet = {
      id: Date.now(), // Simple ID generation
      ...petData,
      createdAt: new Date().toISOString(),
    };
    pets.push(newPet);
    await saveLostPets(pets);
    return newPet;
  } catch (error) {
    console.error('Error adding lost pet:', error);
    throw error;
  }
};

// Generate address text from coordinates (simple version)
// In a real app, you'd use reverse geocoding API
const generateAddressFromCoordinates = (latitude, longitude) => {
  if (!latitude || !longitude) {
    return 'Ubicación no especificada';
  }
  // For now, return coordinates as address text
  // In production, you'd use a reverse geocoding service
  return `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
};

// Convert storage format back to display format (for SearchScreen)
export const convertPetToDisplayFormat = pet => {
  const lostDate = new Date(pet.date);
  const timeLost = calculateTimeLost(lostDate);

  // Use existing address if available, otherwise generate from coordinates
  // Support both "address" and "location" for backward compatibility
  const address =
    pet.address ||
    pet.location ||
    generateAddressFromCoordinates(pet.latitude, pet.longitude);

  // Support both new format (imageUris array) and old format (imageUri single)
  const imageUrls = pet.imageUris || (pet.imageUri ? [pet.imageUri] : []);
  const imageUrl =
    pet.imageUri ||
    (pet.imageUris && pet.imageUris.length > 0 ? pet.imageUris[0] : null);

  return {
    id: pet.id,
    petName: pet.name,
    timeLost: timeLost,
    type: pet.petType,
    zone: address, // Keep "zone" for SearchScreen compatibility
    characteristics: pet.characteristics,
    imageUrl: imageUrl, // Keep for backward compatibility
    imageUrls: imageUrls, // Array of all images
    latitude: pet.latitude,
    longitude: pet.longitude,
  };
};

// Notification storage functions
// Load all notifications from storage
export const loadNotifications = async () => {
  try {
    const notificationsJson = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATIONS
    );
    if (!notificationsJson) {
      return [];
    }
    const notifications = JSON.parse(notificationsJson);
    // Sort by createdAt descending (newest first)
    return notifications.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Save all notifications to storage
export const saveNotifications = async notifications => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(notifications)
    );
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Add a new notification
export const addNotification = async notificationData => {
  try {
    const notifications = await loadNotifications();
    const newNotification = {
      id: Date.now(), // Simple ID generation
      ...notificationData,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(newNotification); // Add to beginning
    await saveNotifications(notifications);
    return newNotification;
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
};

// Delete a notification by ID
export const deleteNotification = async notificationId => {
  try {
    const notifications = await loadNotifications();
    const filteredNotifications = notifications.filter(
      notification => notification.id !== notificationId
    );
    await saveNotifications(filteredNotifications);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};
