function fibonacci(n) {
    let n1 = 0, n2 = 1, nextTerm = 0;
    for (let i = 3; i <= n; i++) {
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
    }
    return n2;
}

let q = 9;
console.log(fibonacci(q));
