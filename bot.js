const { Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
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

    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, command.help.name);
    });
  });
});
/* ---------- */

client.on('ready', () => {
  console.log('Selfbot ready...');
});

client.on('message', msg => {
  if(msg.author !== client.user) return;

  if(!msg.content.startsWith(prefix)) return;

  let command = msg.content.replace(prefix, '');
  let command_name = command.split(' ')[0];
  let params = command.split(' ').slice(1);

  if(client.commands.has(command_name)) {
    client.commands.get(command_name).exec(client, msg, params);
  } else if(client.aliases.has(command_name)) {
    client.commands.get(client.aliases.get(command_name)).exec(client, msg, params);
  }
});

client.login(token).catch(console.error);