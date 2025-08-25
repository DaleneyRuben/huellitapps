export const colors = {
  // Primary Colors
  primary: '#8B9D83',      // Sage Green - Main brand color
  primaryLight: '#A8B89E', // Lighter sage for backgrounds
  primaryDark: '#6B7A63',  // Darker sage for text
  
  // Secondary Colors
  secondary: '#D4A574',    // Warm Beige - Secondary elements
  secondaryLight: '#E5C495', // Lighter beige
  secondaryDark: '#B8945A',  // Darker beige
  
  // Accent Colors
  accent: '#E8B4A0',       // Dusty Rose - Highlights and CTAs
  accentLight: '#F2C9B8',  // Lighter dusty rose
  accentDark: '#D19A82',   // Darker dusty rose
  
  // Background Colors
  background: '#FAFAFA',   // Off-White - Main background
  surface: '#FFFFFF',       // Pure White - Card backgrounds
  surfaceLight: '#F8F8F8', // Very light gray
  
  // Text Colors
  textPrimary: '#2C2C2C',  // Dark gray - Main text
  textSecondary: '#6B6B6B', // Medium gray - Secondary text
  textLight: '#9B9B9B',    // Light gray - Placeholder text
  
  // Status Colors
  success: '#7FB069',       // Green - Success states
  warning: '#F4A261',       // Orange - Warning states
  error: '#E76F51',         // Red - Error states
  info: '#6B9AC4',          // Blue - Info states
  
  // Border Colors
  border: '#E0E0E0',       // Light gray - Subtle borders
  borderMedium: '#D0D0D0', // Medium gray - Card borders
  borderDark: '#B0B0B0',   // Dark gray - Strong borders
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',     // Subtle shadows
  shadowMedium: 'rgba(0, 0, 0, 0.15)', // Medium shadows
  shadowDark: 'rgba(0, 0, 0, 0.2)',    // Strong shadows
};

// Semantic color mappings for specific use cases
export const semanticColors = {
  // Card Colors
  cardBackground: colors.surface,
  cardBorder: colors.borderMedium,
  
  // Button Colors
  buttonPrimary: colors.primary,
  buttonSecondary: colors.secondary,
  buttonAccent: colors.accent,
  
  // Text Colors
  labelText: colors.primary,
  valueText: colors.textPrimary,
  titleText: colors.primary,
  
  // Image Section
  imageBorder: colors.borderMedium,
  
  // Header Colors
  headerBackground: colors.primary,
  headerText: colors.surface,
};

export default colors;
