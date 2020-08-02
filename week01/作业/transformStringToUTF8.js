// 写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码。

/**
 *
 * @param {String} str 二进制字符串
 * @param {Number} len 需要补齐的长度
 * @param {String} position：unshift: 前面补齐； push: 后面补齐
 */
const zeroFill = (str, len = 8, position = "unshift") => {
  const num = len - str.length;
  const zeroList = [];
  for (let i = 0; i < num; i++) {
    zeroList.push("0");
  }
  return position === "unshift"
    ? `${zeroList.join("")}${str}`
    : `${str}${zeroList.join("")}`;
};

const getBinaryStringList = (num) => {
  const binaryStr = num.toString(2);
  if (num <= Math.pow(2, 7)) {
    return [zeroFill(binaryStr)];
  } else if (num <= Math.pow(2, 11)) {
    return [
      `110${binaryStr.slice(0, 5)}`,
      `10${zeroFill(binaryStr.slice(5), 6, "push")}`,
    ];
  } else if (num <= Math.pow(2, 16)) {
    return [
      `1110${binaryStr.slice(0, 4)}`,
      `10${binaryStr.slice(4, 10)}`,
      `10${zeroFill(binaryStr.slice(10), 6, "push")}`,
    ];
  } else {
    throw new Error("当前字符超出 utf8 所表示的范围 ");
  }
};

/**
 * UTF8 编码格式 ( unicode 版本1)
 * 一个字节表示字符： 0xxxxxxx , 可表示 2^7 个字符
 * 两个字节表示字符： [110xxxxx, 10xxxxxx] , 可表示 2^11 个字符
 * 三个字节表示字符： [1110xxxx, 10xxxxxx, 10xxxxxx] , 可表示 2^16 个字符
 */

/**
 *  将字符串转换为 UTF8 格式的 字符串数组 (从前往后补)
 * @param {String} str
 * @return {Array[String]}
 */
const transformStringToUTF8 = (str) => {
  const codeList = [];
  for (let i = 0; i < str.length; i++) {
    const num = str.codePointAt(i);
    codeList.push(getBinaryStringList(num, 1));
  }

  return codeList.reduce((a, b) => {
    return [...a, ...b];
  }, []);
};
const str = "未";
//   const str = "1";

console.log(transformStringToUTF8(str).join(""));
