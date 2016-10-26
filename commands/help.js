module.exports = {
  help: {
    name: 'help',
    desc: 'Displays information about command',
    usage: '<command name>',
    aliases: ['h']
  },

  exec: (client, msg, [ commandName ]) => {
    let command = client.commands.get(commandName) || client.aliases.get(commandName);
    let aliases = `Aliases\n= ${command.help.aliases.join(', ')}.`;
    let help = [
      `[ ${command.help.name} ]\n`,
      `Usage\n= ${client.conf.prefix}${command.help.name} ${command.help.usage}\n`,
      `Description\n= ${command.help.desc}\n`,
      `${command.help.aliases.length > 0 ? aliases : ''}`
    ];

    msg.edit(`**\`\`\`ini\n${help.join('\n')}\`\`\`**`);
  }
};