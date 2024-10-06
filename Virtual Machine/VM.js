const fs = require('fs');
const readsync = require('readline-sync');

let mem = [];

const fulltext = fs.readFileSync('C:\\Users\\21954\\Documents\\VS Code\\JS\\VM\\factorial.sasm', 'utf8');
mem = (fulltext.replace(/\r\n/g, ' ').replace(/\n/g, ' ') + ' exit').split(' ');
let ip = 0;

for (let i = mem.length; i < 200; i++){
    mem[i] = 0;
}
for (let i = 0; i < mem.length; i++){
    switch (mem[i]){
        case 'input':
            mem[i] = '0000';
            break;
        case 'set':
            mem[i] = '0001';
            break;
        case 'add':
            mem[i] = '0010';
            break;
        case 'sub':
            mem[i] = '0011';
            break;
        case 'mul':
            mem[i] = '0100';
            break;
        case 'div':
            mem[i] = '0101';
            break;
        case 'equ':
            mem[i] = '0110';
            break;
        case 'grt':
            mem[i] = '0111';
            break;
        case 'jump':
            mem[i] = '1000';
            break;
        case 'jz':
            mem[i] = '1001';
            break;
        case 'jnz':
            mem[i] = '1010';
            break;
        case 'copy':
            mem[i] = '1011';
            break;
        case 'output':
            mem[i] = '1100';
            break;
        case 'exit':
            mem[i] = '1111';
            break;
        default:
            mem[i] = parseInt(mem[i]);
            break;
    }
}

//console.log(mem);

for (let count = 0; count < mem.length; count++) {
    console.log(`In ${count} is stored ${mem[count]}`);
}

while (mem[ip] !== '1111') {
    switch (mem[ip]) {
        case '0000': //input
            let number = readsync.question('Enter number: ')
            if (isNaN(number)) {
                console.log('ERROR: Not a number');
                break;
            }
            mem[parseInt(mem[ip + 1])] = parseInt(number);
            ip += 2;
            break;

        case '0001': //set
            mem[parseInt(mem[ip + 1])] = parseInt(mem[ip + 2]); 
            ip += 3;
            break;

        case '0010': //add
            mem[parseInt(mem[ip + 3])] = mem[parseInt(mem[ip + 1])] + mem[parseInt(mem[ip + 2])];
            ip += 4;
            break;

        case '0011': //sub
            mem[parseInt(mem[ip + 3])] = mem[parseInt(mem[ip + 1])] - mem[parseInt(mem[ip + 2])]
            ip += 4;
            break;

        case '0100': //mul
            mem[parseInt(mem[ip + 3])] = mem[parseInt(mem[ip + 1])] * mem[parseInt(mem[ip + 2])]
            ip += 4;
            break;

        case '0101': //div
            if (mem[parseInt(mem[ip + 2])] !== 0)
                mem[parseInt(mem[ip + 3])] = mem[parseInt(mem[ip + 1])] / mem[parseInt(mem[ip + 2])]
            else
                mem[parseInt(mem[ip + 3])] = "ERROR: Can't divide by zero";
            ip += 4;
            break;

        case '0110': //equ
            if (mem[parseInt(mem[ip + 1])] == mem[parseInt(mem[ip + 2])])            
                mem[parseInt(mem[ip + 3])] = 0;
            else
                mem[parseInt(mem[ip + 3])] = 1;
            ip += 4;
            break;

        case '0111': //grt
            if (mem[parseInt(mem[ip + 1])] > mem[parseInt(mem[ip + 2])])
                mem[parseInt(mem[ip + 3])] = 0;
            else
                mem[parseInt(mem[ip + 3])] = 1;
            ip += 4;
            break;

        case '1000': //jump
            ip = parseInt(mem[ip + 1]);
            break;

        case '1001': //jz
            if (mem[parseInt(mem[ip + 1])] == 0)
                ip = parseInt(mem[ip + 2]);
            else
                ip += 3;
            break;

        case '1010': //jnz
            if (mem[parseInt(mem[ip + 1])] != 0)
                ip = parseInt(mem[ip + 2]);
            else
                ip += 3;
            break;

        case '1011': //copy
            mem[parseInt(mem[ip + 2])] = mem[parseInt(mem[ip + 1])];
            ip += 3;
            break;

        case '1100': //output
            console.log(mem[parseInt(mem[ip + 1])]);
            ip += 2;
            break;

        case '1111': //exit
            process.exit(1);
            break;

        default:
            console.log("ERROR: Syntax");
            process.exit(1);
    }
}


for (let count = 0; count < mem.length; count++) {
    console.log(`In ${count} is stored ${mem[count]}`);
}

//console.log(mem);