var Discord = require('discord.js');
var waifu = require('snekfetch');
const moment = require("moment")
moment.locale("pt-BR")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Sem permissão');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }
    message.channel.send(`✅ | O canal será destrancado.`)
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
    });
    let embed = new Discord.RichEmbed();
    embed.addField('Canal destrancado', `${message.channel}`);
    embed.addField('Moderador', `${message.author}`);
    embed.addField('Comando efetuado em', `${moment(message.createdAt).format('LLLL')}`)
    client.channels.get('402216351885950977').send(embed);
}