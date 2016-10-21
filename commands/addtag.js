const fs = require('fs');

module.exports = {
  help: {
    name: 'addtag',
    desc: 'Adds a tag',
    usage: '<name> <content>',
    aliases: []
  },

  exec: (_, msg, [name, ...content]) => {
    content = content.join(' ');
    let curr_tags = require('../tags.json');
    curr_tags.push({
      name,
      content
    });
    fs.writeFile('./tags.json', JSON.stringify(curr_tags), error => {
      if(error) {
        msg.edit('`Self:` An error occured when trying to create tag.');
        console.error(error);
      } else {
        msg.edit(`\`Self:\` Succesfully created tag ${name}`).then(m => {
          m.delete(500);
        });
      }
    });
    delete require.cache[require.resolve('../tags.json')];
  }
};