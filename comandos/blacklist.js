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
      let motivo = args.slice(1).join(' ');
      if(!motivo) return motivo = 'Sem motivo definido';
      if(client[m.id].blacklist) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('O membro já está na lista negra.\nps: caso deseje remove-lo da lista negra utilize: `c!whitelist @membro`');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed); 
    } else {
        client.db[m.id].blacklist = true;
        fs.writeFile("./database/blacklist.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
          });  
        message.channel.send(`✅ | O membro ${m} foi punido com sucesso !`)
        let embed = new Discord.RichEmbed();
        embed.addField('Membro colocado na lista negra', `${m}`);
        embed.addField('Moderador', `${message.author}`);
        embed.addField('Comando efetuado em', `${moment(message.createdAt).format('LLLL')}`)
        embed.addField('Motivo', motivo);
        client.channels.get('402216351885950977').send(embed);

    }
}