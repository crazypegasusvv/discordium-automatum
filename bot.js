import dotenv from 'dotenv';
import { Client, Constants, Intents, Message, MessageEmbed } from 'discord.js';
import { Profanity, ProfanityOptions } from '@2toad/profanity';

const botProfanityOptions = new ProfanityOptions();
botProfanityOptions.wholeWord = true;

const botProfanity = new Profanity(botProfanityOptions);

dotenv.config();
var botIntents = [Intents.FLAGS.DIRECT_MESSAGES, 
                    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                    Intents.FLAGS.GUILDS, 
                    Intents.FLAGS.GUILD_MESSAGES, 
                    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
                    Intents.FLAGS.GUILD_MEMBERS];

const client = new Client({intents: botIntents});
client.on("ready", () => {
    console.log("powered up!😎");
});

function formatMessage(msg) {
    return {
        "type": "rich",
        "title": msg,
        "color": 0xa4c718
      }
}

client.on('messageCreate', msg =>{
    var angrytanjiro = client.emojis.cache.get("917390758472982528");
    angrytanjiro = angrytanjiro == null ? '😠': angrytanjiro;
    var msgcontent = msg.content;
    var supportedcmd = false;
    if(msg.author.bot)
    {
        return;
    }
    if(botProfanity.exists(msgcontent.toString()))
    {
        var emoji = '';
        if(angrytanjiro != null)
        {
            emoji += `${angrytanjiro}`;
        }
        var profaneMsgReply = `I hear profanity and I don't like it!`;
        msg.channel.send(profaneMsgReply);
        msg.channel.send(angrytanjiro);
        return;
    }
    if(msgcontent.startsWith('&'))
    {
        msgcontent= msgcontent.substring(1);
        supportedcmd = true;
    }
    if(supportedcmd)
    {
        var retmsg = msg.author.tag + ", ";
        if(msgcontent === "help" || msgcontent === "h")
        {
            retmsg += "I only support date for now so try typing &date and &invite";
        }
        else if(msgcontent === "date")
        {
            const date = new Date();
            retmsg += "here's your local time: " + date.toLocaleString();
        }
        else if(msgcontent === "invite")
        {
            msg.author.send("https://discord.gg/2GZEJ2nx");
            msg.reply("I sent an invite link to your DM!");
            return;
        }
        else
        {
            retmsg += " I got your msg but I don't know what to do with it at the moment!"
        }
        msg.channel.send({embeds: [formatMessage(retmsg)]});
    }
});

client.login(process.env.BOT_TOKEN)
