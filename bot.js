require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('✅ Bot spuštěn. Napiš příkaz !champion nebo !random');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'champion') {
        const name = args[0]?.toLowerCase();
        if (!name) {
            return message.channel.send("Napiš jméno šampiona, např. `!champion yasuo`");
        }

        const championInfo = {
            yasuo: "🌀 Yasuo je neohrožený mečem vládnoucí samuraj ovládající vítr.",
            ahri: "🦊 Ahri je liščí mágyně, která čerpá sílu z esencí duší.",
            teemo: "🍄 Teemo je malý, ale smrtící yordle s pastmi a jedem.",
            zed: "🌑 Zed je mistr stínů a nebezpečný zabiják."
        };

        const info = championInfo[name];

        if (info) {
            message.channel.send(`Zadal jsi šampiona **${name}**:\n${info}`);
        } else {
            message.channel.send(`Šampiona **${name}** neznám. Zkus třeba: yasuo, ahri, teemo, zed.`);
        }
    }

    if (command === 'random') {
        try {
            const championsData = JSON.parse(fs.readFileSync('champion.json'));
            const allChampions = Object.values(championsData.data);
            const randomChampion = allChampions[Math.floor(Math.random() * allChampions.length)];

            message.channel.send(`🎲 Náhodný šampion: **${randomChampion.name}** – ${randomChampion.title}`);
        } catch (err) {
            console.error("Chyba při načítání champion.json:", err);
            message.channel.send("Nastala chyba při načítání šampionů.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
