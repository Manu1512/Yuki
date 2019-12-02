const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Functions = require('../../Misc/functions');

module.exports = class uwu extends Command {
    constructor(client) {
        super(client, {
            name: 'uwu',
            aliases: ['uwufy'],
            group: 'fun',
            memberName: 'uwu',
            description: 'Twanswates evewy Text into uwu. Wowks best with engwish.',
            args: [
                {
                    key: 'text',
                    prompt: 'Ich bwauche einyen text UwU',
                    type: 'string',
                },
            ],
        });
    };

    run(msg, { text }) {
        let uwu = text;
        let emotes = ['✧w✧', 'UwU', '( ᴜ ω ᴜ )', '(⁄˘⁄ ⁄ ω⁄ ⁄ ˘⁄)♡', '( ᴜ ω ᴜ )'];
        let randomEmote = Functions.randomInt(0, emotes.length - 1);

        uwu = uwu.replace(/(?:r|l)/g, 'w');
        uwu = uwu.replace(/(?:R|L)/g, 'W');
        uwu = uwu.replace(/n([aeiou])/g, 'ny$1');
        uwu = uwu.replace(/N([aeiou])/g, 'Ny$1');
        uwu = uwu.replace(/N([AEIOU])/g, 'NY$1');
        uwu = uwu.replace(/ove/g, 'uv');

        uwu = uwu.replace(/(?:\!|\.)/g, emotes[randomEmote]);

        msg.channel.send(uwu);
    }
}
