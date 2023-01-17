if (!process.env.REACT_NATIVE_SUPABASE_URL) {
  console.error(
    'constants.ts',
    'Make sure you have a `.env` file to populate your variables.',
  );
}

export const SUPABASE_URL: string = process.env.REACT_NATIVE_SUPABASE_URL || '';

export const SUPABASE_ANON_KEY: string =
  process.env.REACT_NATIVE_SUPABASE_ANON_KEY || '';
