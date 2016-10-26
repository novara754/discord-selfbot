module.exports = {
  help: {
    name: 'list',
    desc: 'Lists all commands',
    usage: '',
    aliases: ['l']
  },

  exec: (client, msg, _) => {
    let list = '';
    let commandNames = Array.from(client.commands.keys());
    let longest = commandNames.reduce((longest, str) => Math.max(longest, str.length), 0);

    client.commands.forEach(command => {
      list += `${command.help.name}::${' '.repeat(longest - command.help.name.length)} ${command.help.desc}\n`;
    });

    msg.editCode('asciidoc', `= Commands =\n\n${list}`);
  }
};