function BuildTheTree(freq) {
    const nodes = [];
    for (let char in freq) {
        nodes.push({char, freq: freq[char], left: null, right: null});
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const parent = {
            char: null,
            freq: left.freq + right.freq,
            left,
            right
        };
        nodes.push(parent);
    }

    return nodes[0];
}

function MapTheRoots(root, code, codes) {
    if (root.left === null && root.right === null) {
        codes[root.char] = code;
        return;
    }
    MapTheRoots(root.left, code + '0', codes);
    MapTheRoots(root.right, code + '1', codes);
}

function encode(text) {
    const freq = {};
    for (let char of text) {
        freq[char] = (freq[char] || 0) + 1;
    }

    const root = BuildTheTree(freq);
    const codes = {};
    MapTheRoots(root, '', codes);

    let encoded = '';
    for (let char of text) {
        encoded += codes[char];
    }

    return { encoded, codes };
}

function decode(encoded, codes) {
    const reverseCodes = {};
    for (let char in codes) {
        reverseCodes[codes[char]] = char;
    }

    let decoded = '';
    let code = '';
    for (let bit of encoded) {
        code += bit;
        if (reverseCodes[code]) {
            decoded += reverseCodes[code];
            code = '';
        }
    }

    return decoded;
}

const text = "съешь ещё этих мягких французских булок, да выпей чаю";
const { encoded, codes } = encode(text);
console.log("Encoded:", encoded);
console.log("Decoded:", decode(encoded, codes));
console.log(codes);