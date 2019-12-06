const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

const functions = require('../../Misc/functions');
const LangModel = require('../../models/langModel');

module.exports = class Random extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rnd'],
            group: 'util',
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

    async run(msg, { min, max }) {
        let rndNumber = functions.randomInt(min, max);

        const req = await LangModel.findOne({ guildId: msg.guild.id });
        if(!req) return msg.reply('Error loading lang-doc');

        if(max <= min) {
            if(req.lang == 'de') msg.reply('Das Maximum kann nicht kleiner oder gleich als das Minimum sein.');
            else if(req.lang == 'en') msg.reply('The maximum can not be less than or equal to the minimum.');
            return;
        }

        const embed = new Discord.RichEmbed()
            .setColor(color);

        if(req.lang == 'de') embed.setDescription(`Ich habe ${rndNumber} für dich gewürfelt.`);
        else if(req.lang == 'en') embed.setDescription(`I rolled ${rndNumber} for you.`);

        msg.channel.send(embed);
    }
}
