module.exports = {
  help: {
    name: 'list',
    desc: 'Lists all commands',
    usage: '',
    alias: 'l'
  },

  exec: (client, msg, _) => {
    let list = '';

    client.commands.forEach(command => {
      list += `${command.help.name}${command.help.usage ? ' ' + command.help.usage : ''}: ${command.help.desc}. Aliases: ${command.help.alias.replace(/ /g, ', ')}.\n`;
    });

    msg.editCode('asciidoc', `= Commands =\n\n${list}`);
  }
}