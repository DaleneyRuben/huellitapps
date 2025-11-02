import React, { useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import FoundPetCard from '../../components/FoundPetCard';
import Search from '../../components/Search';
import Toggle from '../../components/Toggle';
import { colors } from '../../theme';

const catData = [
  {
    id: 1,
    description: 'Gatito blanco con negro',
    place: 'Av Arce. V centenario',
    details: 'Gatito blanco con negro, tienen 3 meses, se encontraba asustado.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg',
  },
  {
    id: 2,
    description: 'Gatito blanco con manchas plomas',
    place: 'Prado av 16 de Julio cerca a Dumbo',
    details:
      'Gato blanco con manchas plomas, asustado, tiene un collar morado pero no tiene datos.',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
  },
  {
    id: 3,
    description: 'Gatito plomo atigrado con ojos verdes',
    place: 'calacoto calle 15 cerca del ketal',
    details:
      'Gato plomo atigrado, esta asutado, no sabe andar por la calle, se encuentra lastimando, cicatriz cerca del hocico.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfRaIl1GKY743VUdBOrL04K4gbgqvDZp3iw&s',
  },
  {
    id: 4,
    description: 'Tiene collar con su nombre, Katia, no tiene numero',
    place: 'Bella Vista',
    details:
      'Gatito con collar, nombre Katia, viejito, es malo con las personas, malas cerca de las patitas.',
    imageUrl: 'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
  },
  {
    id: 5,
    description: 'Gatito atigrado con ojos azules brillantes',
    place: 'Zona Sur, Calle 21',
    details:
      'Gatito atigrado joven, ojos azules muy llamativos, muy cariñoso y sociable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4EbLlkmCJhmk4LI_PxiTc7OrHEkFE_wjeA&s',
  },
  {
    id: 6,
    description: 'Gatito plomo atigrado con ojos verdes',
    place: 'calacoto calle 15 cerca del ketal',
    details:
      'Gato plomo atigrado, esta asutado, no sabe andar por la calle, se encuentra lastimando, cicatriz cerca del hocico.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfRaIl1GKY743VUdBOrL04K4gbgqvDZp3iw&s',
  },
  {
    id: 7,
    description: 'Gatito blanco con manchas plomas',
    place: 'Prado av 16 de Julio cerca a Dumbo',
    details:
      'Gato blanco con manchas plomas, asustado, tiene un collar morado pero no tiene datos.',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
  },
  {
    id: 8,
    description: 'Gatito blanco con manchas plomas',
    place: 'Zona Sur, Calle 21',
    details:
      'Gatito atigrado joven, ojos azules muy llamativos, muy cariñoso y sociable.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX4EbLlkmCJhmk4LI_PxiTc7OrHEkFE_wjeA&s',
  },
];

const ShelterScreen = () => {
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

  return (
    <>
      <StatusBar style="light" />
      <StatusBarBackground topInset={insets.top} />
      <Container edges={['left', 'right', 'bottom']}>
        <Header topInset={insets.top}>
          <Title>Mascotas Encontradas</Title>
          <Subtitle>Estas mascotas están en nuestro albergue</Subtitle>
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
          {catData.map(cat => (
            <FoundPetCard
              key={cat.id}
              description={cat.description}
              place={cat.place}
              details={cat.details}
              imageUrl={cat.imageUrl}
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
