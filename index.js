const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const Config = require('./config.json');
const Package = require('./package.json');

require('dotenv/config');
var token = process.env.TOKEN;
var ownerId = process.env.owner;
var prefix = process.env.prefix || Config.prefix;
var version = Package.version;

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
    .registerDefaultCommands({
        eval: false,
        load: false,
        reload: false,
        unload: false,
    })
    .registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', () => {
    console.log(`Test bot ready.`);
    client.user.setActivity(`${prefix} || ${version}`);
});

client.on('error', console.error);

client.login(token);
