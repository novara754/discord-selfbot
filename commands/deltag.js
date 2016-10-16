const fs = require('fs');

module.exports = {
  help: {
    name: 'deltag',
    desc: 'Deletes a tag',
    usage: '<name>',
    aliases: []
  },

  exec: (_, msg, [name]) => {
    let curr_tags = require('../tags.json');
    let tag = curr_tags.find(t => t.name == name);
    
    if(!tag) {
      msg.edit('`Self:` An error occured when trying to delete tag.');
      console.error(new Error(`Tag ${name} not found`));
      return;
    }

    curr_tags.splice(curr_tags.indexOf(tag), 1);

    console.log(curr_tags);

    fs.writeFile('./tags.json', JSON.stringify(curr_tags), error => {
      if(error) {
        msg.edit('`Self:` An error occured when trying to delete tag.');
        console.error(error);
      } else {
        msg.edit(`\`Self:\` Succesfully deleted tag ${name}`);
      }
    });
    delete require.cache[require.resolve('../tags.json')];
  }
}