export const colors = {
  // Primary Colors
  primary: '#FAA35F', // Sage Green - Main brand color
  primaryLight: '#FFC99A', // Lighter beige

  // Secondary Colors
  // make the secondary color more dark
  secondary: '#5A80B2',
  secondaryLight: '#6B9AC4',

  // Background Colors
  background: '#FAFAFA', // Off-White - Main background
  surface: '#FFFFFF', // Pure White - Card backgrounds
  surfaceLight: '#F8F8F8', // Very light gray

  // Text Colors
  textPrimary: '#2C2C2C', // Dark gray - Main text
  textSecondary: '#6B6B6B', // Medium gray - Secondary text
  textLight: '#9B9B9B', // Light gray - Placeholder text

  // Status Colors
  info: '#6B9AC4', // Blue - Info states

  // Border Colors
  border: '#E0E0E0', // Light gray - Subtle borders
  borderMedium: '#D0D0D0', // Medium gray - Card borders

  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadows
};

// Semantic color mappings for specific use cases
export const semanticColors = {
  // Card Colors
  cardBackground: colors.surface,
  cardBorder: colors.borderMedium,

  // Text Colors
  labelText: colors.secondary,
  valueText: colors.textPrimary,
};

export default colors;
