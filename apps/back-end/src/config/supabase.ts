import { createClient } from '@supabase/supabase-js';
import Environment from '../helper/constan/environment';

const supabaseUrl = Environment.SUPABASE_URL;
const supabaseKey = Environment.SUPABASE_SERVICE_ROLE_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
