module.exports = {
  help: {
    name: 'roll',
    desc: 'Rolls an x amount of y-faced dice',
    usage: '<question>',
    aliases: []
  },

  exec: (_, msg, params) => {
    let amount = params[0];
    let faces = params[1].replace('d', '');
    let results = [];

    while(amount--) {
      let face = Math.ceil(Math.random() * faces);
      let padding = new Array(faces.toString().length - face.toString().length + 1).join(' ');
      results.push(`[${padding}${face}]`);
    }

    msg.editCode('xl', results.join(' ')).catch(console.error);
  }
};