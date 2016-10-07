const now = require('performance-now');

module.exports = {
  help: {
    name: 'eval',
    desc: 'Runs a JavaScript snippet',
    usage: '<js snipped>',
    alias: 'e'
  },

  exec: (client, msg, params) => {
    let time = now();
    let input = params.join(' ');

    try {
      let message = msg;
      let output = eval(input.replace(/\r?\n|\r/g, ' '));

      if(typeof output != 'string') {
        output = require('util').inspect(output);
      }

      output = output.replace(client.token, '[token redacted]');

      msg.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\` ***\`Output\`***\t:stopwatch:=\`${(now() - time).toFixed(3)}ms\` \`\`\`js\n${output}\n\`\`\``).catch(console.error);

    } catch (error) {
      msg.edit(`***\`Input\`*** \`\`\`js\n${input}\n\`\`\` ***\`Error\`***\t:stopwatch:=\`${(now() - time).toFixed(3)}ms\` \`\`\`js\n${error}\n\`\`\``).catch(console.error);
    }
  }
}