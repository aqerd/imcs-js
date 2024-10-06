function toRPN(str) {
    let output = [];
    let operators = [];
    let priorities = {
        '(': 0,
        ')': 1,
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3
    };

    for (let i = 0; i < str.length; i++) {
        let token = str[i];

        if (/\d/.test(token)) {
            output.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop();
        } else if (token in priorities) {
            while (operators.length && priorities[operators[operators.length - 1]] >= priorities[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }

    return output.join(' ');
}

let str = "( 4 + 6 ) * ( 7 + 1 ) - 2";
console.log(toRPN(str));
