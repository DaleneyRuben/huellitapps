import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Map from '../../components/Map';

const MapScreen = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  // Subtract approximate header and tab bar height (around 120px total)
  const mapHeight = screenHeight - 200;

  const handleAddPetPress = () => {
    navigation.navigate('LostPetFlow');
  };

  return <Map height={mapHeight} onAddPetPress={handleAddPetPress} />;
};

export default MapScreen;
