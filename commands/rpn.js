function rpn(input) {
  var ar = input.split(/\s+/), st = [], token, result;
  while(token = ar.shift()) { 
    if (token == +token) { // numeric
      st.push(token);
    } else {
      switch(token) {
        case '+':
        case '-':
        case '*':
        case '/': {
          let n2 = st.pop(), n1 = st.pop();
          result = eval(n1 + token + ' ' + n2);
          break;
        }
        case '^': {
          let n2 = st.pop(), n1 = st.pop();
          result = Math.pow(n1, n2);
          break;
        }
        case 'log': {
          let n1 = st.pop();
          result = Math.log(n1);
          break;
        }
      }

      st.push(result);
    }
  }
  return st.pop();
}

module.exports = {
  help: {
    name: 'rpn',
    desc: 'Evaluates an equation written in rpn format',
    usage: '<equation>',
    aliases: []
  },

  exec: (client, msg, params) => {
    let equation = params.join(' ').replace('e', Math.E).replace('pi', Math.PI);
    msg.edit(`String: ${params.join(' ')}
\`\`\`xl\n${equation} = ${rpn(equation)}\`\`\``);
  }
};