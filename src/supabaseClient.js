import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fwbdtmdbfysmwgwsqapf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3YmR0bWRiZnlzbXdnd3NxYXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTM1MzcsImV4cCI6MjA3MjMyOTUzN30.Z_KLvtvMW0V2u3awP32OIL960usMGCGh32Q4_MexIxQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
