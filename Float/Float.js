/*function BINtoDEC(binaryNumber) {
    // Разбиваем число на целую и дробную части
    let parts = binaryNumber.split('.');
    let integerPart = parts[0];
    let fractionPart = parts[1] || '';

    // Преобразуем целую часть в десятичную
    let decimalInteger = parseInt(integerPart, 2);

    // Преобразуем дробную часть в десятичную
    let decimalFraction = 0;
    if (fractionPart !== '') {
        let fractionLength = fractionPart.length;
        for (let i = 0; i < fractionLength; i++) {
            let digit = parseInt(fractionPart[i], 2);
            decimalFraction += digit / Math.pow(2, i + 1);
        }
    }
}*/

function ToFloat(hex) {
    console.log("TO FLOAT");
    console.log('Hex:', hex);

    let binary = '';
    for (let i = 2; i < hex.length; i++) {
        binary += parseInt(hex[i], 16).toString(2).padStart(4, '0');
    }

    let sign = parseInt(binary[0], 2) === 1 ? -1 : 1;
    let exponent = parseInt(binary.substr(1, 8), 2) - 127;
    let mantissa = binary.substr(9);

    let float = 1;
    for (let i = 0; i < mantissa.length; i++) {
        float += parseInt(mantissa[i], 2) * Math.pow(2, -i - 1);
    }
    
    if (exponent > 0) {
        for (let i = 0; i < exponent; i++) {
            float *= 2;
        }
    } else {
        for (let i = 0; i < -exponent; i++) {
            float /= 2;
        }
    }

    console.log("Binary:", binary)
/*  console.log('Sign:', sign);
    console.log('Exponent:', exponent);
    console.log('Mantissa:', mantissa); */
    console.log('Float:', sign*float); 
}

function ToHex(float) {
    console.log("TO HEX");
    console.log('Float:', float);

    let floatView = new Float32Array(1);
    floatView[0] = float;
    let intView = new Uint32Array(floatView.buffer);
    
    let hex = intView[0].toString(16).toUpperCase().padStart(8, '0');
    
    let binary = intView[0].toString(2).padStart(32, '0');
    let sign = binary.charAt(0);
    let exponent = binary.substr(1, 8);
    let mantissa = binary.substr(9);
    
    console.log("Binary:", binary)
/*  console.log('Sign:', sign);
    console.log('Exponent:', exponent);
    console.log('Mantissa:', mantissa); */
    console.log('Hex:', ('0x' + hex).toLowerCase());
}

//работает плохо (мантисса неправильно кодирует)
/*
function floatToHex(floatNum) {
    console.log("TO HEX");
    console.log('Float:', floatNum);
    if (isNaN(floatNum)) {
        console.log("Binary: 01111111110000000000000000000000");
        console.log("Hex: 0x7f800000");
        return;
    }
    if (!isFinite(floatNum)) {
        if (floatNum > 0){
            console.log("Binary: 01111111100000000000000000000000");
            console.log("Hex: 0x7f800000");
            return;
        } else if (floatNum < 0){
            console.log("Binary: 11111111100000000000000000000000");
            console.log("Hex: 0xff800000");
            return;
        }
    }

    let sign = floatNum < 0 ? 1 : 0;
    floatNum = Math.abs(floatNum);
    let exponent = 0;
    while (floatNum >= 2) {
        floatNum /= 2;
        exponent++;
    }
    while (floatNum < 1) {
        floatNum *= 2;
        exponent--;
    }
    
    const mantissa = [1, ...binary.slice(1 + 8)];
    const decimalMantissa = BINtoDEC(mantissa, 1);
    return sign * decimalMantissa * Math.pow(2, decimalExp);
    
    var absNumber = Math.abs(floatNum);
    while (absNumber >= 1) {
        absNumber /= 10;
    }
    var mantissa = absNumber * Math.pow(10, 23);
    var binaryMantissa = mantissa.toString(2);
    binaryMantissa = binaryMantissa.substring(0, 23);
    let biasedExponent = exponent + 127;
    let binaryString = sign.toString() + biasedExponent.toString(2).padStart(8, '0') + binaryMantissa;
    let hex = parseInt(binaryString, 2).toString(16).toLowerCase().padStart(8, '0');
    console.log("Binary:", binaryString);
    console.log("Hex:", "0x" + hex);
}
*/

console.log("----------------------------------------");
let myFloat = -23.23;
//floatToHex(myFloat);
//console.log("----------------------------------------");
ToFloat('0xc1b9d70a');
console.log("----------------------------------------");
ToHex(myFloat);
console.log("----------------------------------------");


/* 01000000111001100110011001100
01000000100011001100110011001101

11000010010001000110010111011101
11000010000000010011001100110011
  */