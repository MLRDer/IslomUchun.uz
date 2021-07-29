// converter base lowercase arrays
const lotin = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "x",
    "y",
    "z",
];

const kiril = [
    "а",
    "б",
    "с",
    "д",
    "е",
    "ф",
    "г",
    "ҳ",
    "и",
    "ж",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "қ",
    "р",
    "с",
    "т",
    "у",
    "в",
    "х",
    "й",
    "з",
];

// Capital arrays
const Clotin = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "X",
    "Y",
    "Z",
];

const Ckiril = [
    "А",
    "Б",
    "С",
    "Д",
    "E",
    "Ф",
    "Г",
    "Ҳ",
    "И",
    "Ж",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Қ",
    "Р",
    "С",
    "Т",
    "У",
    "В",
    "Х",
    "Й",
    "З",
];

// Arrays to detect the base alphabet
const Lcheck = [
    "b",
    "d",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "q",
    "r",
    "s",
    "t",
    "v",
    "z",
    "D",
    "G",
    "I",
    "J",
    "L",
    "N",
    "Q",
    "R",
    "S",
    "U",
    "V",
    "Y",
    "Z",
]; //30

const Kcheck = [
    "б",
    "д",
    "ф",
    "г",
    "ҳ",
    "и",
    "ж",
    "к",
    "л",
    "м",
    "н",
    "п",
    "қ",
    "т",
    "в",
    "й",
    "з",
    "ш",
    "ч",
    "я",
    "ю",
    "ё",
    "Б",
    "Д",
    "Ф",
    "Ш",
    "Ч",
    "Я",
    "Ю",
    "Ё",
    "Г",
    "Ҳ",
    "И",
    "Ж",
    "Л",
    "П",
    "Қ",
    "У",
    "Й",
    "З",
]; //40

// Exception Arrays
const lotinEx = [
    "sh",
    "ch",
    "ya",
    "yu",
    "yo",
    "o'",
    "oʼ",
    "о‘",
    "g'",
    "gʼ",
    "g‘",
    " ye",
    " e",
    " '",
    "' ",
    "'",
    "ʼ",
];

const kirilEx = [
    "ш",
    "ч",
    "я",
    "ю",
    "ё",
    "ў",
    "ў",
    "ў",
    "ғ",
    "ғ",
    "ғ",
    " е",
    " э",
    " '",
    "' ",
    "ъ",
    "ъ",
];

const ClotinEx = [
    "Sh",
    "Ch",
    "Ya",
    "Yu",
    "Yo",
    "O'",
    "Oʼ",
    "O‘",
    "G'",
    "G‘",
    "Gʼ",
    " Ye",
    " E",
];

const CkirilEx = [
    "Ш",
    "Ч",
    "Я",
    "Ю",
    "Ё",
    "Ў",
    "Ў",
    "Ў",
    "Ғ",
    "Ғ",
    "Ғ",
    " Е",
    " Э",
];

/*
 *      Converts Lotin to Kiril
 */
exports.ltok = (text) => {
    // exceptions are first. This one is first because it has ' and ʼ
    text = text.replace(/‘/g, "'");
    for (let i = 0; i < 17; i++) {
        text = text.replace(new RegExp(lotinEx[i], "g"), kirilEx[i]);
    }

    if (text[0] == "ъ") text[0] = "'";
    if (text[text.length - 1] == "ъ") text[text.length - 1] = "'";

    // second exception
    for (let i = 0; i < 13; i++) {
        text = text.replace(new RegExp(ClotinEx[i], "g"), CkirilEx[i]);
    }

    // Capitals and lowercases
    for (let i = 0; i < 25; i++) {
        text = text
            .replace(new RegExp(Clotin[i], "g"), Ckiril[i])
            .replace(new RegExp(lotin[i], "g"), kiril[i]);
    }

    return text;
};

/*
 *      Converts Kiril to Lotin
 */
exports.ktol = (text) => {
    text = text.replace(/‘/g, "'");

    // exceptions are first. This one is first because it has ' and ʼ
    for (let i = 0; i < 13; i++) {
        text = text.replace(new RegExp(kirilEx[i], "g"), lotinEx[i]);
    }

    // second exception
    for (let i = 0; i < 11; i++) {
        text = text.replace(new RegExp(CkirilEx[i], "g"), ClotinEx[i]);
    }

    // Capitals and lowercase
    for (let i = 0; i < 25; i++) {
        text = text
            .replace(new RegExp(Ckiril[i], "g"), Clotin[i])
            .replace(new RegExp(kiril[i], "g"), lotin[i]);
    }

    return text;
};

/*
 *      This function checks unique letters from both alphabets
 *      and decides in which alphabet the input string is.
 *      Returns strings of "lotin", "kiril" and "both" accordingly
 */
exports.detect = (text) => {
    let k = 0,
        l = 0;

    // find lotin and kiril chars from input string
    for (let i = 0; i < 30; i++) {
        if (text.indexOf(Lcheck[i]) != -1) l++;
    }

    for (let i = 0; i < 40; i++) {
        if (text.indexOf(Kcheck[i]) != -1) k++;
    }

    if (k > 0 && l > 0) {
        return "both";
    }

    if (l > 0) return "lotin";
    if (k > 0) return "kiril";
};
