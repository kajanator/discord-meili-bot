const fs = require('fs');
const { MeiliSearch } = require('meilisearch');
require('dotenv').config();

const meili = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY
});

const rawData = JSON.parse(fs.readFileSync('./champion.json'));
const champions = Object.values(rawData.data).map(champ => ({
  id: champ.id,
  question: `Co dělá šampion ${champ.id}?`,
  answer: champ.blurb
}));

(async () => {
  try {
    const index = await meili.index('faq');
    const response = await index.addDocuments(champions);
    console.log('✅ Data nahrána do MeiliSearch:', response);
  } catch (error) {
    console.error('❌ Chyba při nahrávání:', error);
  }
})();
