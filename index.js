require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { MeiliSearch } = require('meilisearch');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const meili = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY
});

client.on('ready', () => {
  console.log(`✅ Bot přihlášen jako ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // Umožnit např. "Yasuo", "Co dělá Yasuo", atd.
  let query = content;

  if (!content.toLowerCase().startsWith('co dělá šampion')) {
    query = `Co dělá šampion ${content.replace('Co dělá', '').replace('šampion', '').trim()}?`;
  }

  try {
    const search = await meili.index('faq').search(query, {
      limit: 1
    });

    if (search.hits.length > 0) {
      message.reply(search.hits[0].answer);
    } else {
      message.reply("❓ Omlouvám se, na tohle neznám odpověď.");
    }
  } catch (error) {
    console.error('❌ Chyba při hledání:', error);
    message.reply("⚠️ Nastala chyba při zpracování dotazu.");
  }
});

client.login(process.env.DISCORD_TOKEN);
