module.exports = {
  help: {
    name: 'tag',
    desc: 'Displays the content of a tag',
    usage: '<name>',
    aliases: ['t']
  },

  exec: (_, msg, [name]) => {
    let tags = require('../tags.json');
    let tag = tags.find(t => t.name == name);

    if(tag) {
      msg.edit(tag.content);
    }

    delete require.cache[require.resolve('../tags.json')];
  }
};