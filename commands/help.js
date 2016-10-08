module.exports = {
  help: {
    name: 'help',
    desc: 'Displays information about command',
    usage: '<command name>',
    aliases: ['h']
  },

  exec: (client, msg, [ command_name ]) => {
    let command = client.commands.get(command_name);
    let aliases = `\nAliases: ${command.help.alias.replace(/ /g, ', ')}.`;
    msg.editCode('asciidoc', [
      `= ${command.help.name} =\n`,
      `Usage:: ${command.help.name} ${command.help.usage}`,
      `Description:: ${command.help.desc}`,
      `${command.help.alias ? `Aliases:: ${command.help.alias.join(', ')}` : ''}`
    ]);
  }
}