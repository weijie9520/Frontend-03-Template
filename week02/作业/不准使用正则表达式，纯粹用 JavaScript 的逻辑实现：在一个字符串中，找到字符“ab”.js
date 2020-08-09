/**
 * 不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“ab”
 */

const match = (str) => {
    for (let i = 0; i < str.length; i++) {
      const k = str[i];
      const k1 = str[i + 1];
      if (k === "a" && k1 === "b") return true;
    }
    return false;
  };
  
  console.log(match("aaaancvb"));
  console.log(match("aabaancvb"));
  