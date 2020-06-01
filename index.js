"use strict";

const Discord = require("discord.js");
const config = require("./config.json");
//const fs = require("fs");
const client = new Discord.Client();
//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./scores.sqlite');

/*let cmds = new Map();
let files = fs.readdirSync("./cmds");
  //подгружаем комнады
  for(let i = 0; i < files.length; i++){
    let currentCommand = require(`./cmds/${files[i]}`); //Подключим нашу команду
    cmds.set(currentCommand.info.name, currentCommand); //Добавляем нашу команду в список, т.е. название команды - команда
    console.log(`Подключена команда ${currentCommand.info.name} в файле ${files[i]}`); //Отладка
 }
*/
const token = config.token;
const prefix = config.prefix;
const commands = ["n.help","n.profile","n.info"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "на @Manshoo", type: "WATCHING"} });
});

client.on("message", msg => {
  //обозначаем константы
  const user = msg.author //получаем данные о пользователе
  const member = msg.member //получаем данные о пользователе (сервер)
  const guild = msg.guild //получаем данные о сервере
  let channel = guild.channels.find(ch => ch.name === "sys_bot-logs")
 /* const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (msg.content !== prefix + command) {
    const err = ["Такой команды нет!", "Проверь, правильно ли ты написал команду!", "Я такого не знаю!"]
    let randomErr = Math.floor(Math.random() * err.length);
    msg.channel.send(err[randomErr]);
    console.log(args)
  }*/
  //help commands
  //if () { Надо оптимизировать логи
    if (msg.content === prefix + "help") {
      msg.reply(`Вот мои комманды: ${commands.join(", ")}`);
      if(!channel) return;
      channel.send(`"${user.username}" использовал команду Help`)
    }
    //embedMessage
    const colors = ["0e69f0", "f21d1d", "670ff5", "0fcbf5", "eff213", "21e5ff", "76ff21"]
    let randomColor = Math.floor(Math.random() * colors.length);
    if (msg.content === prefix + "profile") {
      const userInfo = new Discord.RichEmbed() //создаём Embed
        .setAuthor(guild.name, guild.iconURL)
        .setTitle(`Профиль ${user.username}`) //выводим имя пользователя
        .setThumbnail(user.avatarURL) //выводим аватарку пользователя
        .addField("Ник на сервере: ", member.nickname)
        .addField("На сервере с ", member.joinedAt.toUTCString())
        .setColor(colors[randomColor]) //случайный выбор цвета
        .setFooter(`ID: "${user.id}"`); //надпись в конце Embed'a
      msg.channel.send(userInfo); //отправка сообщения
      if(!channel) return;
      channel.send(`"${user.username}" использовал команду Profile`)
    }
    if (msg.content === prefix + "info") {
      const serverInfo = new Discord.RichEmbed()
        .setTitle(`Сервер ${guild.name}`) //название сервера
        .setDescription("Сервер находится во власти Notify!") //описание
        .setThumbnail(guild.iconURL)//получаем иконку сервера
        .addField("Дата создания: ", guild.createdAt.toUTCString(), true) //отображаю какуе-то поебень
        .addField("Участников: ", guild.memberCount, true)
        .setColor(colors[randomColor]) //цвет
      msg.channel.send(serverInfo) //отправка
      if(!channel) return;
        channel.send(`"${user.username}" использовал команду Info`)    
    }
 //}
});

client.on("guildMemberAdd", member => {
  //let textchannel = new Discord.TextChannel()  
  let channel = member.guild.channels.find(ch => ch.name === "лог");
    //let guild = new Discord.Guild()
  if(!channel) return;
    channel.send(`Добро пожаловать, ${member}!`);
    console.log(`${member} joined the server.`);
	//member.guild.addRole("Участник");
    //member.guild.createChannel("Проверка")
})
client.on("guildMemberRemove", member => {
  let channel = member.guild.channels.find(ch => ch.name === "лог");
  if(!channel) return;
    channel.send(`${member} больше не с нами.`);
    console.log(`${member} has gone.`)
})
client.login(token); //авторизируем бота