const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const LangModel = require('../../models/langModel');

const Config = require('../../config.json');

const prefix = process.env.prefix || Config.prefix;
const owner = process.env.owner;

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
                    default: 'current'
                },
            ],
        });
    }

    run(msg, { lang }) {
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
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('I changed the language to english.');

            msg.channel.send(embed);
        } else if(lang == 'de') {
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Ich habe die Sprache auf Deutsch geändert.');

            msg.channel.send(embed);
        } else if(lang == 'current') {
            (async () => {
                // Versucht die Datei mithilfe der Server-ID zu finden
                const req = await LangModel.findOne({ guildId: msg.guild.id });
                if(!req) return msg.reply(`Es ist ein Fehler aufgetreten (lang-doc not found). Bitte kontaktiere <@${owner}>`);

                const embed = new Discord.RichEmbed()
                    .setColor(color)
                    .addField('Aktuelle Sprache', req.lang);

                return msg.channel.send(embed);
            })();
        }

        // Verhindert, dass 'current' und 'list' als Sprache in die Datenbank eingetragen wird
        if(lang != 'current' && lang != 'list') {
            (async () => {
                // Löscht die aktuelle Datei
                await LangModel.findOneAndDelete({ guildId: msg.guild.id });

                // Erstellt eine neue Datei
                const langMod = new LangModel({
                    guildId: msg.guild.id,
                    lang: lang
                });
    
                // Speichert die Datei
                langMod.save();
            })();
        }
    }
}
