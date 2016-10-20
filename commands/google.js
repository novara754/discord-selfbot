module.exports = {
  help: {
    name: 'google',
    desc: 'Uses content of last message sent and uses it to search with Google bot',
    usage: '',
    aliases: ['g']
  },

  exec: (_, msg, __) => {
    console.log();
    msg.channel.fetchMessages({ limit: 1, before: msg.id }).then(c => {
      return msg.channel.sendMessage(`ok google, ${c.first().content}`);
    }).then(m => {
      m.delete();
      msg.delete();
    }).catch(console.error);
  }
};