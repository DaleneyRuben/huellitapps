import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Web version of Map component - shows placeholder since react-native-maps doesn't work on web
export default function Map() {
  return (
    <View style={styles.container}>
      <View style={styles.webPlaceholder}>
        <Text style={styles.placeholderText}>🗺️</Text>
        <Text style={styles.placeholderTitle}>Mapa</Text>
        <Text style={styles.placeholderSubtext}>
          Los mapas están disponibles en la aplicación móvil
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  placeholderText: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
