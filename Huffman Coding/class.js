class Node {
    constructor(char, freq, left=null, right=null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildHuffmanTree(text) {
    const freqMap = new Map();
    for (let char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    const priorityQueue = [];
    for (let [char, freq] of freqMap) {
        priorityQueue.push(new Node(char, freq));
    }
    priorityQueue.sort((a, b) => a.freq - b.freq);

    while (priorityQueue.length > 1) {
        const left = priorityQueue.shift();
        const right = priorityQueue.shift();
        const newNode = new Node(null, left.freq + right.freq, left, right);
        priorityQueue.push(newNode);
        priorityQueue.sort((a, b) => a.freq - b.freq);
    }

    return priorityQueue.shift();
}

function buildHuffmanCodeMap(node, prefix='', codeMap=new Map()) {
    if (node.char !== null) {
        codeMap.set(node.char, prefix);
    } else {
        buildHuffmanCodeMap(node.left, prefix + '0', codeMap);
        buildHuffmanCodeMap(node.right, prefix + '1', codeMap);
    }
    return codeMap;
}

function encodeText(text, codeMap) {
    let encodedText = '';
    for (let char of text) {
        encodedText += codeMap.get(char);
    }
    return encodedText;
}

function decodeText(encodedText, root) {
    let decodedText = '';
    let currentNode = root;
    for (let bit of encodedText) {
        if (bit === '0') {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
        if (currentNode.char !== null) {
            decodedText += currentNode.char;
            currentNode = root;
        }
    }
    return decodedText;
}

const text = "Мама мыла раму";
const root = buildHuffmanTree(text);
const codeMap = buildHuffmanCodeMap(root);
const encodedText = encodeText(text, codeMap);
console.log("Encoded:", encodedText);
const decodedText = decodeText(encodedText, root);
console.log("Decoded:", decodedText);
