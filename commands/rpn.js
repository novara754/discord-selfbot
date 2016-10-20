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
        case 'ln': {
          let n1 = st.pop();
          result = Math.log(n1);
          break;
        }
        case 'log': {
          let n2 = st.pop(), n1 = st.pop();
          result = Math.log(n2) / Math.log(n1);
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
    let vars = {
      'e': Math.E,
      'pi': Math.PI
    };
    let lines = params.join(' ').split('\n');
    let equation = lines[lines.length-1];

    lines.slice(0, lines.length - 1).forEach(line => {
      let variable = line.replace(/ /g, '').split('=')[0];
      let value = parseInt(line.replace(' ', '').split('=')[1]);
      vars[variable] = value;
    });

    Object.keys(vars).forEach(variable => {
      equation = equation.replace(variable, vars[variable]);
    });

    console.log(equation);

    msg.editCode('xl', `${lines.join('\n')} = ${rpn(equation)}`);
  }
};