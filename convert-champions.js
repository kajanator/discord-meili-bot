const fs = require('fs');

// Načti český JSON s šampiony
const data = JSON.parse(fs.readFileSync('champion.json', 'utf8'));
const champions = data.data;

const result = Object.keys(champions).map(key => {
  const champ = champions[key];
  return {
    id: champ.id,
    question: `Co dělá šampion ${champ.name}?`,
    answer: champ.blurb // Krátký popis
  };
});

fs.writeFileSync('faq.json', JSON.stringify(result, null, 2), 'utf8');
console.log('✅ Šampioni převedeni do faq.json');
