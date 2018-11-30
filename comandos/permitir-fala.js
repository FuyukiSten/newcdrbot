var Discord = require('discord.js');
var waifu = require('snekfetch');
const moment = require("moment")
moment.locale("pt-BR")
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
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
    if(!message.member.highestRole.comparePositionTo(m.highestRole) > 0){
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Você não pode silenciar um membro com um cargo acima do seu.');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }
    if(message.member.hasRole('457809186755969055')) {
        m.removeRole('457809186755969055');
        message.channel.send(`✅ | O membro ${m} agora pode falar novamente !`)
        let embed = new Discord.RichEmbed();
        embed.addField('Membro que pode falar novamente', `${m}`);
        embed.addField('Moderador', `${message.author}`);
        embed.addField('Comando efetuado em', `${moment(message.createdAt).format('LLLL')}`)
        client.channels.get('402216351885950977').send(embed);
    } else {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('O membro mencionado não está silenciado.');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed); 
    }

}