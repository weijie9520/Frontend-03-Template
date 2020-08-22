const { get } = require("lodash");

function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }

  for (let prop in element.computedStyle) {
    const p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }

  return element.style;
}

function layout(element) {
  if (!element.computedStyle) return;
  let elementStyle = getStyle(element);
  if (elementStyle.display !== "flex") return;

  const item = element.children.filter((e) => e.type === "element");

  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  const style = elementStyle;

  ["width", "height"].forEach((size) => {
    if (style[size] === "auto" || style[size] === "") {
      style[size] = null;
    }
  });

  if (get(style, "flexDirection", "auto") === "auto") {
    style.flexDirection = "row";
  }
  if (get(style, "alignItems", "auto") === "auto") {
    style.alignItems = "stretch";
  }
  if (get(style, "justifyContent", "auto") === "auto") {
    style.justifyContent = "flex-start";
  }
  if (get(style, "flexWrap", "auto") === "auto") {
    style.flexWrap = "nowrap";
  }
  if (get(style, "alignContent", "auto") === "auto") {
    style.alignContent = "stretch";
  }

  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;

  if (style.flexDirection === "row") {
    mainSize = "width";
    mainStart = "left";
    mainEnd = "right";
    mainSign = +1;
    mainBase = 0;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }

  if (style.flexDirection === "row-reverse") {
    mainSize = "width";
    mainStart = "right";
    mainEnd = "left";
    mainSign = +1;
    mainBase = style.width;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }

  if (style.flexDirection === "colum") {
    mainSize = "height";
    mainStart = "top";
    mainEnd = "buttom";
    mainSign = +1;
    mainBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }

  if (style.flexDirection === "colum-reverse") {
    mainSize = "height";
    mainStart = "buttom";
    mainEnd = "top";
    mainSign = -1;
    mainBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }

  if (style.flexWrap === "wrap-reverse") {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = +1;
  }

  let isAutoMainSize = false;

  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] > 0) {
        itemStyle[mainSize] = itemStyle[mainSize] + item[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  const flexLine = [];
  const flexLines = [flexLine];
  const mainSpace = elementStyle[mainSize];
  const crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex) {
      flexLine.push(item)
    }else if(style.flexWrap === 'norwap' && isAutoMainSize) {
      mainSpace  -= itemStyle[mainSize]

      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      } 

    }

  }
}

module.exports = layout;
