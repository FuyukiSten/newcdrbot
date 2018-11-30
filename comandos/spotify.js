const Discord = require('discord.js');

exports.run = (client, message, args) => {

    var user = message.mentions.users.first() || message.author;

    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.RichEmbed()
                .setAuthor('Spotify informações')
                .setColor('FF0000')
                .setThumbnail(trackImg)
                .setDescription(`
\`🎵\` **Nome da música :**  \`${trackName}\`
\`📀\` **Album :**  \`${trackAlbum}\`
\`🎤\` **Autor(es) :**  \`${trackAuthor}\`
`)
                .addField('Ouça essa música :', `[${trackUrl}](${trackUrl})`, false);

            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send(`\`[ERRO ❌]\`, ${user.username} não está ouvindo um som registrado no spotify.`);
        }

    } else {
        return message.channel.send(`${user.username} não está ouvindo nada no spotify.`);
    }
};