// 借鉴至阮一峰KMP算法： http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

/** 最大匹配字符集 */
const matchMaximum = (str) => {
  const tree = {};
  let num = 0;
  for (let i = 1; i < str.length; i++) {
    const s = str.slice(0, i);
    tree[s] = true;
  }
  for (let j = 1; j < str.length; j++) {
    const s = str.slice(j, str.length);
    if (tree[s]) {
      num = Math.max(num, s.length);
    }
  }
  return num;
};

/**
 * 部分匹配表规则： 有一个字符串"BBC ABCDAB ABCDABCDABDE"，我想知道，里面是否包含另一个字符串"ABCDABD"？
 * －　"A"的前缀和后缀都为空集，共有元素的长度为0；
 * －　"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；
 * －　"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；
 * －　"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；
 * －　"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；
 * －　"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；
 * －　"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。
 */
const getPartialMatchTable = (pattern) => {
  const partialMatchTable = [];
  for (let k = 0; k < pattern.length; k++) {
    const s = pattern.slice(0, k + 1);
    partialMatchTable.push({
      num: matchMaximum(s),
      pattern: pattern[k],
    });
  }
  return partialMatchTable;
};

/** 结束状态函数 */
const end = (s) => {
  return end;
};

/** 状态转移函数 */
const getState = (partialMatchTable) => {
  const handle = (j) => {
    return (s) => {
      const len = partialMatchTable.length;
      // 已匹配的索引
      const matchNum = j - 1;
      // 下一匹配的索引
      const next = j + 1;
      // 超过最大长度，表示已匹配成功
      if (j >= len) return end;
      // 匹配当前状态 返回下一状态匹配函数
      if (s === partialMatchTable[j].pattern) {
        return next >= len ? end : handle(j + 1);
      }
      // j 为零表示当前状态未匹配
      return j > 0
        ? /** j不等于零，表示当前已有匹配成功的字符，需做回退操作 */
          handle(partialMatchTable[matchNum].num)(s)
        : handle(0);
    };
  };

  return handle;
};
/** 判断当前字符串是否存在 */
const match = (str, pattern) => {
  const partialMatchTable = getPartialMatchTable(pattern);
  const handleState = getState(partialMatchTable);
  let state = handleState(0);
  for (let k of str) {
    state = state(k);
  }
  return state === end;
};

/** 判断当前字符串匹配位置 （非重复匹配） */
const matchIndex = (str, pattern) => {
  const partialMatchTable = getPartialMatchTable(pattern);
  const handleState = getState(partialMatchTable);
  let state = handleState(0);
  let index = -1;
  for (let i = 0; i < str.length; i++) {
    const k = str[i];
    state = state(k);
    if (state === end) {
      index = i - pattern.length + 1;
      break;
    }
  }
  return index;
};

/** 判断 字符串 BBC ABCDAB ABCDABCDABDE 是否存在 ABCDABD*/
// console.log(match("BBC ABCDAB ABCDABCDABDE", "ABCDABD"));
// console.log("BBC ABCDAB ABCDABCDABDE".match("ABCDABD"));
// console.log(match("dsfewrwe234dsf23dsf234", "f23dsf2"));
// console.log("dsfewrwe234dsf23dsf234".match("f23dsf2"));
// console.log(matchIndex("BBC ABCDAB ABCDABCDABDE", "ABCDABD"));
// console.log("BBC ABCDAB ABCDABCDABDE".indexOf("ABCDABD"));
// console.log(matchIndex("dsfewrwe234dsf23dsf234", "f23dsf2"));
// console.log("dsfewrwe234dsf23dsf234".indexOf("f23dsf2"));

// console.log(match("ababababx", "ababx"));
// console.log(matchIndex("ababababx", "ababx"));
