import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import Map from '../../components/Map';
import LostPetCarousel from '../../components/LostPetCarousel';

const HomeScreen = () => {
  const navigation = useNavigation();
  const lostPets = [
    {
      id: 1,
      petName: 'Tokio',
      timeLost: '3 dias',
      zone: 'Puente de las Américas',
      characteristics:
        'Gato blanco con manchita negra en la cabeza, sin collar.',
      imageUrl:
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
      latitude: -16.497,
      longitude: -68.148,
    },
    {
      id: 2,
      petName: 'Canelo',
      timeLost: '2 semanas',
      zone: 'Sopocachi',
      characteristics: 'Gato blanco con plomo, Jovial, sin ropa.',
      imageUrl:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
      latitude: -16.503,
      longitude: -68.152,
    },
    {
      id: 3,
      petName: 'Chin Chin',
      timeLost: '1 semana',
      zone: 'Miraflores',
      characteristics: 'Perrito pequeño, color claro, muy cariñoso.',
      imageUrl:
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      latitude: -16.499,
      longitude: -68.153,
    },
    {
      id: 4,
      petName: 'Simon',
      timeLost: '5 dias',
      zone: 'San Pedro',
      characteristics: 'Perrito mediano, pelo rizado, collar azul.',
      imageUrl:
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
      latitude: -16.501,
      longitude: -68.147,
    },
    {
      id: 5,
      petName: 'Michito',
      timeLost: '4 dias',
      zone: 'Centro',
      characteristics: 'Gato naranja, muy juguetón, con collar.',
      imageUrl:
        'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop',
      latitude: -16.5,
      longitude: -68.15,
    },
  ];

  const handleRegisterPet = () => {
    navigation.navigate('LostPetFlow');
  };

  return (
    <Container>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <MapTitle>Mapa</MapTitle>
        <Map pets={lostPets} height={300} />
        <LostPetCarousel pets={lostPets} />
        <RegisterButton onPress={handleRegisterPet}>
          <MaterialIcons name="pets" size={20} color={colors.surface} />
          <ButtonText>Registro de Perrito/Gatito Perdido</ButtonText>
        </RegisterButton>
      </StyledScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-bottom: 20px;
`;

const MapTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.orange};
  margin-bottom: 8px;
`;

const RegisterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
  border-radius: 12px;
  padding: 12px;
  margin-top: 0px;
  margin-horizontal: 0px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
  margin-left: 8px;
`;

export default HomeScreen;
