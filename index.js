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
    user = msg.author  
    let url = msg.user.avatarUrl();
    const profile = new Discord.RichEmbed()
      .setTitle(`Профиль ${user.tag}`)
      .setColor("0e69f0")
      .setThumbnail(url)
      .setDescription()
      //.setA()
    msg.channel.send(profile);
    if (msg.content === 'what is my avatar') {
      // Send the user's avatar URL
      msg.reply(msg.author.displayAvatarURL());
    }
  }
});
/*client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.id === "log");
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});*/
client.login(token);