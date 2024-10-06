const NUMBERS = '0123456789'; // числа
const ENGLISH_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //английский
const ENGLISH_LOWER = ENGLISH_UPPER.toLowerCase();
const RUSSIAN_UPPER = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'; // русский
const RUSSIAN_LOWER = RUSSIAN_UPPER.toLowerCase();
const GREEK_UPPER = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'; // греческий
const GREEK_LOWER = GREEK_UPPER.toLowerCase();
const HINDI_CONSONANTS = 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहकखगजयडढफ़'; // хинди
const HINDI_VOWELS = 'अकआाकाइिकिईीकीउुकुऊूकूऋृकृॠॄकॄऌॢकॢॡॣकॣएेकेऐैकैऒॊकॊओोकोऔ';
const KOREAN_JAEUM = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'; // корейский
const KOREAN_MOEUM = 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ';
const JAPANESE = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'; // японский
const HEBREW = 'אבגדהוזחטיכלמנסעפצקרשתךםןףץ'; // иврит
const GEORGIAN = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ'; // грузинский
const eng_freq = { a: 0.062314619351735566, b: 0.011140450816585814, c: 0.016387588575815067, d: 0.03761420419625267, e: 0.09503392420315168, f: 0.016545488554680764, g: 0.01603777939186645, h: 0.055175111076562054, i: 0.05235720376142042, j: 0.0010057014038522736, k: 0.006855288313215257, l: 0.02938397145168382, m: 0.019098609751416848, n: 0.05381717125831708, o: 0.05473299113573811, p: 0.011244907725681581, q: 0.0005344306976992759, r: 0.04240221740154936, s: 0.04765664285211088, t: 0.06962174452755111, u: 0.02118531870288811, v: 0.00657592681214518, w: 0.020211197294808976, x: 0.0011587429218297936, y: 0.013494375116906715, z: 0.0007384860550026357 };
const rus_freq = { 'а': 0.06339116389154713, 'б': 0.013302302618151803, 'в': 0.034196202322509084, 'г': 0.015122938259718534, 'д': 0.02292186751862912, 'е': 0.06156340120654366, 'ё': 0.000040170608461614714, 'ж': 0.0078047604762679175, 'з': 0.013031474967555754, 'и': 0.04907876484449763, 'й': 0.008683978471145517, 'к': 0.02586468854496225, 'л': 0.0376793828239549, 'м': 0.02263354621596108, 'н': 0.04896473214950982, 'о': 0.0849958242004591, 'п': 0.018975429193795326, 'р': 0.03318804963273049, 'с': 0.039555091073896424, 'т': 0.04334408653008228, 'у': 0.02085243326981626, 'ф': 0.0014429023394196125, 'х': 0.00646941170143908, 'ц': 0.002649964332387164, 'ч': 0.01066983193783663, 'ш': 0.007299388305299216, 'щ': 0.002161437900450753, 'ъ': 0.0003375626936855043, 'ы': 0.014267045134270259, 'ь': 0.015025751303763013, 'э': 0.0023324869429324673, 'ю': 0.004911828753991954, 'я': 0.017042056683320192 };

function encode(str, n) {
    let new_str = '';
    for (let i = 0; i < str.length; i++) {
        let alphabet = 0;
        if (NUMBERS.includes(str[i])) { alphabet = NUMBERS }
        if (ENGLISH_UPPER.includes(str[i])) { alphabet = ENGLISH_UPPER }
        if (ENGLISH_LOWER.includes(str[i])) { alphabet = ENGLISH_LOWER }
        if (RUSSIAN_UPPER.includes(str[i])) { alphabet = RUSSIAN_UPPER }
        if (RUSSIAN_LOWER.includes(str[i])) { alphabet = RUSSIAN_LOWER }
        if (JAPANESE.includes(str[i])) { alphabet = JAPANESE }
        if (HEBREW.includes(str[i])) { alphabet = HEBREW }
        if (GREEK_UPPER.includes(str[i])) { alphabet = GREEK_UPPER }
        if (GREEK_LOWER.includes(str[i])) { alphabet = GREEK_LOWER }
        if (GEORGIAN.includes(str[i])) { alphabet = GEORGIAN }
        if (HINDI_CONSONANTS.includes(str[i])) { alphabet = HINDI_CONSONANTS }
        if (HINDI_VOWELS.includes(str[i])) { alphabet = HINDI_VOWELS }
        if (KOREAN_JAEUM.includes(str[i])) { alphabet = KOREAN_JAEUM }
        if (KOREAN_MOEUM.includes(str[i])) { alphabet = KOREAN_MOEUM }

        if (alphabet != 0) {
            n %= alphabet.length;
            let shifted_alphabet = alphabet.slice(n) + alphabet.slice(0, n);
            k = str[i];
            let j = 0;
            while (j < alphabet.length) {
                if (k == alphabet[j]) {
                    break;
                }
                j++;
            }
            new_str += shifted_alphabet[j];
        } else {
            new_str += str[i];
        }
    }
    return new_str;
}

