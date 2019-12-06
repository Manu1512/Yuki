const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const Config = require('../../config.json');

var prefix = process.env.prefix || Config.prefix;

module.exports = class Lang extends Command {
    constructor(client) {
        super(client, {
            name: 'lang',
            aliases: ['language', 'sprache'],
            group: 'util',
            memberName: 'lang',
            description: 'Ändere die Sprache des Bots für den Server.',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'lang',
                    prompt: `In welcher Sprache soll ich mit dir sprechen? Liste verfügbarer Sprachen: ${prefix}lang list`,
                    type: 'string',
                },
            ],
        });
    }

    run(msg, { lang }) {
        var server = servers[msg.guild.id];
        const availableLang = [
            'en', 'de'
        ];

        if(lang == 'list') {
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setTitle('Verfügbar: ')
                .setDescription(availableLang.toString());

            msg.channel.send(embed);
        } else if(lang == 'en') {
            server.lang = 'en';
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('I changed the language to english.');

            msg.channel.send(embed);
        } else if(lang == 'de') {
            server.lang = 'de';
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Ich habe die Sprache auf Deutsch geändert.');

            msg.channel.send(embed);
        }
    }
}
