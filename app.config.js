// app.config.js - This file supports environment variables
// If you use this file, rename app.json to app.json.backup
// For production, use EAS Secrets instead of hardcoding values here

// Try to load .env file if dotenv is available (optional)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, that's okay - use environment variables or EAS Secrets
}

export default {
  expo: {
    name: 'huellitapp',
    slug: 'huellitapps',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'This app uses location to show your position on the map and help find lost pets.',
      },
      bundleIdentifier: 'com.anonymous.huellitapp',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/logo.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
      ],
    },
    web: {
      favicon: './assets/logo.png',
    },
    plugins: ['expo-font'],
    extra: {
      eas: {
        projectId: 'e90b3eab-d62d-46f3-b63f-c4979aabf8de',
      },
      // For production, this will be set via EAS Secrets
      // For local dev, you can set it here temporarily (but don't commit it!)
      sendGridApiKey: process.env.SENDGRID_API_KEY || '',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/e90b3eab-d62d-46f3-b63f-c4979aabf8de',
    },
  },
};
