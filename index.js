"use strict";

const Discord = require("discord.js");
const client = new Discord.Client();
const botconfig = require("./botconfig.json");

const token = (botconfig.token)
const prefix = (botconfig.prefix)
const commands = ["n.ping!", " n.help", " n.profile"]

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "VSCode"} });
});
//ping => pong
client.on("message", msg => {
  //ping
  if (msg.content === prefix + "ping!") {
    msg.channel.send("pong!");
  }
  //help commands
  if (msg.content === prefix + "help") {
    msg.channel.send(`Вот мои комманды: ${commands}`);
  }
  //embedMessage
  if (msg.content === prefix + "profile") {
    let user = new Discord.User(client)
    let guildIcon = new Discord.Guild()
    const colors = ["0e69f0", "f21d1d", "670ff5", "0fcbf5", "eff213"]
    var randomColor = Math.floor(Math.random() * colors.length)
    guildIcon = msg.guild.icon
    user = msg.author
    const profile = new Discord.RichEmbed()
      .setTitle(`Профиль ${user.username}`)
      .setColor(colors[randomColor])
      //.setAuthor("For Streams", guildIcon)
      .setThumbnail(user.avatarURL)
      .setFooter(`ID: "${user.id}"`)
      //.setA()
    msg.channel.send(profile);
  }
});
client.login(token);