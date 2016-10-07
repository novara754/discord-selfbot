module.exports = {
  help: {
  name: 'restart',
  desc: 'Restarts the bot',
  usage: '',
  alias: 'rs'
  },

  exec: (_, msg, __) => {
    msg.edit('`SELF:` Restarting...').then(_ => {
      process.exit();
    }).catch(console.error);
  }
}