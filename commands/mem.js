module.exports = {
  help: {
    name: 'mem',
    desc: 'Gets memory usage of bot',
    usage: '',
    aliases: []
  },

  exec: (_, msg, __) => {
    let memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0);
    msg.edit(`\`SELF:\` Memory usage is at ${(memUsage / (16 * 1024) * 100).toPrecision(2)}% (${memUsage} mb)`);
  }
};