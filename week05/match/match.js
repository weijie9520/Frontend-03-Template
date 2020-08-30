let name = "";
let data = {};
let attr = [];

const write = (tag) => {
  const steta = (s) => {
    if (/[a-z0-9]/.test(s)) {
      name += s;
    } else {
      if (tag === "class") {
        if (!data[tag]) data[tag] = [];
        data[tag].push(name);
      } else {
        data[tag] = name;
      }
      name = "";
      return state(s);
    }
    return steta;
  };
  return steta;
};

const writeId = write("id");
const writeClass = write("class");
const writeTagName = write("tagName");
const space = (s) => {
  attr.push(data);
  name = "";
  data = {};
  return state;
};

const state = (s) => {
  if (s === "#") {
    return writeId;
  } else if (s === ".") {
    return writeClass;
  } else if (s === " ") {
    return space();
  }
  return writeTagName(s);
};

const setLastAttr = () => {};

/**
 *  解析 选择器
 * @param {String} str
 * @return  {class:{}, id:"", tagName:""}
 */
const parse = (str) => {
  let handle = state;
  for (let s of str) {
    handle = handle(s);
  }
  if (str) {
    handle(" ");
  }

  const temp = attr;
  name = "";
  data = {};
  attr = [];

  return temp;
};

/** 判断当前元素是否匹配 */
const opt = (slector, element) => {
  console.log(slector, element);
  const { class: classNames, id, tagName } = slector;
  if (classNames && classNames.length) {
    for (let className of classNames) {
      // html 没有 classList
      if (!element.classList || !element.classList.contains(className))
        return false;
    }
  }

  if (id && element.id !== id) return false;
  if (tagName && element.tagName !== tagName.toUpperCase()) return false;
  return true;
};

function match(selector, element) {
  let selectors = parse(selector);
  if (!selectors || !selectors) return false;
  let sele = selectors.pop();
  let ele = element;
  // 第一个 没有匹配 即为false
  if (!opt(sele, element)) return false;
  ele = ele.parentNode;
  sele = selectors.pop();
  while (ele && sele) {
    if (opt(sele, ele)) {
      sele = selectors.pop();
    }
    ele = ele.parentNode;
  }

  if (sele === void 0) return true;
  return false;
}
