import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import FoundPetCard from '../../components/FoundPetCard';
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
  return (
    <Container>
      <Header>
        <Title>Mascotas Encontradas</Title>
        <Subtitle>
          Estas mascotas han sido encontradas y están en el albergue
        </Subtitle>
      </Header>

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
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: 20px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textPrimary};
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-bottom: 100px;
`;

export default ShelterScreen;
