/**
 * 不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“abcdef”
 */

const match = (str) => {
  let findA = false;
  let findB = false;
  let findC = false;
  let findD = false;
  let findE = false;
  for (let k of str) {
    if (k === "a") {
      findA = true;
    } else if (findA && k === "b") {
      findB = true;
    } else if (findB && k === "c") {
      findC = true;
    } else if (findC && k === "d") {
      findD = true;
    } else if (findD && k === "e") {
      findE = true;
    } else if (findE && k === "f") {
      return true;
    } else {
      findA = false;
      findB = false;
      findC = false;
      findD = false;
      findE = false;
    }
  }
  return false;
};

console.log(match("abcdef"));
console.log(match("abcde1f"));
