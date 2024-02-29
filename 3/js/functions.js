// Функция для проверки длины строки.

function testLength(string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
}

// Строка короче 20 символов
testLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
testLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
testLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом.

function testPalindrom(string) {
  const resultReplaceString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = resultReplaceString.length - 1; i >= 0; i--) {
    newString += resultReplaceString[i];
  }

  if (resultReplaceString === newString) {
    return true;
  } else {
    return false;
  }
}


// // Строка является палиндромом
testPalindrom('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
testPalindrom('ДовОд'); // true
// // Это не палиндром
testPalindrom('Кекс'); // false
// Это палиндром
testPalindrom('Лёша на полке клопа нашёл '); // true

