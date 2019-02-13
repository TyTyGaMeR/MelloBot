const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "?"; 
const express = require('express')
const app = express();

client.on('ready', () => {
    client.user.setPresence({ game: { name: 'codé par TyTy'}})
    console.log("Bot Ready !");
});



client.login('token');


client.on('message',message =>{
    if (!message.guild) return;
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
  if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
  if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
  if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
});

client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

if (args[0].toLocaleLowerCase() === prefix + '8ball'){
    if (!args[1]) return message.channel.send("Veuillez **poser une question** :x:")
    let rep = ["Non", "peut etre", "J'men fous", "a tu me parler", "Absolument"];
    let reptaille = Math.floor((Math.random() * rep.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#F3F9F3")
        .addField("Question:", question)
        .addField("Réponse:", rep[reptaille]);
    message.channel.send(embed)
}
})

client.on('message', message => {
    if(message.content === prefix + "help") {
      var help_embed = new Discord.RichEmbed()
      .setColor('#F3F9F3')
      .setTitle("Administration")
      .setAuthor("Help")
      .setDescription("Voici les commandes de moderation !")
      .addField(`${prefix}help`, "Affiche les commandes du bot.")
      .addField(`${prefix}ban`, "ban les gens que vous voulez avec cette commande.")
      .addField(`${prefix}kick`, "expulser les gens que vous voulez avec cete commande.")
      .addField(`${prefix}ping`, "Vous donne le ping du bot !")
      .addField(`${prefix}clear`, "supprime des message du channel")
      .addField(`${prefix}mute`, "empeche les gens de parler,")
      .setTitle("Fun")
      .setDescription("Voici les commandes Fun!")
      .addField(`${prefix}8ball`, "poser lui une question pour savoir votre avenir !,")
      .addField(`${prefix}flipcoins`, "jetez une piece *(pille ou face)* !,")
      message.channel.send(help_embed)
  }
  })
  



  client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

if (args[0].toLocaleLowerCase() === prefix + 'flipcoins'){
    if (!args[1]) return message.channel.send("Veuillez **dire pille ou faces** :x:")
    let rep = ["face", "pile"];
    let reptaille = Math.floor((Math.random() * rep.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#F3F9F3")
        .addField("votre paris:", question)
        .addField("Réponse:", rep[reptaille]);
    message.channel.send(embed)
}
})
