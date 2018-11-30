var Discord = require('discord.js');
var waifu = require('snekfetch');

exports.run = async (client, message, args) => {
    let gay = Math.round(Math.random() * 100);
  
    let gayembed = new Discord.RichEmbed()
        .setColor("#f442d4")
        .setTitle(`🏳 🌈 | **De acordo com meus calculos o usuário ${message.author.username} é ${gay}% gay!**`);
    message.delete(10);
    return message.channel.send(gayembed);
}
