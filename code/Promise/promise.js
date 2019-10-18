class MyPromise {
  constructor(fn) {
    this.status = "";
    this.res_success = null;
    this.res_error = null;
    this.queue = [];

    // fn(resovle, reject)
    // 异步时间到后，传出的res或rej被执行，调用队列
    fn(
      (...arg) => {
        this.status = "success";
        this.res_success = arg;
        // 调用队列
        this.queue.forEach(item => {
          item.fn1(...arg);
        });
      },
      (...arg) => {
        this.status = "error";
        this.res_error = arg;

        this.queue.forEach(item => {
          item.fn2(...arg);
        });
      }
    );
  }
  then(fn1, fn2) {
    // 收到结果后的执行，已有状态立即执行，没有状态放入队列
    if (this.status == "success") {
      fn1(...this.res_success);
    } else if (this.status == "error") {
      fn2(...this.res_error);
    } else {
      this.queue.push({ fn1, fn2 });
    }
  }
}
MyPromise.all = arr => {
  let result = [];
  return new MyPromise((resolve, reject) => {
    let i = 0;
    next();
    function next() {
      arr[i].then(res => {
        result.push(res);
        i++;
        if (i == arr.length) {
          resolve(result);
        } else {
          next();
        }
      }, reject);
    }
  });
};

let p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("okok");
  }, 2000);
});
p.then(res => {
  console.log(res);
});
