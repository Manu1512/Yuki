const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Functions = require('../../Misc/functions');

// global.loop = false;

module.exports = class Loop extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            group: 'music',
            memberName: 'loop',
            description: 'Spielt das aktuelle Lied im Loop ab.',
            args: [
                {
                    key: 'argument',
                    prompt: 'Soll ich den Loop starten oder beenden?',
                    type: 'string',
                    oneOf: ['start', 'stop'],
                },
            ],
        });
    };

    run(msg, { argument }) {
        var server = servers[msg.guild.id];
        var varStartStop = argument; // Liest 'start' oder 'stop' ein

        if (varStartStop === 'start') {
            if(server.loop) {
                msg.reply('Der Loop ist bereits aktiv. Meintest du \'stop\'?');
                return;
            } 

            // Verhindert, dass server.queue.shift() aktiv wird (play.js)
            server.loop = true;

            // Fügt den Link wieder zum Array hinzu, um ihn erneut abzuspielen
            server.queue.unshift(currentLink);

            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Ich spiele das Lied im Loop ab!');

            msg.reply(embed);
        } else if(varStartStop == 'stop') {
            if(!server.loop) {
                msg.reply('Der Loop läuft momentan nicht. Meintest du \'start\'?');
                return;
            }

            server.loop = false; // Aktiviert server.queue.shift() (play.js)
            server.queue.shift(); // Damit das Lied nicht erneut abgespielt wird

            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Ich beende den Loop für dich und spiele das nächste Lied in der Queue ab.');

            msg.reply(embed);
        }
    }
}
