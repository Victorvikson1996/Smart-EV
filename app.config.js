// app.config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default {
  expo: {
    name: 'smartev',
    slug: 'smartev',
    version: '1.0.0',
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      googleApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
    // Other Expo configurations here
  }
};
