// 完成 StringToNumber 和 NumberToString 两个函数

/**
 * 0b   2进制
 * 0    8进制
 * 0x  16进制
 */

const stringToNumber = (str) => {
  const one = str.slice(0, 1);
  const two = str.slice(0, 2);
  let num;
  if (two === "0x" || two === "0b") num = Number(str);
  if (one === "0") return parseInt(str.slice(1), 8);
  return Number(str);
};

const numberToString = (num, hex = 10) => {
  const prev = {
    2: "0b",
    8: "0",
    10: "",
    16: "0x",
  };
  return `${prev[hex] || ""}${num.toString(hex)}`;
};
