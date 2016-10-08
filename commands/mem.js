module.exports = {
  help: {
    name: 'mem',
    desc: 'Gets memory usage of bot',
    usage: '',
    aliases: []
  },

  exec: (_, msg, __) => {
    let mem_usage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(4);
    msg.edit(`\`SELF:\` Memory usage is at ${mem_usage / (16 * 1024) * 100}% (${mem_usage} mb)`)
  }
}