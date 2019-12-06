const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const functions = require('../../Misc/functions');

module.exports = class Random extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rnd'],
            group: 'first',
            memberName: 'random',
            description: 'Würfelt eine Zufallszahl zwischen zwei Zahlen',
            args: [
                {
                    key: 'min',
                    prompt: 'Welche Zahl soll das Minimum sein?',
                    type: 'integer',
                },
                {
                    key: 'max',
                    prompt: 'Welche Zahl soll das Maximum sein?',
                    type: 'integer',
                },
            ],
        });
    }

    run(msg, { min, max }) {
        var rndNumber = functions.randomInt(min, max)
        var server = servers[msg.guild.id];

        if(max <= min) {
            if(server.lang == 'de') msg.reply('Das Maximum kann nicht kleiner oder gleich als das Minimum sein.');
            else if(server.lang == 'en') msg.reply('The maximum can not be less than or equal to the minimum.');
            return;
        }

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Ich habe ${rndNumber} für dich gewürfelt.`)

        if(server.lang == 'de') embed.setDescription(`Ich habe ${rndNumber} für dich gewürfelt.`);
        else if(server.lang == 'en') msg.reply(`I rolled ${rndNumber} for you.`);

        msg.reply(embed)
    }
}
