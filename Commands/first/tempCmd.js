const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class TemplateCmd extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['test', 't'],
            group: 'first',
            memberName: 'test',
            description: 'Ein Befehl, um den Bot zu testen',
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    run(msg) {
        return msg.say('Test successfull');
    }
}
