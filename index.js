"use strict";

const Discord = require("discord.js");
const client = new Discord.Client();
const botconfig = require("./botconfig.json");

const token = (botconfig.token)
const prefix = (botconfig.prefix)
const commands = ["n!ping", " n!help", " n!e"]

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "VSCode"} });
});
//ping => pong
client.on("message", msg => {
  if (msg.content === prefix + "ping") {
    msg.channel.send("pong!");
  }
  //pin text
  if (msg.content === "test" + pinText) {
    msg.channel.pin(pinText);
    var pinText = msg.content.slice(4);
  }
  //help commands
  if (msg.content === prefix + "help") {
    msg.channel.send(`Вот мои комманды: ${commands}`);
  }
  //embedMessage
  if (msg.content === prefix + "e") {
    let user = new Discord.User(client)
    user = msg.author
    const embed = new Discord.RichEmbed()
      .setTitle(`Профиль, ${user.tag}`)
      .setColor("0e69f0")
      .setDescription("Прив")
      
    msg.channel.send(embed);
  }
  
});
/*client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.id === "log");
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});*/
client.login(token);

function newFunction(msg) {
  return msg.author;
}
