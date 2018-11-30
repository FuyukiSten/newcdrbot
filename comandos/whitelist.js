var Discord = require('discord.js');
var waifu = require('snekfetch');
const moment = require("moment")
moment.locale("pt-BR")
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Sem permissão');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }
    // 402216351885950977
    let m = message.mentions.member.first();
    if(!m) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Mencione um membro para usar esse comando.');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }    
    if(!client.db[m.id]) client.db[m.id] = {
        blacklist: false
      };
      if(client[m.id].blacklist) {
        client.db[m.id].blacklist = false;
        fs.writeFile("./database/blacklist.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
          });        
        message.channel.send(`✅ | O membro ${m} foi removido da lista negra com sucesso !`)
        let embed = new Discord.RichEmbed();
        embed.addField('Membro removido na lista negra', `${m}`);
        embed.addField('Moderador', `${message.author}`);
        embed.addField('Comando efetuado em', `${moment(message.createdAt).format('LLLL')}`)
        client.channels.get('402216351885950977').send(embed);  

    } else {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('O membro não está na lista negra.\nps: caso deseje adiciona-lo a lista negra utilize: `c!blacklist @membro <motivo>`');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed); 
    }
}