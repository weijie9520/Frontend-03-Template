// 借鉴至阮一峰KMP算法： http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

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
  const partialMatchTable = [0];
  const getMaxLength = (current, orign) => {
    if (current <= 0) return 0;
    const k = partialMatchTable[current - 1];
    if (pattern[k] === pattern[orign]) {
      return k + 1;
    } else {
      return getMaxLength(k, orign);
    }
  };

  for (let i = 1; i < pattern.length; i++) {
    partialMatchTable[i] = getMaxLength(i, i);
  }
  return partialMatchTable;
};

/** 结束状态函数 */
const end = (s) => {
  return end;
};

/** 状态转移函数 */
const getState = (pattern, partialMatchTable) => {
  let k = 0;
  const len = pattern.length;
  const handle = (s) => {
    // 匹配当前状态 返回下一状态匹配函数
    if (s === pattern[k]) {
      k++;
    } else {
      // 当k 为0 返回 
      if (k <= 0) return handle;
      // 　移动位数 = 已匹配的字符数 - 对应的部分匹配值
      k = partialMatchTable[k - 1];
      return handle(s);
    }
    // 超过最大长度，表示已匹配成功
    return k >= len ? end : handle;
  };

  return handle;
};

/** 判断当前字符串匹配位置 （非重复匹配） */
const strStr = (str, pattern) => {
  if (!pattern) return 0;
  const partialMatchTable = getPartialMatchTable(pattern);
  const handleState = getState(pattern, partialMatchTable);
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

strStr("BBC ABCDAB ABCDABCDABDE", "ABCDABD");
