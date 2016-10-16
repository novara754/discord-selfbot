module.exports = {
  help: {
    name: 'help',
    desc: 'Displays information about command',
    usage: '<command name>',
    aliases: ['h']
  },

  exec: (client, msg, [ command_name ]) => {
    let command = client.commands.get(command_name);
    let aliases = `Aliases:: ${command.help.aliases.join(', ')}.`;
    msg.editCode('asciidoc', [
      `= ${command.help.name} =\n`,
      `Usage:: ${command.help.name} ${command.help.usage}`,
      `Description:: ${command.help.desc}`,
      `${command.help.aliases.length > 0 ? aliases : ''}`
    ]);
  }
}