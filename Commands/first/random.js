const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const functions = require('../../Misc/functions')

module.exports = class Random extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rnd'],
            group: 'first',
            memberName: 'random',
            description: 'Würfelt eine Zufallszahl',
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

        if(max < min) {
            msg.reply('Das Maximum kann nicht kleiner als das Minimum sein.');
            return;
        }

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Ich habe ${rndNumber} für dich gewürfelt.`)

        msg.reply(embed)
    }
}
