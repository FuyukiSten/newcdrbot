const Discord = require("discord.js");
const malScraper = require('mal-scraper');



module.exports.run = async (client, message, args) => {

  const search = `${args}`;

  malScraper.getInfoFromName(search)
    .then((data) => {
    const malEmbed = new Discord.RichEmbed()
      .setAuthor(`Resultado para ${args}`.split(',').join(' '))
      .setThumbnail(data.picture)
      .setColor('#ffc1cc') //I personally use bubblegum pink!
      .addField('Titulo em inglês', data.englishTitle, true)
      .addField('Titulo em japonês', data.japaneseTitle, true)
      .addField('Tipo', data.type, true)
      .addField('Episodios', data.episodes, true)
      .addField('Rank', data.rating, true)
      .addField('Foi ao ar em', data.aired, true)
      .addField('Link', data.url);

      message.channel.send(malEmbed);

      //console.log(data);
    })
}
    