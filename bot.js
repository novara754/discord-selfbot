const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const { prefix, token } = require('./conf');
const macros = require('./macros');

/* Credits to https://github.com/eslachance for this easy but amazing command handler! */
fs.readdir('./commands/', (error, files) => {
  if(error) console.error(error);

  files.forEach(file => {
    if(file.endsWith('.json')) return;

    let command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
  });
});
/* ---------- */

const findByAlias = (commands, al) => {
  let searchedCommand = null;
  
  commands.forEach(command => {
    if(command.help.alias.match(new RegExp(`\\b${al}\\b`))) searchedCommand = command;
  });

  return searchedCommand;
}

client.on('ready', () => {
  console.log('Selfbot ready...');
});

client.on('message', msg => {
  if(msg.author !== client.user) return;

  /*msg.edit(msg.content.replace(/\[\-(\w+)\]/g, (_, m) => {
    if(macros.hasOwnProperty(m)) macros[m];
  }));*/

  let match = /\[\-(\w+)\]/g.exec(msg.content);

  if(match && macros.hasOwnProperty(match[1])) {
    msg.edit(msg.content.replace(`[-${match[1]}]`, macros[match[1]]));
  }

  if(!msg.content.startsWith(prefix)) return;

  let command = msg.content.replace(prefix, '');
  let command_name = command.split(' ')[0];
  let params = command.split(' ').slice(1);

  if(client.commands.has(command_name)) {
    client.commands.get(command_name).exec(client, msg, params);
  } else if(findByAlias(client.commands, command_name)) {
    findByAlias(client.commands, command_name).exec(client, msg, params);
  }
});

client.login(token).catch(console.error);