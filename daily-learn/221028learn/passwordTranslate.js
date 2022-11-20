/*
  描述
  现在有一种密码变换算法。
  九键手机键盘上的数字与字母的对应： 1--1， abc--2, def--3, ghi--4, jkl--5, mno--6, pqrs--7, tuv--8 wxyz--9, 0--0，
  把密码中出现的小写字母都变成九键键盘对应的数字，如：a 变成 2，x 变成 9.
  而密码中出现的大写字母则变成小写之后往后移一位，如：X ，先变成小写，再往后移一位，变成了 y ，例外：Z 往后移是 a 。
  数字和其它的符号都不做变换。

  数据范围： 输入的字符串长度满足 1≤n≤100

  输入描述：
  输入一组密码，长度不超过100个字符。

  输出描述：
  输出密码变换后的字符串

    示例1
    输入：
    YUANzhi1987
    输出：
    zvbo9441987


*/

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const string = "abcdefghijklmnopqrstuvwxyz";
const translate = "22233344455566677778889999";
void (async function () {
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split("");
    let res = tokens.map((word) => {
      if (word === "Z") return "a";
      // 大写字母 查询 ascii
      if (/[A-Y]/.test(word)) {
        word = word.toLowerCase();
        return String.fromCharCode(word.charCodeAt(0) + 1);
      }
      if (/[a-z]/.test(word)) {
        // 小写字母 寻找下标 然后取值
        return translate[string.indexOf(word)];
      }
      return word;
    });
    console.log(res.join(""));
  }
})();