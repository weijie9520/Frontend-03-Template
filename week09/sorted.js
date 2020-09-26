class QuickSortByHeap {
  constructor(options = {}) {
    let { defaultValue = [], compare } = options;
    this.compare = compare || ((a, b) => a - b);
    this.store = defaultValue || [];
    this.buildHeap();
  }

  buildHeap() {
    const { store } = this;
    // 1 至 Math.floor(store.length / 2) -- 为有子节点的节点
    for (let i = Math.floor(store.length / 2); i > 0; i--) {
      this.sink(i);
    }
  }

  // 上浮
  heapUp(obj) {
    const { compare, store } = this;
    store.push(obj);
    let index = store.length - 1;
    let parentIndex = Math.floor(store.length / 2);
    while (true) {
      if (compare(store[parentIndex], store[index]) <= 0) return;
      this.swap(store, parentIndex, index);
      if (parentIndex <= 0) return;
      index = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
    }
  }

  // 下沉
  sink(index = 0) {
    const { compare, store } = this;
    const len = store.length;
    while (true) {
      let c = index;
      if (
        index * 2 <= len &&
        store[index * 2] !== undefined &&
        compare(store[index], store[index * 2]) > 0
      ) {
        c = index * 2;
      }

      if (
        index * 2 + 1 <= len &&
        store[index * 2 + 1] !== undefined &&
        compare(store[c], store[index * 2 + 1]) > 0
      ) {
        c = index * 2 + 1;
      }
      // 如果 c === index 即表示 左右节点均不需要修改 直接返回就好
      if (c === index) break;
      this.swap(store, c, index);
      index = c;
    }
  }
  // 插入
  insert(obj) {
    this.heapUp(obj);
  }
  pop() {
    return this.del(0);
  }
  // 交换
  swap(arr, i, j) {
    if (this.compare(arr[i], arr[j]) === 0) return;
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  // 删除
  del(index) {
    const { store, compare } = this;
    let r = store[index];
    if (r === undefined) return r;
    store[index] = store[store.length - 1];
    store.pop();
    this.sink(index);
    return r;
  }
  getSerialization() {
    const { store } = this;
    const heap = new QuickSortByHeap({
      defaultValue: [...store],
      compare: this.compare,
    });
    const arr = new Array(heap.store.length);
    while (heap.store.length >= 1) {
      arr.push(heap.pop());
    }
    return arr;
  }
}

class Sorted {
  constructor({ compare }) {
    this.head = new QuickSortByHeap({ compare });
  }

  insert(obj) {
    this.head.insert(obj);
  }

  pop() {
    return this.head.pop();
  }
}
