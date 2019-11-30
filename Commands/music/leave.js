const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Leave extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases: ['leave'],
            group: 'music',
            memberName: 'leave',
            description: 'Stoppt die Musik und verlässt den VoiceChannel',
            guildOnly: true,
        });
    }

    run(msg) {
        var server = servers[msg.guild.id];

        if(msg.guild.voiceConnection) {
            for (var i = server.queue.length - 1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }
            
            server.dispatcher.end();
            console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
        }
    }
}
