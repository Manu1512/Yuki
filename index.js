const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const Config = require('./config.json');
const Package = require('./package.json');

require('dotenv/config');
var token = process.env.TOKEN;
var ownerId = process.env.owner;
var prefix = process.env.prefix || Config.prefix;
var botName = Package.name;
var version = Package.version;

global.servers = [];
global.color = Config.color;

// Heroku
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: ownerId
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['first', 'Misc'],
        ['fun', 'Fun'],
        ['anime', 'Anime'],
        ['music', 'Music']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', () => {
    console.log(`Bot '${botName}' ready. Version ${version}\n`);
    console.log('Connected guilds: ');

    let serverIndex = 0;

    client.guilds.forEach(guild => {
        console.log(`${guild.name}: ${guild.id}`);

        // Alle Server in ein Array speichern (Neu)
        // if(!servers[guild.id]) servers[serverIndex] = {
        //     lang: 'de'
        // };

        // Alle Server in ein Array speichern mithilfe der Server-ID
        // Für Kompatibilität - Hauptsächlich 'music'
        if(!servers[guild.id]) servers[guild.id] = {
            queue: [],
            loop: false,
            lang: 'de'
        };

        // serverIndex++;
    });

    client.user.setActivity(`${prefix} || ${version}`);
});

client.on('error', console.error);

client.login(token);
