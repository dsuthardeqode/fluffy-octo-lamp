// @ts-ignore
import {REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY} from '@env';

if (!REACT_NATIVE_SUPABASE_URL) {
  console.error(
    'constants.ts',
    'Make sure you have a `.env` file to populate your variables.',
  );
}

export const SUPABASE_URL: string = REACT_NATIVE_SUPABASE_URL || '';

export const SUPABASE_ANON_KEY: string = REACT_NATIVE_SUPABASE_ANON_KEY || '';
