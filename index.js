const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const Config = require('./config.json');

var token = process.env.TOKEN;
var ownerId = process.env.owner;
var prefix = Config.prefix;

global.color = Config.color;

// Für Heroku
require('dotenv/config')
const http = require('http')
const port = process.env.PORT || 3000
http.createServer().listen(port)

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: ownerId
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['first', 'First'],
        ['misc', 'Misc'],
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
})

client.on('error', console.error);

client.login(token);
