const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

global.servers = [];

function playSong(connection, msg) {
    var server = servers[msg.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: "audioonly" }));

    // Video Info auslesen
    ytdl.getBasicInfo(server.queue[0], (err, info) => {
        var timeInSeconds = info.length_seconds;
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - minutes * 60;
        if(seconds < 10) seconds = `0${seconds}`;

        var time = `${minutes}:${seconds}`;

        const infoEmbed = new Discord.RichEmbed()
            .setColor(color)
            .addField('Titel', info.title)
            .addField('Dauer', time)
        
        msg.channel.send(infoEmbed);
    })

    server.queue.shift();

    server.dispatcher.on('end', function() {
        if(server.queue[0]) {
            // const nextEmbed = new discordjs.RichEmbed()
            //     .setColor(color)
            //     .addDescription('Ich spiel das nächste Lied ab.')
        
            // msg.channel.send(nextEmbed)
            playSong(connection, msg);
        } 
        else {
            const leaveEmbed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Bis später.')
            
            msg.channel.send(leaveEmbed);

            connection.disconnect();
        }
    })
}

module.exports = class TemplateCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['play'],
            group: 'music',
            memberName: 'play',
            description: 'Spielt ein beliebiges YouTube-Video im VoiceChannel ab oder fügt eines zur Queue hinzu.',
            args: [
                {
                    key: 'link',
                    prompt: 'Damit ich dir Musik abspielen kann, brauche ich einen Link.',
                    type: 'string'
                },
            ],
        });
    }

    run(msg, { link }) {
        // Prüfen, ob User in einem VoiceChannel ist
        if(!msg.member.voiceChannel) {
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Du musst in einem VoiceChannel sein, damit ich dir beitreten kann.')
            
            msg.channel.send(embed);
            return;
        }

        // Wenn der Server noch nicht im Array gespeichert ist -> Hinzufügen
        if(!servers[msg.guild.id]) servers[msg.guild.id] = {
            queue: []
        }

        var server = servers[msg.guild.id];

        // Link zur queue hinzufügen
        server.queue.push(link);

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Lied wurde in die Queue hinzugefügt.')

        if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
            playSong(connection, msg);
        });
    }
}
