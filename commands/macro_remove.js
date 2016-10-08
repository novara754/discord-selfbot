module.exports = {
  help: {
    name: 'mdel',
    desc: 'Removes a macro',
    usage: '<macro_name>',
    aliases: ['mrem']
  },

  exec: (client, msg, [name]) => {
    let current_macros = require('../macros.json');
    if(current_macros.hasOwnProperty(name)) {
      delete current_macros[name];
      require('fs').writeFile('./macros.json', JSON.stringify(current_macros), (error) => {
      if(error) msg.edit(`\`SELF:\` ERROR when trying to delete macro '${name}': ${error}`).then(msg => msg.delete(3000));
        msg.edit(`\`SELF:\` Macro '${name}' removed!`).then(msg => msg.delete(3000));
      });
    }
  }
}