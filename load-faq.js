const { MeiliSearch } = require('meilisearch');
const fs = require('fs');

const client = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_MASTER_KEY
});

async function loadFAQ() {
  const data = JSON.parse(fs.readFileSync('faq.json', 'utf-8'));
  const index = client.index('faq');

  const response = await index.addDocuments(data);
  console.log('✅ Data nahrána:', response);
}

loadFAQ().catch(err => {
  console.error('❌ Chyba při nahrávání:', err);
});
