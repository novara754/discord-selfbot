module.exports = {
  help: {
    name: 'tags',
    desc: 'Lists all available tags',
    usage: '',
    aliases: ['taglist', 'tagslist']
  },

  exec: (_, msg, __) => {
    let tags = require('../tags.json');

    msg.edit(`Tags:\n\n${tags.map(t => t.name).join(', ')}`);

    delete require.cache[require.resolve('../tags.json')];
  }
}