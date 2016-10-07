module.exports = {
  help: {
    name: 'help',
    desc: 'Displays information about command',
    usage: '<command name>',
    alias: 'h'
  },

  exec: (client, msg, [ command_name ]) => {
    let command = client.commands.get(command_name);
    msg.editCode('ini', `${command_name}${command.help.usage ? ' ' + command.help.usage : ''}: ${command.help.desc}\nAliases: ${command.help.alias.replace(/ /g, ', ')}`);
  }
}