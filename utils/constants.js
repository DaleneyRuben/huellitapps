// Default map location - Universidad Privada del Valle Sede La Paz
export const DEFAULT_MAP_LOCATION = {
  latitude: -16.5035295,
  longitude: -68.1226286,
};

// Default map zoom levels
export const DEFAULT_MAP_ZOOM = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.015,
};

// Default map region (location + zoom)
export const DEFAULT_MAP_REGION = {
  ...DEFAULT_MAP_LOCATION,
  ...DEFAULT_MAP_ZOOM,
};
