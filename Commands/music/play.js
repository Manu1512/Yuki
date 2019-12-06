const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

const Functions = require('../../Misc/functions');

global.currentLink;

function playSong(connection, msg) {
    var server = servers[msg.guild.id];

    try {
        server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: "audioonly" }));
    } catch {
        console.log('error: Something went wrong while downloading from YouTube');
        msg.reply(`Irgendetwas hat beim Download des Videos nicht geklappt. すいません (ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू)\n` + 
                  `Bitte versuchs nochmal! Fehlerhafter Link: ${server.queue[0]}`);

        server.queue.shift();
        connection.disconnect();

        return;
    }

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

    // Speichere den Link im Index[0] ab für .unshift (loop.js)
    currentLink = server.queue[0];

    // Wenn loop aktiviert -> shift ignorieren
    if(!server.loop) server.queue.shift();

    server.dispatcher.on('end', function() {
        if(server.queue[0]) {
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

module.exports = class Play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['play'],
            group: 'music',
            memberName: 'play',
            description: 'Spielt ein beliebiges YouTube-Video im VoiceChannel ab oder fügt eines zur Queue hinzu',
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK'],
            userPermissions: ['CONNECT'],
            args: [
                {
                    key: 'link',
                    prompt: 'Damit ich dir Musik abspielen kann, brauche ich einen Link.',
                    type: 'string',
                },
            ],
        });
    }

    run(msg, { link }) {
        if(!link) return;

        // Überprüft den Link auf eine YouTube URL
        if(!Functions.validateYouTubeUrl(link)) {
            msg.reply('Ich kann leider keine gültige YouTube URL darin erkennen.');
            return;
        }

        // Prüfen, ob User in einem VoiceChannel ist
        if(!msg.member.voiceChannel) {
            const embed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('Du musst in einem VoiceChannel sein, damit ich dir beitreten kann.')
            
            msg.channel.send(embed);
            return;
        }

        // Wenn der Server noch nicht im Array gespeichert ist -> Hinzufügen
        // if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        //     queue: [],
        //     loop: false
        // };

        var server = servers[msg.guild.id];

        // Link zur queue hinzufügen
        server.queue.push(link);

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Ich habe das Lied für dich in die Queue hinzugefügt.')

        msg.channel.send(embed);

        // VoiceChannel betreten und playSong() abrufen
        if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
            playSong(connection, msg);
        });
    }
}
