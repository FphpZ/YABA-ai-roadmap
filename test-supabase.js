const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rnvqgbyyporijhxzwtzs.supabase.co';
const supabaseKey = 'TA_CLE_ANON_ICI'; // Mets la vraie clé eyJ...

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('worlds').select('*');
    
    if (error) {
      console.error('❌ Erreur:', error.message);
    } else {
      console.log('✅ Connexion réussie !');
      console.log('Mondes trouvés:', data);
    }
  } catch (err) {
    console.error('❌ Erreur de connexion:', err);
  }
}

testConnection();