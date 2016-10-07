module.exports = {
  help: {
    name: 'reload',
    desc: 'Reloads a specified command',
    usage: '<command name>',
    alias: 'rl'
  },

  exec: (client, msg, [ command ]) => {
    msg.edit(`\`SELF:\` Reloading ${command}.js`);
    client.commands.delete(command);
    delete require.cache[require.resolve(`./${command}`)];
    client.commands.set(command, require(`./${command}`));
  }
}