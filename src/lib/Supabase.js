import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bwhmvauaqjmkbodaxpns.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aG12YXVhcWpta2JvZGF4cG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MzY0NzMsImV4cCI6MjA3NTAxMjQ3M30.uL0sRJuBQZRfVmrWWGfjQzndUL_nt-QTwAzwd8yzRAM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
