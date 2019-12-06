const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Gif extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'fun',
            memberName: 'gif',
            description: 'Sende ein zufälliges Gif mit einem bestimmten Suchbegriff',
            args: [
                {
                    key: "search",
                    prompt: "Nach was möchtest du suchen?",
                    type: "string",
                },
            ],
        });
    }

    run(msg, { search }) {
        let tenorToken = process.env.TENORTOKEN;

        const Tenor = require("tenorjs").client({
            "Key": tenorToken,
            "Filter": "low", // "off", "low", "medium", "high"
            "Locale": "de_DE",
            "MediaFilter": "minimal",
            "DateFormat": "D/MM/YYYY - H:mm:ss A"
        });

        Tenor.Search.Random(search, "1").then(Results => {
            Results.forEach(async Post => {
                msg.channel.send(Post.url);
            });
        }).catch(console.error);
    }
}
