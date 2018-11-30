const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    let _c = client.channels.get(message.channel.id);
    let embed = new Discord.RichEmbed();
    embed.setTitle('Informações do bot');
    embed.setColor(0xff3232);
    embed.addField('Linguagem utilizada:', 'JavaScript', true);
    embed.addField('Bibliotecas utilizadas:', '⇒ Discord.js\n⇒ fs\n⇒ sqlite3\n⇒ enmap\n⇒ moment\n⇒ sqlite\n⇒ http\n⇒ express', true);
    embed.addField('Prefix:', `c!`, true);
    embed.addField('Comandos:', `c!cmds`, true);
    embed.addField('Versão do Node', '8.4.0');
    embed.addField('Créditos', `Bot criado & desenvolvido por <@505096421532368907>`, true);
    embed.setThumbnail(client.user.avatarURL);
    embed.setFooter('Versão: 0.1', message.guild.iconURL);
    _c.send(embed);
}