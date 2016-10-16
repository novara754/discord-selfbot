module.exports = {
  help: {
    name: 'tag',
    desc: 'Displays the content of a tag',
    usage: '<name>',
    aliases: ['t']
  },

  exec: (_, msg, [name]) => {
    let tags = require('../tags.json');
    let tag;

    if(tag = tags.find(t => t.name == name)) {
      msg.edit(tag.content);
    }

    delete require.cache[require.resolve('../tags.json')];
  }
}