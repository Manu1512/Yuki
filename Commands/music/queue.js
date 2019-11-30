const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

var queueText = [];

function checkTitle(links) {
    links.forEach(element => {
        ytdl.getBasicInfo(element, (err, info) => {
            queueText.push(info.title)
        });
    });
}

module.exports = class Queue extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['queue'],
            group: 'music',
            memberName: 'queue',
            description: 'Listet alle Lieder auf, die sich momentan in der Queue befinden.',
            guildOnly: true,
        });
    }

    run(msg) {
        var server = servers[msg.guild.id];

        // Überprüft, ob sich der Bot in einem VoiceChannel befindet
        if(msg.guild.voiceConnection){
            if(!server.queue[0]) {
                msg.reply('Es befinden sich momentan keine Lieder in der Queue.')
            }
            else {
                server.queue.forEach(element => {
                    ytdl.getBasicInfo(element, (err, info) => {
                        queueText.push(info.title);
                    });
                });

                setTimeout(() => {
                    var embedText = queueText.join('\n')

                    const embed = new Discord.RichEmbed()
                        .setColor(color)
                        .addField('Queue', embedText)

                    msg.reply(embed)
                }, 1000);
            }
        }
        else msg.reply('Ich befinde mich momentan nicht in einem VoiceChannel.')
    }
}
