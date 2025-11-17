import Constants from 'expo-constants';

// Get SendGrid API key from environment variables or EAS Secrets
// For production, use EAS Secrets: eas secret:create --scope project --name SENDGRID_API_KEY --value "your-key"
// For local development, create a .env file with SENDGRID_API_KEY=your-key
export const SENDGRID_API_KEY =
  Constants.expoConfig?.extra?.sendGridApiKey ||
  process.env.SENDGRID_API_KEY ||
  '';

export const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';
