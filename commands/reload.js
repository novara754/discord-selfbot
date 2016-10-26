module.exports = {
  help: {
    name: 'reload',
    desc: 'Reloads a specified command',
    usage: '<command name>',
    aliases: ['rl']
  },

  exec: (client, msg, [ commandName ]) => {
    msg.edit(`\`SELF:\` Reloading ${commandName}.js`).then(msg => {
      msg.delete(1000);
    });
    client.commands.delete(commandName);
    delete require.cache[require.resolve(`./${commandName}`)];
    let command = require(`./${commandName}`);
    client.commands.set(commandName, command);
    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, commandName);
    });    
  }
};