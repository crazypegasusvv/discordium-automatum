import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { Intents } from 'discord.js';

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

function mentionUser(id){
    return '<@'+ id+'>';
}

client.on('messageCreate', msg =>{
    var msgcontent = msg.content;
    var supportedcmd = false;
    if(msg.author.bot)
    {
        return;
    }
    if(msgcontent.startsWith('&'))
    {
        msgcontent = msgcontent.substr(1);
        supportedcmd = true;
    }
    if(supportedcmd)
    {
        if(msgcontent === "help" || msgcontent === "h")
        {
            msg.channel.send("I only support date for now so try typing &date");
        }
        else if(msgcontent === "date")
        {
            const date = new Date();
            var retmsg = mentionUser(msg.author.id) + " here's today's date: " + date.toLocaleString();
            msg.channel.send(retmsg);
        }
        else
        {
            var retmsg = mentionUser(msg.author.id) +" I got your msg but I don't know what to do with it at the moment!";
            msg.channel.send(retmsg);
        }
    }
    
});

client.login(process.env.BOT_TOKEN)
