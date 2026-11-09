import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  gcpRegion: process.env.GCP_REGION || 'asia-south1',
  
  // Meta / Instagram Graph API Configuration
  meta: {
    apiVersion: process.env.META_API_VERSION || 'v21.0',
    appId: process.env.META_APP_ID || '',
    appSecret: process.env.META_APP_SECRET || '',
    redirectUri: process.env.META_REDIRECT_URI || 'http://localhost:3000/api/instagram/callback',
    oauthUrl: 'https://www.facebook.com/v21.0/dialog/oauth',
    graphBaseUrl: 'https://graph.facebook.com/v21.0',
  },

  // Security & Encryption (AES-256-GCM)
  encryption: {
    // 32-byte hexadecimal string (64 characters)
    masterKey: process.env.ENCRYPTION_MASTER_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  },

  // Firebase
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'ajaynxt-social-analytics',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },

  // Allowed CORS Origins
  corsOrigins: (process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173,https://ajaynxt-ai-design-studio.web.app,https://ajaynxt-ai-design-studio.firebaseapp.com').split(','),
};
