const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class TemplateCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'uwu',
            aliases: ['uwufy'],
            group: 'fun',
            memberName: 'test',
            description: 'uwu',
            args: [
                {
                    key: 'text',
                    prompt: 'Twanswates evewy Text into uwu. Wowks best with engwish.',
                    type: 'string',
                },
            ],
        });
    }

    run(msg, { text }) {
        var uwu = text;

        uwu = uwu.replace(/(?:r|l)/g, 'w')
        uwu = uwu.replace(/(?:R|L)/g, 'W')
        uwu = uwu.replace(/n([aeiou])/g, 'ny$1')
        uwu = uwu.replace(/N([aeiou])/g, 'Ny$1')
        uwu = uwu.replace(/N([AEIOU])/g, 'NY$1')
        uwu = uwu.replace(/ove/g, 'uv')

        msg.channel.send(`${uwu} UwU`)
    }
}
