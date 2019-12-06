const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Superagent = require('superagent');

module.exports = class Hug extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'anime',
            memberName: 'hug',
            description: 'Umarme eine Person deiner Wahl',
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Wen möchtest du umarmen?",
                    type: "user",
                },
            ],
        });
    }

    run(msg, { user }) {
        let tenorToken = process.env.TENORTOKEN;

        const Tenor = require("tenorjs").client({
            "Key": tenorToken,
            "Filter": "low", // "off", "low", "medium", "high"
            "Locale": "de_DE",
            "MediaFilter": "minimal",
            "DateFormat": "D/MM/YYYY - H:mm:ss A"
        });

        Tenor.Search.Random("anime hug", "1").then(Results => {
            Results.forEach(async Post => {
                const sender = `<@${msg.member.user.id}>`;
                const receiver = `<@${user.id}>`;

                msg.channel.send(Post.url);
                msg.channel.send(`${sender} umarmt ${receiver}!`);

                // let waitingMsg = await msg.channel.send('Generating...');

                // let url = Post.url;
                // let fileLink = url.replace(/(?:\/)/g, '\\/');
                // console.log('fileLink: ' + fileLink);

                // let newBodyFormat = `{"file":"${fileLink}"}`;
                // console.log('newBodyFormat: ' + newBodyFormat);

                // let {body} = await Superagent.get(`${newBodyFormat}`);
                // console.log('body: ' + body.file);
            });
        }).catch(console.error);
    }
}
