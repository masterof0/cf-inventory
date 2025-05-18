import { createClient } from '@supabase/supabase-js'

const supaurl = import.meta.env.VITE_SUPAURL
const supaapi = import.meta.env.VITE_SUPAAPI

export const supabase = createClient(supaurl, supaapi)
