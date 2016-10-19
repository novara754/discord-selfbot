module.exports = {
  help: {
    name: 'restart',
    desc: 'Restarts the bot',
    usage: '',
    aliases: ['rs']
  },

  exec: (_, msg, __) => {
    msg.edit('`SELF:` Restarting...').then(new_msg => {
      new_msg.delete(1000).then(_ => {
        process.exit();
      });
    }).catch(console.error);
  }
};