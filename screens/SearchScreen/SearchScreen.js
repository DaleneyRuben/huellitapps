import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import LostPetCard from '../../components/LostPetCard';
import Search from '../../components/Search';
import Toggle from '../../components/Toggle';
import { colors } from '../../theme';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState(0);
  const insets = useSafeAreaInsets();

  const petTypeOptions = [{ icon: 'pets' }, { icon: 'pets' }];

  const handleSearch = query => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handlePetTypeChange = index => {
    setSelectedPetType(index);
    // TODO: Filter pets by type
  };

  const lostPets = [
    {
      id: 1,
      petName: 'Michito',
      timeLost: '1 mes y 3 días',
      zone: 'Sopocachi, Av. Arce y Belisario Salinas',
      characteristics:
        'Gato naranja, con chompa roja. Es malo, no le gustan las personas, es muy asustadizo.',
      imageUrl:
        'https://sicsa.org/wp-content/uploads/2025/08/ee61a95f6a2aab9a629fba74f146efce.jpg',
    },
    {
      id: 2,
      petName: 'Luna',
      timeLost: '2 semanas',
      zone: 'Miraflores, Calle 21 de Calacoto',
      characteristics:
        'Perrita blanca con manchas negras, muy cariñosa y juguetona. Usa collar azul con cascabel.',
      imageUrl:
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: 3,
      petName: 'Toby',
      timeLost: '5 días',
      zone: 'San Pedro, Plaza España',
      characteristics:
        'Perro golden retriever, pelo dorado, muy amigable. Responde al nombre Toby y le gustan las galletas.',
      imageUrl:
        'https://content.dogagingproject.org/wp-content/uploads/2020/11/helena-lopes-S3TPJCOIRoo-unsplash-scaled.jpg',
    },
    {
      id: 4,
      petName: 'Mittens',
      timeLost: '3 semanas',
      zone: 'Centro, Plaza Murillo',
      characteristics:
        'Gato gris con patas blancas, ojos verdes. Muy tímido pero cariñoso una vez que confía.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA33S1Z-Q2NroFRujxluHptObpoUYTIyL9nQ&s',
    },
    {
      id: 5,
      petName: 'Bolita',
      timeLost: '3 semanas',
      zone: 'Centro, Plaza Murillo',
      characteristics:
        'Gato gris con patas blancas, ojos verdes. Muy tímido pero cariñoso una vez que confía.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKC0e4V59rDNR5lA5x7-PTmBnDUzlfEwXkiw&s',
    },
  ];

  return (
    <>
      <StatusBar style="light" />
      <StatusBarBackground topInset={insets.top} />
      <Container edges={['left', 'right', 'bottom']}>
        <Header topInset={insets.top}>
          <Title>Mascotas Perdidas</Title>
          <Subtitle>Ayuda a encontrar a estas mascotas</Subtitle>
        </Header>

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
          {lostPets.map(pet => (
            <LostPetCard
              key={pet.id}
              petName={pet.petName}
              timeLost={pet.timeLost}
              zone={pet.zone}
              characteristics={pet.characteristics}
              imageUrl={pet.imageUrl}
            />
          ))}
        </StyledScrollView>
      </Container>
    </>
  );
};

const StatusBarBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.topInset || 0}px;
  background-color: ${colors.orangeDark};
  z-index: 0;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  position: relative;
  z-index: 1;
  padding-top: ${props => (props.topInset || 0) + 5}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  background-color: ${colors.orangeDark};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  text-align: center;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 16px;
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
