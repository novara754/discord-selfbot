const { Client, Collection } = require('discord.js');
const client = new Client({
  fetchAllMembers: true,
  disabledEvents: [
    'channelCreate','channelDelete','channelPinsUpdate','channelUpdate','debug','error','guildBanAdd','guildBanRemove','guildEmojiCreate','guildEmojiDelete','guildEmojiUpdate','guildMemberAdd','guildMemberAvailable','guildMemberRemove','guildMembersChunk','guildMemberSpeaking','guildMemberUpdate','guildUnavailable','guildUpdate','messageDelete','messageDeleteBulk','messageUpdate','presenceUpdate','reconnecting','roleCreate','roleDelete','roleUpdate','typingStart','typingStop','userUpdate','voiceStateUpdate','warn'
  ]
});
client.commands = new Collection();
client.aliases = new Collection();
client.conf = require('./conf');
const fs = require('fs');

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

  if(!msg.content.startsWith(client.conf.prefix)) return;

  let command = msg.content.replace(client.conf.prefix, '');
  let commandName = command.split(' ')[0];
  let params = command.split(' ').slice(1);

  if(client.commands.has(commandName)) {
    client.commands.get(commandName).exec(client, msg, params);
  } else if(client.aliases.has(commandName)) {
    client.commands.get(client.aliases.get(commandName)).exec(client, msg, params);
  }
});

client.login(client.conf.token).catch(console.error);