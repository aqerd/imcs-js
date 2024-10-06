function Entropy(s){
    const n = s.length; //длина строки
    const m = new Set(s.split('')).size; //мощность строки

    //количество символов в строке
    const f = {}; 
    for (let i = 0; i < n; i++){
        const char = s[i];
        if (f[char]){
            f[char] += 1;
        } else {
            f[char] = 1;
        }
    }

    //Энтропия
    let Ei = 0;
    let E2 = 0;
    const p = [];
    for (let i in f){
        p[i] = f[i]/n;
        E2 -= p[i] * (Math.log(p[i]) / Math.log(2));
        Ei -= p[i] * (Math.log(p[i]) / Math.log(m));
    }

    //I(s)
    let Is = n * E2;

    console.log("s =", s);
    console.log("n =", n);
    console.log("m =", m);
    console.log("f =", f);
    console.log("E2 =", E2);
    console.log("Ei =", Ei);
    console.log("I(s) =", Is);
}

k = "мама мыла раму";
let s = String(k).toLowerCase(); //строка
Entropy(s);