import { createClient } from '@supabase/supabase-js'
// supabaseUrl URL
const supabaseUrl = 'https://gvdujixjhezcqdeyvgjs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZHVqaXhqaGV6Y3FkZXl2Z2pzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTc4NCwiZXhwIjoyMDQxNDk3Nzg0fQ.8rWhuvZOJmsxVnvm86H6qE0eXVnjALnfpAhDL66oDj4';
// supabase const keyword
export const supabase = createClient(supabaseUrl, supabaseKey)