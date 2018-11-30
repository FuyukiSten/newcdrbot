const Discord = require('discord.js');
const fs = require('fs');
exports.run = async (client, message, args) => {
    // eu ia fazer comentarios sobre como funciona tudo aq mas, deu uma preguiça né
    if(!message.member.roles.some(r=>["Organizadores Especiais"].includes(r.name)) )
    {
        let _e = new Discord.RichEmbed(0xff3232);
        _e.setColor();
        _e.setDescription(`${message.author}, você precisa ter o cargo <@&513187405319110669> para usar esse comando.`);
        client.channels.get(message.channel.id).send(_e);
        return;
    }

    let _m = message.mentions.members.first();
    if(!_m || _m.user.bot || _m.id == message.author.id)
    {
        let _e = new Discord.RichEmbed();
        _e.setColor(0xff3232);
        _e.setDescription(`${message.author}, você precisa mencionar um membro para usar esse comando.`);
        client.channels.get(message.channel.id).send(_e);
        return;
    }

    if (!client.registrados[_m.id]) client.registrados[_m.id] = {
        registrado: false
      };
    let _mr = client.registrados[_m.id];
    if(_mr.registrado == false) {
        let A_1 = new Discord.RichEmbed();
        A_1.setColor(0xff3232);
        A_1.setDescription(`${message.author}, você registrou o ${_m} com sucesso`);
        client.channels.get(message.channel.id).send(A_1);
        let A_2 = new Discord.RichEmbed();
        A_2.setColor(0xff3232);
        A_2.setAuthor(`Você foi registrado no servidor !`, message.guild.iconURL);
        A_2.addField('Quem registrou:', message.author);
        A_2.addField('ID:', message.author.id);
        client.users.get(_m.id).send(A_2).catch(O_o=>{console.error(O_o)});
        _mr.registrado = true;
        client.database.increaseregisters(message.author.id, message.author.username, 1);
        fs.writeFile("./database/registrados.json", JSON.stringify(client.registrados), (x) => {
            if (x) console.error(x)
          });
    } else {
        let A_3 = new Discord.RichEmbed();
        A_3.setColor(0xff3232);
        A_3.setDescription(`${message.author}, desculpe mas o membro mencionado já foi registrado.`);
        client.channels.get(message.channel.id).send(A_3);
    }  
}
