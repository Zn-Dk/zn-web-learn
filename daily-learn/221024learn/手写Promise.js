class _Promise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";

  static resolveCallBacks = [];
  static rejectCallBacks = [];

  // 接收函数
  constructor(func) {
    // 默认状态
    this.status = _Promise.PENDING;
    this.result = null;
    // 传入参数并 bind this
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject("Error: 未传入正确函数").bind(this);
    }
  }

  resolve(result) {
    // 状态完成后 可以执行
    if (this.status === _Promise.PENDING) {
      // 改变状态为 fulfilled
      this.status = _Promise.FULFILLED;
      // 将执行结果传入 result
      this.result = result;
      // 异步 resolve 执行之前的结果
      _Promise.resolveCallBacks.forEach((func) => func(result));
    }
  }
  reject(err) {
    if (this.status === _Promise.PENDING) {
      this.status = _Promise.REJECTED;
      this.result = err;
      _Promise.rejectCallBacks.forEach((func) => func(result));
    }
  }

  // then 方法可以传入两个参数 其中第二个为可选
  then(onFulfilled, onRejected = () => {}) {
    return new _Promise((resolve, reject) => {
      // 判断是否为函数以防止外部报错
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {};
      onRejected = typeof onRejected === "function" ? onRejected : () => {};

      // 如果执行到 then 的时候还是 pending 状态则代表 resolve可能处于异步的状态
      // 需要将传入的函数放入内部 callback列表
      // 这个函数列表等到 resolve 执行的时候 forEach 调用
      if (this.status === _Promise.PENDING) {
        _Promise.resolveCallBacks.push(onFulfilled);
        _Promise.rejectCallBacks.push(onRejected);
      }
      if (this.status === _Promise.FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.result);
        });
      }
      if (this.status === _Promise.REJECTED) {
        setTimeout(() => {
          onRejected(this.result);
        });
      }
    });
  }
}

console.log(1);
let p = new _Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    console.log(4);
    if (Math.random() > 0.4) {
      resolve(3);
    } else {
      reject("出错啦");
    }
  }, 500);
});

let p1 = p.then(
  (res) => {
    console.log("Promise 状态:" + p.status);
    console.log(res);
  },
  (rej) => {
    console.log("Promise 状态:" + p.status);
    console.log(rej);
  }
);

//链式调用测试
