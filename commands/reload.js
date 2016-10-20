module.exports = {
  help: {
    name: 'reload',
    desc: 'Reloads a specified command',
    usage: '<command name>',
    aliases: ['rl']
  },

  exec: (client, msg, [ command_name ]) => {
    msg.edit(`\`SELF:\` Reloading ${command_name}.js`).then(msg => {
      msg.delete(1000);
    });
    client.commands.delete(command_name);
    delete require.cache[require.resolve(`./${command}`)];
    let command = require(`./${command}`);
    client.commands.set(command_name, command);
    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, command_name);
    });    
  }
};