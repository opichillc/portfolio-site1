import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase credentials missing in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for admin credentials
rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password (min 6 characters): ', async (password) => {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      });

      if (error) {
        console.error('Error creating admin user:', error.message);
      } else {
        console.log('Admin user created successfully!');
        console.log('User ID:', data.user.id);
        console.log('You can now log in at /admin/login');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      rl.close();
    }
  });
});