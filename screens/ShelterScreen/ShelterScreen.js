import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import FoundPetCard from '../../components/FoundPetCard';
import Search from '../../components/Search';
import Toggle from '../../components/Toggle';
import { colors } from '../../theme';

const ANIMAL_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

const catData = [
  {
    id: 1,
    description: 'Gatito blanco con negro',
    place: 'Av Arce. V centenario',
    details: 'Gatito blanco con negro, tienen 3 meses, se encontraba asustado.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 2,
    description: 'Gatito blanco con manchas plomas',
    place: 'Prado av 16 de Julio cerca a Dumbo',
    details:
      'Gato blanco con manchas plomas, asustado, tiene un collar morado pero no tiene datos.',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 3,
    description: 'Gatito plomo atigrado con ojos verdes',
    place: 'calacoto calle 15 cerca del ketal',
    details:
      'Gato plomo atigrado, esta asutado, no sabe andar por la calle, se encuentra lastimando, cicatriz cerca del hocico.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfRaIl1GKY743VUdBOrL04K4gbgqvDZp3iw&s',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 4,
    description: 'Tiene collar con su nombre, Katia, no tiene numero',
    place: 'Bella Vista',
    details:
      'Gatito con collar, nombre Katia, viejito, es malo con las personas, malas cerca de las patitas.',
    imageUrl: 'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 5,
    description: 'Gatito atigrado con ojos azules brillantes',
    place: 'Zona Sur, Calle 21',
    details:
      'Gatito atigrado joven, ojos azules muy llamativos, muy cariñoso y sociable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4EbLlkmCJhmk4LI_PxiTc7OrHEkFE_wjeA&s',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 6,
    description: 'Gatito plomo atigrado con ojos verdes',
    place: 'calacoto calle 15 cerca del ketal',
    details:
      'Gato plomo atigrado, esta asutado, no sabe andar por la calle, se encuentra lastimando, cicatriz cerca del hocico.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfRaIl1GKY743VUdBOrL04K4gbgqvDZp3iw&s',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 7,
    description: 'Gatito blanco con manchas plomas',
    place: 'Prado av 16 de Julio cerca a Dumbo',
    details:
      'Gato blanco con manchas plomas, asustado, tiene un collar morado pero no tiene datos.',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
    type: ANIMAL_TYPES.CAT,
  },
  {
    id: 8,
    description: 'Gatito blanco con manchas plomas',
    place: 'Zona Sur, Calle 21',
    details:
      'Gatito atigrado joven, ojos azules muy llamativos, muy cariñoso y sociable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4EbLlkmCJhmk4LI_PxiTc7OrHEkFE_wjeA&s',
    type: ANIMAL_TYPES.CAT,
  },
];

const dogData = [
  {
    id: 9,
    description: 'Perrito labrador encontrado',
    place: 'Miraflores, Calle 21 de Calacoto',
    details:
      'Perro labrador dorado, muy amigable, tiene collar pero sin placa. Responde al nombre Max.',
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    type: ANIMAL_TYPES.DOG,
  },
  {
    id: 10,
    description: 'Perrito pequeño encontrado',
    place: 'San Pedro, Plaza España',
    details:
      'Perro pequeño, color marrón, muy asustado. Tiene una pata lastimada.',
    imageUrl:
      'https://content.dogagingproject.org/wp-content/uploads/2020/11/helena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg',
    type: ANIMAL_TYPES.DOG,
  },
  {
    id: 11,
    description: 'Perro mestizo encontrado',
    place: 'Centro, Plaza Murillo',
    details:
      'Perro mestizo mediano, color negro con manchas blancas. Muy tranquilo y amigable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAeQh3LdidSVcYwyfS7CikxDkGekmKwV-ew&s',
    type: ANIMAL_TYPES.DOG,
  },
  {
    id: 12,
    description: 'Perrito beagle encontrado',
    place: 'Zona Sur, Calacoto',
    details:
      'Perro beagle, tricolor, muy juguetón. Tiene collar azul con cascabel.',
    imageUrl:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop&q=60',
    type: ANIMAL_TYPES.DOG,
  },
  {
    id: 13,
    description: 'Perro pastor alemán encontrado',
    place: 'Obrajes, Av. 14 de Septiembre',
    details:
      'Perro pastor alemán, color negro y marrón. Muy inteligente, responde a comandos básicos.',
    imageUrl:
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&q=60',
    type: ANIMAL_TYPES.DOG,
  },
  {
    id: 14,
    description: 'Perrito pequeño blanco encontrado',
    place: 'Irpavi, Calle 1',
    details:
      'Perro pequeño, completamente blanco, muy dulce. Parece perdido, busca a su dueño.',
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop&q=60',
    type: ANIMAL_TYPES.DOG,
  },
];

const allPets = [...catData, ...dogData];

const ShelterScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState(0);

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
        {allPets
          .filter(pet => {
            // Filter by pet type
            // Index 0 = Dogs, Index 1 = Cats
            const targetType =
              selectedPetType === 0 ? ANIMAL_TYPES.DOG : ANIMAL_TYPES.CAT;
            const matchesType = pet.type === targetType;

            // Filter by description or place (case-insensitive partial match)
            const searchTerm = searchQuery.toLowerCase().trim();
            const matchesSearch =
              !searchTerm ||
              pet.description.toLowerCase().includes(searchTerm) ||
              pet.place.toLowerCase().includes(searchTerm);

            return matchesType && matchesSearch;
          })
          .map(pet => (
            <FoundPetCard
              key={pet.id}
              description={pet.description}
              place={pet.place}
              details={pet.details}
              imageUrl={pet.imageUrl}
            />
          ))}
      </StyledScrollView>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled.ScrollView`
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

export default ShelterScreen;
