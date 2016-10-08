module.exports = {
  help: {
    name: 'prune',
    desc: 'Clears an x amount of the last messages (max. 100)',
    usage: '<amount>',
    aliases: ['clear', 'p', 'c']
  },

  exec: (client, msg, params) => {
    let limit = parseInt(params[0]) ? parseInt(params[0]) + 1 : 2;

    msg.channel.fetchMessages({ limit }).then(messages => {
      messages.forEach(message => {
        if(message.author !== client.user) return;
        message.delete().catch(console.error);
      });
    }).catch(console.error);
  }
}