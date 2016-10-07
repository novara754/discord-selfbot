module.exports = {
  help: {
    name: 'madd',
    desc: 'Adds a macro',
    usage: '<macro_name> <content>',
    alias: ''
  },

  exec: (client, msg, params) => {
    let name = params[0];
    let content = params.slice(1).join(' ');
    let current_macros = require('../macros.json');
    current_macros[name] = content;
    require('fs').writeFile('./macros.json', JSON.stringify(current_macros), (error) => {
      if(error) msg.edit(`\`SELF:\` ERROR when trying to save macro '${name}': ${error}`).then(msg => msg.delete(3000));
      msg.edit(`\`SELF:\` Macro '${name}' added!`).then(msg => msg.delete(3000));
    });
  }
}