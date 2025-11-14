import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

// Web version of Map component - shows placeholder since react-native-maps doesn't work on web
const Map = ({ pets = [], height, initialRegion, onAddPetPress }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.webPlaceholder}>
        <Text style={styles.placeholderText}>🗺️</Text>
        <Text style={styles.placeholderTitle}>Mapa</Text>
        <Text style={styles.placeholderSubtext}>
          Los mapas están disponibles en la aplicación móvil
        </Text>
        {pets.length > 0 && (
          <Text style={styles.petsCount}>
            {pets.length} mascotas perdidas en el área
          </Text>
        )}
      </View>
      {onAddPetPress && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPetPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={32} color={colors.surface} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    minHeight: 300,
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
    marginBottom: 8,
  },
  petsCount: {
    fontSize: 14,
    color: colors.secondaryLight,
    fontWeight: '600',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Map;
