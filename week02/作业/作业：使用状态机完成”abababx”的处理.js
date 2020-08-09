/**
 * 作业：使用状态机完成”abababx”的处理。
 */
const match = (str) => {
  let state = start;
  for (let k of str) {
    state = state(k);
  }
  return state === end;
};

const start = (s) => {
  if (s === "a") return foundA;
  return start;
};

const end = (s) => {
  return end;
};

const foundA = (s) => { 
  if (s === "b") return foundB;
  return start(s);
};

const foundB = (s) => {
  if (s === "a") return foundA1;
  return start(s);
};

const foundA1 = (s) => {
  if (s === "b") return foundB1;
  return start(s);
};

const foundB1 = (s) => {
  if (s === "a") return foundA2;
  return start(s);
};
const foundA2 = (s) => {
  if (s === "b") return foundB2;
  return start(s);
};

const foundB2 = (s) => {
  if (s === "x") return end;
  return start(s);
};

console.log(match("weijie"));
console.log(match("ababababx"));
