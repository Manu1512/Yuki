const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class TemplateCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['test', 't'],
            group: 'misc',
            memberName: 'test',
            description: 'Test Command',
        });
    }

    run(msg) {
        return msg.say('Test successfull');
    }
}
