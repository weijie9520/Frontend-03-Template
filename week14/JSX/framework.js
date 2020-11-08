export function createElement(type, props, ...children) {
  let ele;
  if (typeof type === "function") {
    ele = new type(props);
  } else {
    ele = new ElementWrapper(type, props);
  }

  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] === "string") {
        ele.appendChild(document.createTextNode(children[i]));
      } else {
        ele.appendChild(children[i]);
      }
    }
  }

  return ele;
}

class Common {
  getDom() {
    let dom = this.root;
    while (dom && !(dom instanceof HTMLElement)) {
      dom = this.root.root;
    }
    return dom;
  }

  appendChild(child) {
    if (!Array.isArray(child)) {
      child = [child];
    }
    child.forEach((e) => {
      e.mountTo(this.root);
    });
  }

  mountTo(parent) {
    let ele = this.root;
    if (this.root instanceof ElementWrapper) {
      this.root.mountTo(parent);
    } else {
      parent.appendChild(ele);
    }

    if (this.mounted) {
      this.mounted();
    }
  }

  setAttribute(props) {
    // TODO 可以过滤设置其他方法
    for (let k in props) {
      if (k === "style") {
        for (let s in props[k]) {
          const styleName = s;
          const styleValue = props[k][s];
          this.root.style[styleName] = styleValue;
        }
      } else {
        this.root.setAttribute(k, props[k]);
      }
    }
  }
}

export class ElementWrapper extends Common {
  constructor(type, props) {
    super();
    this.root = document.createElement(type);
    this.setAttribute(props);
  }
}

export class Component extends Common {
  constructor(props) {
    super();
    this.props = props;
    this.state = {};
  }
  /**
   * 简单的一层浅比较
   * @param {Object} obj
   * @param {Object} obj1
   */
  static diff(obj, obj1) {
    if ((obj && !obj1) || (!obj && obj1)) return false;
    const objKey = Object.keys(obj);
    const objKey1 = Object.keys(obj1);

    if (objKey1.length !== objKey.length) return false;

    for (let k = 0; k < objKey.length; k++) {
      if (obj[k] !== obj1[k]) return false;
    }
    return true;
  }

  setState() {}

  mounted() {}

  unMounted() {}

  updated() {}

  render() {
    throw new Error("需自行改写render 方法");
  }
}

export default createElement;
