import { supabase } from '../api';

export const createProfilesTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
        PRIMARY KEY (id)
      );
    `;

  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      query: createTableQuery
    });
    if (error) throw error;
    console.log('Profiles table created or already exists');
  } catch (error) {
    console.error('Error creating profiles table:', error);
  }
};

export const _createProfilesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS profiles (
      id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      first_name text,
      last_name text,
      phone text,
      created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
      updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
    );
  `;

  const { data, error } = await supabase.rpc('execute_sql', { query: sql });
  if (error) {
    console.error('Error creating profiles table:', error.message);
  } else {
    console.log('Profiles table schema ensured');
  }
};
