import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import LostPetCard from '../../components/LostPetCard';
import Search from '../../components/Search';
import Toggle from '../../components/Toggle';
import PetDetailModal from '../../components/PetDetailModal';
import { colors } from '../../theme';

const ANIMAL_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const petTypeOptions = [
    { icon: 'pets', iconLibrary: 'MaterialIcons' },
    { icon: 'cat', iconLibrary: 'FontAwesome5' },
  ];

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handlePetTypeChange = index => {
    setSelectedPetType(index);
  };

  const handlePetCardPress = pet => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  const lostPets = [
    {
      id: 1,
      petName: 'Michito',
      timeLost: '1 mes y 3 días',
      type: ANIMAL_TYPES.CAT,
      zone: 'Sopocachi, Av. Arce y Belisario Salinas',
      characteristics:
        'Gato naranja, con chompa roja. Es malo, no le gustan las personas, es muy asustadizo.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6d87zy2l97Gbuz1xheO71Fzw31vhLFurSyg&s',
      latitude: -16.503,
      longitude: -68.152,
    },
    {
      id: 2,
      petName: 'Luna',
      timeLost: '2 semanas',
      type: ANIMAL_TYPES.DOG,
      zone: 'Miraflores, Calle 21 de Calacoto',
      characteristics:
        'Perrita blanca con manchas negras, muy cariñosa y juguetona. Usa collar azul con cascabel.',
      imageUrl:
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
      latitude: -16.499,
      longitude: -68.153,
    },
    {
      id: 3,
      petName: 'Toby',
      timeLost: '5 días',
      type: ANIMAL_TYPES.DOG,
      zone: 'San Pedro, Plaza España',
      characteristics:
        'Perro golden retriever, pelo dorado, muy amigable. Responde al nombre Toby y le gustan las galletas.',
      imageUrl:
        'https://content.dogagingproject.org/wp-content/uploads/2020/11/helena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg',
      latitude: -16.501,
      longitude: -68.147,
    },
    {
      id: 4,
      petName: 'Mittens',
      timeLost: '3 semanas',
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
      zone: 'Villa Fátima, Av. Naciones Unidas',
      characteristics:
        'Gato gris claro, pelo corto. Tiene una cicatriz pequeña en la oreja izquierda.',
      imageUrl:
        'https://lapatria.bo/wp-content/uploads/2020/09/FOTO-1-GATO.png',
      latitude: -16.495,
      longitude: -68.145,
    },
    {
      id: 13,
      petName: 'Chiquito',
      timeLost: '8 días',
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.CAT,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
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
      type: ANIMAL_TYPES.DOG,
      zone: 'Villa Fátima, Av. Naciones Unidas',
      characteristics:
        'Perrita pequeña, blanca con manchas grises. Muy dulce y tranquila, le gusta dormir mucho.',
      imageUrl:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop&q=60',
      latitude: -16.495,
      longitude: -68.145,
    },
  ];

  return (
    <Container edges={['left', 'right']}>
      <Row>
        <SearchWrapper>
          <Search
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={() => handleSearch(searchQuery)}
          />
        </SearchWrapper>

        <ToggleWrapper>
          <Toggle
            options={petTypeOptions}
            selectedIndex={selectedPetType}
            onSelect={handlePetTypeChange}
          />
        </ToggleWrapper>
      </Row>

      <StyledScrollView showsVerticalScrollIndicator={false}>
        {lostPets
          .filter(pet => {
            // Filter by pet type
            // Index 0 = Dogs, Index 1 = Cats
            const targetType =
              selectedPetType === 0 ? ANIMAL_TYPES.DOG : ANIMAL_TYPES.CAT;
            const matchesType = pet.type === targetType;

            // Filter by pet name (case-insensitive partial match)
            const matchesSearch =
              !searchQuery.trim() ||
              pet.petName
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim());

            return matchesType && matchesSearch;
          })
          .map(pet => (
            <LostPetCard
              key={pet.id}
              petName={pet.petName}
              timeLost={pet.timeLost}
              zone={pet.zone}
              characteristics={pet.characteristics}
              imageUrl={pet.imageUrl}
              onPress={() => handlePetCardPress(pet)}
            />
          ))}
      </StyledScrollView>

      <PetDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pet={selectedPet}
      />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 16px;
  padding-bottom: 100px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const SearchWrapper = styled.View`
  flex: 1;
  margin-right: 8px;
`;

const ToggleWrapper = styled.View`
  flex-shrink: 0;
`;

export default SearchScreen;
