const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const YTDL = require('ytdl-core')
const Play = require('./play')

module.exports = class TemplateCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['skip'],
            group: 'music',
            memberName: 'skip',
            description: 'Überspringt das momentane Lied',
        });
    }

    run(msg) {
        var server = servers[msg.guild.id];

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Na gut. Ich überspringe das Lied für dich.')
    
        msg.channel.send(embed)

        if(server.dispatcher) server.dispatcher.end();
    }
}
