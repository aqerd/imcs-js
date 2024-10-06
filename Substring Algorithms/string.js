function BruteForce(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
            if (text.charAt(i + j) !== pattern.charAt(j)) {
                break;
            }
        }
        if (j === m) {
            return i;
        }
    }
    return -1;
}

function buildDFA(pattern) {
    const m = pattern.length;
    const R = 256;
    const dfa = Array.from({ length: R }, () => Array(m).fill(0));
    
    dfa[pattern.charCodeAt(0)][0] = 1;
    let X = 0;

    for (let j = 1; j < m; j++) {
        for (let c = 0; c < R; c++) {
            dfa[c][j] = dfa[c][X];
        }
        dfa[pattern.charCodeAt(j)][j] = j + 1;
        X = dfa[pattern.charCodeAt(j)][X];
    }
    return dfa;
}

function DFA(text, pattern) {
    const dfa = buildDFA(pattern);
    const n = text.length;
    const m = pattern.length;

    let i, j;
    for (i = 0, j = 0; i < n && j < m; i++) {
        j = dfa[text.charCodeAt(i)][j];
    }
    if (j === m) return i - m;
    return -1;
}

function hash(text, pattern) {
    const d = 256;
    const q = 101;
    const n = text.length;
    const m = pattern.length;
    let p = 0;
    let t = 0;
    let h = 1;

    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            let j;
            for (j = 0; j < m; j++) {
                if (text.charAt(i + j) != pattern.charAt(j)) {
                    break;
                }
            }
            if (j === m) {
                return i;
            }
        }
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t = t + q;
        }
    }
    return -1;
}


const data = 'anananas';
const pattern = 'ananas';
console.log(BruteForce(data, pattern));
console.log(DFA(data, pattern));
console.log(hash(data, pattern));