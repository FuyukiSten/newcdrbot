const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const regdb = require("./database/regdatabase.js"); para const regdb = require("./database/registros.js");
const reg = JSON.parse(fs.readFileSync("./database/registrados.json", "utf8"));
const db = JSON.parse(fs.readFileSync("./database/blacklist.json", "utf8"));
client.database = regdb;
client.registrados = reg;
client.db = db;

let token = process.env.TOKEN;
let prefix = "c!";


client.on('ready', () => {
    console.log('Bot online !');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if(!db[message.author.id]) db[message.author.id] = {
        blacklist: false
      };
    if(db[message.author.id].blacklist == true) {
        message.delete().catch(O_o=>{});
        message.author.send('Você está na listra negra e portanto não pode enviar mensagens no servidor !').catch(h=>{});
    }  
    if (message.content.indexOf(prefix) !== 0) return;

    if (message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        'use strict';
        let data = err.message;  
        let buff = new Buffer(data);  
        let base64data = buff.toString('base64');
        console.error(err);
        let embed = new Discord.RichEmbed();
        embed.setColor('RANDOM');
        embed.setAuthor(`${message.author.username}#${message.author.discriminator}`);
        embed.setTitle('Falha ao executar o comando');
        embed.setDescription('Houve um erro ao processar o comando ou ele não existe !');
        embed.addField('Codigo do erro', `${base64data}`)
        message.channel.send(embed);
    }
});

client.login(token);
