const { MeiliSearch } = require('meilisearch');
const fs = require('fs');

require('dotenv').config();

const client = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_MASTER_KEY
});

const documents = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

client.index('faq').addDocuments(documents)
  .then(res => {
    console.log('✅ Úspěšně nahráno:', res);
  })
  .catch(err => {
    console.error('❌ Chyba při nahrávání:', err);
  });
