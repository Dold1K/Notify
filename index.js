"use strict";

const Discord = require("discord.js");
const config = require("./config.json");
//const fs = require("fs");
const client = new Discord.Client();

/*let cmds = new Map();
let files = fs.readdirSync("./cmds");
  //подгружаем комнады
  for(let i = 0; i < files.length; i++){
    let currentCommand = require(`./cmds/${files[i]}`); //Подключим нашу команду
    cmds.set(currentCommand.info.name, currentCommand); //Добавляем нашу команду в список, т.е. название команды - команда
    console.log(`Подключена команда ${currentCommand.info.name} в файле ${files[i]}`); //Отладка
 }
*/
const token = (config.token);
const prefix = (config.prefix);
const commands = ["n.ping!","n.help","n.profile","n.info"].join(", ");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "index.js", type: "WATCHING"} });
});

client.on("message", msg => {
  //обозначаем константы
  const user = msg.author //получаем данные о пользователе
  const member = msg.member //получаем данные о пользователе (сервер)
  const guild = msg.guild //получаем данные о сервере

  //help commands
  if (msg.content === prefix + "help") {
    msg.channel.send(`Вот мои комманды: ${commands}`);
  }
  //ping
  if (msg.content === prefix + "ping!") {
    msg.channel.send("pong!");
  }
  //embedMessage
  if (msg.content === prefix + "profile") {
    const colors = ["0e69f0", "f21d1d", "670ff5", "0fcbf5", "eff213", "21e5ff", "76ff21"]
    let randomColor = Math.floor(Math.random() * colors.length);
    const userInfo = new Discord.RichEmbed() //создаём Embed
      .setAuthor("For Streams", guild.iconURL)
      .setTitle(`Профиль ${user.username}`) //выводим имя пользователя
      .setThumbnail(user.avatarURL) //выводим аватарку пользователя
      .addField("Ник на сервере: ", member.nickname)
      .addField("На сервере с ", member.joinedAt.toLocaleDateString())
      .setColor(colors[randomColor]) //случайный выбор цвета
      .setFooter(`ID: "${user.id}"`); //надпись вконце Embed'a
    msg.channel.send(userInfo); //отправка сообщения
  }
  if (msg.content === prefix + "info") {
    const serverInfo = new Discord.RichEmbed()
      .setTitle(`Сервер ${guild.name}`) //название сервера
      .setDescription("Сервер находится во власти Notify!") //описание
      .setThumbnail(guild.iconURL)//получаем иконку сервера
      .addField("Дата создания: ", "2020.02.15", true) //отображаю какуе-то поебень
      .addBlankField(true) //та самая поебень
      .setColor("21e5ff") //цвет
    msg.channel.send(serverInfo) //отправка
  }
});
client.login(token); //авторизируем бота