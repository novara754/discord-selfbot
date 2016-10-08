module.exports = {
  help: {
    name: 'list',
    desc: 'Lists all commands',
    usage: '',
    aliases: ['l']
  },

  exec: (client, msg, _) => {
    let list = '';
    let aliases;

    client.commands.forEach(command => {
      list += `${command.help.name}:: ${command.help.desc}\n`;
    });

    msg.editCode('asciidoc', `= Commands =\n${list}`);
  }
}