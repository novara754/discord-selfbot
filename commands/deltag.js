const fs = require('fs');

module.exports = {
  help: {
    name: 'deltag',
    desc: 'Deletes a tag',
    usage: '<name>',
    aliases: []
  },

  exec: (_, msg, [name]) => {
    let currTags = require('../tags.json');
    let tag = currTags.find(t => t.name == name);
    
    if(!tag) {
      msg.edit('`Self:` An error occured when trying to delete tag.');
      console.error(new Error(`Tag ${name} not found`));
      return;
    }

    currTags.splice(currTags.indexOf(tag), 1);

    fs.writeFile('./tags.json', JSON.stringify(currTags), error => {
      if(error) {
        msg.edit('`Self:` An error occured when trying to delete tag.');
        console.error(error);
      } else {
        msg.edit(`\`Self:\` Succesfully deleted tag ${name}`).then(m => {
          m.delete(500);
        });
      }
    });
    delete require.cache[require.resolve('../tags.json')];
  }
};