/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /*!*****************!*\
  !*** ./main.js ***!
  \*****************/
  /*! unknown exports (runtime-defined) */
  /*! runtime requirements:  */
  eval(
    'function createElement(type, props) {\n  var ele = document.createElement(type);\n\n  for (var k in props) {\n    ele.setAttribute(k, props[k]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  if (children.length) {\n    console.log(ele);\n    console.log(children);\n\n    for (var i = 0; i < children.length; i++) {\n      if (typeof children[i] === "string") {\n        ele.appendChild(document.createTextNode(children[i]));\n      } else {\n        ele.appendChild(children[i]);\n      }\n    }\n  }\n\n  return ele;\n}\n\nfor (var _i = 0, _arr = [1, 2, 3, 4, 5]; _i < _arr.length; _i++) {\n  var k = _arr[_i];\n  console.log(k);\n}\n\nvar a = createElement("div", null, createElement("span", null), createElement("span", null), createElement("span", null));\nconsole.log(a);\n\n//# sourceURL=webpack://jsx/./main.js?'
  );
  /******/
})();
