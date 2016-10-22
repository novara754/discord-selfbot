function rpn(input) {
  var ar = input.split(/\s+/), stack = [], token, result;
  while(token = ar.shift()) { 
    if(token == +token) { // numeric
      stack.push(token);
    } else {
      switch(token) {
        case '+':
        case '-':
        case '*':
        case '/': {
          let number2 = stack.pop(), number1 = stack.pop();
          result = eval(number1 + token + ' ' + number2);
          break;
        }
        case '^': {
          let number2 = stack.pop(), number1 = stack.pop();
          result = Math.pow(number1, number2);
          break;
        }
        case 'log': {
          let number2 = stack.pop(), number1 = stack.pop();
          result = Math.log(number2) / Math.log(number1);
          break;
        }
        case 'ln': {
          let number1 = stack.pop();
          result = Math.log(number1);
          break;
        }
        case 'sin': case 'asin':
        case 'cos': case 'acos':
        case 'tan': case 'atan': {
          let number1 = stack.pop();
          result = Math[token](number1);
          break;
        }
        case 'root': {
          let number2 = stack.pop(), number1 = stack.pop();
          result = Math.pow(number1, 1 / number2);
          break;
        }
        case 'sqrt': {
          let number1 = stack.pop();
          result = Math.sqrt(number1);
          break;
        }
        case 'sum': {
          result = stack.reduce((sum, next) => sum + parseInt(next), 0);
          break;
        }
        case 'prod': {
          result = stack.reduce((sum, next) => sum * parseInt(next), 1);
        }
      }

      stack.push(result);
    }
  }
  return stack.pop();
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
      equation = equation.replace(new RegExp(variable, 'g'), vars[variable]);
    });

    msg.editCode('xl', `${lines.join('\n')} = ${rpn(equation)}`);
  }
};