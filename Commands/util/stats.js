const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Stats extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'util',
            memberName: 'stats',
            description: 'Zeigt die stats eines Users an',
            args: [
                {
                    key: 'user',
                    prompt: 'Für welchen User würdest du gerne die Stats anzeigen lassen?',
                    type: 'user',
                },
            ],
        });
    }

    run(msg, { user }) {
        const receiver = `<@${user.id}>`;

        const tag = user.tag;
        const username = user.username;
        const avatarURL = user.displayAvatarURL;

        require('date.format');
        let createdAt = user.createdAt;
        createdAt = createdAt.format('{DD}.{MM}.{Y}, {hh}:{mm}');

        let status = user.presence.status;
        switch(status) {
            case 'online':
                status = 'Online';
                break;
            case 'idle':
                status = 'Abwesend';
                break;
            case 'dnd':
                status = 'Nicht stören';
                break;
            case 'offline':
                status = 'Offline';
                break;
        }

        let currentGame = 'Nichts';
        if(user.presence.game != null) currentGame = user.presence.game.name;

        let userIsBot = 'Nein';
        if(user.bot) userIsBot = 'Ja';

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail(avatarURL)
            .setTitle(`Stats für ${username}`)
            .addField('Name', username, true)
            .addBlankField(true)
            .addField('User-Tag', tag, true)
            .addBlankField()
            .setTimestamp()
            .setFooter('Yuki')
        
        if(user.bot) {
            embed.addField('Bot', userIsBot, true);
            embed.addField('Status', status, true);
        } else {
            embed.addField('Bot', userIsBot, true);
            embed.addBlankField(true);
            embed.addField('Erstellt', createdAt, true);
            embed.addField('Status', status, true);
            embed.addBlankField(true);
            embed.addField('Spielt', currentGame, true);
        }

        msg.channel.send(embed);
    }
}
