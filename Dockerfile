# Základní image s Node.js
FROM node:18

# Nastavení pracovního adresáře
WORKDIR /app

# Zkopírování package.json a package-lock.json
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Zkopírování ostatních souborů (např. bot.js, .env, champion.json atd.)
COPY . .

# Spuštění bota
CMD ["node", "bot.js"]
