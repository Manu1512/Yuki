const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Random extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rnd'],
            group: 'misc',
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
                    prompt: 'Welche Zahl soll das Minimum sein?',
                    type: 'integer',
                },
            ],
        });
    }

    run(msg, { min, max }) {
        var rndNumber = methods.randomInt(min, max)

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Ich habe ${rndNumber} für dich gewürfelt.`)

        msg.reply(embed)
    }
}
