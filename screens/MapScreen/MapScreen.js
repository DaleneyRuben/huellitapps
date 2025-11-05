import React from 'react';
import { Dimensions } from 'react-native';
import Map from '../../components/Map';

const MapScreen = () => {
  const screenHeight = Dimensions.get('window').height;
  // Subtract approximate header and tab bar height (around 120px total)
  const mapHeight = screenHeight - 200;

  return <Map height={mapHeight} />;
};

export default MapScreen;
