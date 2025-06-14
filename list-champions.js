const fs = require('fs');

// Načtení JSON souboru
const rawData = fs.readFileSync('champion.json', 'utf-8');
const champions = JSON.parse(rawData);

// Výpis všech šampionů
console.log("Seznam šampionů:");
for (const key in champions.data) {
    const champ = champions.data[key];
    console.log(`${champ.name} – ${champ.title}`);
}