function decode(str, n) {
    return encode(str, -n);
}

function bruteforce(str){
    for (let i = 0; i < 26; i++) {
        console.log(i, encode(str, i));
    }
}

function frequency_analysis(str){
    if (ENGLISH_LOWER.includes(str[0])) { 
        alphabet = ENGLISH_LOWER;
        frequencies = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 };
        freq = eng_freq;
    }
    if (RUSSIAN_LOWER.includes(str[0])) { 
        alphabet = RUSSIAN_LOWER;
        frequencies = { 'а': 0, 'б': 0, 'в': 0, 'г': 0, 'д': 0, 'е': 0, 'ё': 0, 'ж': 0, 'з': 0, 'и': 0, 'й': 0, 'к': 0, 'л': 0, 'м': 0, 'н': 0, 'о': 0, 'п': 0, 'р': 0, 'с': 0, 'т': 0, 'у': 0, 'ф': 0, 'х': 0, 'ц': 0, 'ч': 0, 'ш': 0, 'щ': 0, 'ъ': 0, 'ы': 0, 'ь': 0, 'э': 0, 'ю': 0, 'я': 0 };
        freq = rus_freq;
    }

    const len_alp = alphabet.length;
    const len_str = str.length;
    let new_str = '';
    let shift = 0;

    let temp_freq = {};
    for (const char of str) {
        if (!alphabet.includes(char)) {
            continue;
        }
        if (temp_freq[char] == undefined) {
            temp_freq[char] = 1;
            continue;
        }
        temp_freq[char]++;
    }
    for (const key in temp_freq) {
        frequencies[key] = temp_freq[key] / len_str;
    }

    let min_sum = Infinity;
    for (let i = 0; i < len_alp; i++) {
        let sum = 0;
        for (const char of alphabet) {
            const index1 = alphabet.indexOf(char);
            const index2 = (index1 + i) % len_alp;
            const newChar = alphabet[index2];
            sum += Math.pow(freq[char] - frequencies[newChar], 2);
        }
        if (sum < min_sum) {
            min_sum = sum;
            shift = i;
        }
    }

    let index1 = 0;
    let index2 = 0;
    for (const char of str) {
        if (alphabet.includes(char)) {
            index1 = alphabet.indexOf(char);
            index2 = index1 - shift;
            if (index2 >= 0) {
                index2 = index2 % len_alp;
            } else {
                index2 = len_alp + index2;
            }
            new_str += alphabet[index2];
        } else {
            new_str += char;
        }
    }
    return new_str;
}

console.log(encode("the quick brown fox jumps over the lazy dog", 3));
console.log(decode("wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj", 3));

// // bruteforce("khoor zruog");

// let ru_text = 'Ефвнлм угк, нсёжг ср кгтлфюего ылчусп, ср кгтлфго «E» жов «D», «F» жов «E», л сфхгоярсм ъгфхл дцне рг хсп йз фгпсп тулрщлтз, лфтсоякцв «DD» жов «A»'.toLowerCase();
let en_text = 'wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj'.toLowerCase();
console.log(frequency_analysis(en_text));
// console.log(frequency_analysis(ru_text));