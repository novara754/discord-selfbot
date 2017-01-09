module.exports = {
  help: {
    name: 'eval',
    desc: 'Runs a JavaScript snippet',
    usage: '<js snippet>',
    aliases: ['e']
  },

  exec: (client, msg, params) => {
    let input = params.join(' ');

    try {
      let output = eval(input);

      if(typeof output != 'string') {
        output = require('util').inspect(output, { depth: 1 });
      }

      output = output.replace(client.token, '[token redacted]').replace(client.user.email, '[email redacted]');

      msg.edit(`${msg.content}\n\`\`\`js\n${output}\n\`\`\``).catch(console.error);

    } catch (error) {
      msg.edit(`${msg.content}\n\`\`\`js\n${error}\n\`\`\``).catch(console.error);
    }
  }
};
