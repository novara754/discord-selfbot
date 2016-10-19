module.exports = {
  help: {
    name: '8ball',
    desc: 'Answers a yes-no question',
    usage: '<question>',
    aliases: ['8']
  },
  
  exec: (_, msg, params) => {
    let answers = ['Yes', 'Possibly', 'Maybe', 'Unlikely', 'No', 'Definitely'];
    let question = params.join(' ');
    let answer = answers[Math.floor(Math.random() * answers.length)];
    msg.edit(`\`\`\`apache\nQ: ${question}\nA: ${answer}\n\`\`\``).catch(console.error);
  }
};