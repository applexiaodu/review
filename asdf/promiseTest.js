// const fn = () => (new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('success')
// }))
// console.log('start')
// fn().then(res => {
//     console.log(res)
// })
// console.log(fn())
// start
// 1
// 1
// Promise { 'success' }
// success

// Promise.resolve().then(() => {
//     console.log('promise1');
//     const timer2 = setTimeout(() => {
//       console.log('timer2')
//     }, 0)
// });
// const timer1 = setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(() => {
//       console.log('promise2')
//     })
// }, 0)
// console.log('start');
// start promise1 timer1 promise2 timer2

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('asdf')
//         resolve('success')
//     }, 1000)
// })
// const promise2 = promise1.then(() => {
//     console.log('qwer')
//     throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//     console.log('promise1', promise1)
//     console.log('promise2', promise2)
// }, 2000)
// promise1 pending
// promise2.pending
// promise1 resolved
// promise2 rejected

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("success");
//       console.log("timer1");
//     }, 1000);
//     console.log("promise1里的内容");
//   });
//   const promise2 = promise1.then(() => {
//     throw new Error("error!!!");
//   });
//   console.log("promise1", promise1);
//   console.log("promise2", promise2);
//   setTimeout(() => {
//     console.log("timer2");
//     console.log("promise1", promise1);
//     console.log("promise2", promise2);
//   }, 2000);
  
// promise1里的内容 promise1 pending promise2 pending timer1 timer2 promise1 resolved promise2 rejected

// Promise.resolve(1)
// .then(res => {
//     console.log(res);
//     return 2;
// })
// .catch(err => {
//     return 3;
// })
// .then(res => {
//     console.log(res);
// });
// console.log('asdf')

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('timer')
//       resolve('success')
//     }, 1000)
// })
// const start = Date.now();
//     promise.then(res => {
//     console.log(res, Date.now() - start)
// })
// promise.then(res => {
//     console.log(res, Date.now() - start)
// })

// return Promise.reject(new Error('error!!!'));
// throw new Error('error!!!')
// .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传

// Promise.resolve()
// .then(function success (res) {
//     throw new Error('error!!!')
// }, function fail1 (err) {
//     console.log('fail1', err)
// }).catch(function fail2 (err) {
//     console.log('fail2', err)
// })
// fali2

// Promise.resolve('1')
// .catch((err)=>{
//     console.log('err', err) // 捕捉不到，捕捉前面没处理的错误
// })
// .then(res => {
//     return Promise.reject('asdf')
// })

// Promise.resolve('1')
// .then(res => {
//     console.log(res)
// })
// .finally(() => {
//     console.log('finally')
// })
// Promise.resolve('2')
// .finally(() => {
//     console.log('finally2')
//   	return '我是finally2返回的值'
// })
// .then(res => {
//     console.log('finally2后面的then函数', res)
// })
// '1'
// 'finally2'
// 'finally'
// 'finally2后面的then函数' '2'
  
// function promise1 () {
//     let p = new Promise((resolve) => {
//       console.log('promise1');
//       resolve('1')
//     })
//     return p;
//   }
//   function promise2 () {
//     return new Promise((resolve, reject) => {
//       reject('error')
//     })
//   }
//   promise1()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally1'))
  
//   promise2()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally2'))
  
// promise1, 1,error, finalyy1, finally2

// function promise1 () {
//     let p = new Promise((resolve) => {
//       console.log('promise1');
//       resolve('1')
//     })
//     return p;
//   }
//   function promise2 () {
//     return new Promise((resolve, reject) => {
//       reject('error')
//     })
//   }
//   promise1()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .then(() => console.log('finally1'))
  
//   promise2()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .then(() => console.log('finally2'))
  
// function runAsync (x) {
//     const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
//     return p
//   }
//   function runReject (x) {
//     const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
//     return p
//   }
//   Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//     .then(res => console.log(res), 
//     err => console.log(err))
  
// 通俗来说，.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
// .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
// function runAsync(x) {
//     const p = new Promise(r =>
//       setTimeout(() => r(x, console.log(x)), 1000)
//     );
//     return p;
//   }
//   function runReject(x) {
//     const p = new Promise((res, rej) =>
//       setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
//     );
//     return p;
//   }
//   Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
//     .then(res => console.log("result: ", res))
//     .catch(err => console.log(err));
//   0, error: 0, 1, 2, 3
// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
    // new Promise((resolve) => {
    //     console.log(async2);
    //     resolve()
    // }).then(() => {
    //     console.log('async1 end')
    // })
//   }
//   async function async2() {
//     console.log("async2");
//   }
//   async1();
//   console.log('start')
  
// async1 start, async2, start, async1 end
// 紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中

// async1 start, primise, async1 end, start

// async1 start, async2,start, async1 end,timer

// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
//     setTimeout(() => {
//       console.log('timer1')
//     }, 0)
//   }
//   async function async2() {
//     setTimeout(() => {
//       console.log('timer2')
//     }, 0)
//     console.log("async2");
//   }
//   async1();
//   setTimeout(() => {
//     console.log('timer3')
//   }, 0)
//   console.log("start")
  
// async1 start,async2,start,async1 end,timer2,timer3,timer1

// 正常情况下，async中的await命令是一个Promise对象，返回该对象的结果。
// 但如果不是Promise对象的话，就会直接返回对应的值，相当于Promise.resolve()

// async function async1 () {
//     console.log('async1 start');
//     await new Promise(resolve => {
//       console.log('promise1')
//     })
//     console.log('async1 success');
//     return 'async1 end'
//   }
//   console.log('srcipt start')
//   async1().then(res => console.log(res))
//   console.log('srcipt end')
//   在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应...
// srcipt start，async1 start，promise1，srcipt end

// async function async1 () {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1')
//         resolve('promise1 resolve')
//     }).then(res => console.log(res))
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

// srcipt start, async1 start, promise1, srcipt end, promise1 resolve, async1 success, async1 end

// async function async1 () {
//     console.log('async1 start');
//     await new Promise(resolve => {
//       console.log('promise1')
//       resolve('promise resolve')
//     })
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => {
//     console.log('asdf', res)
// })
// new Promise(resolve => {
//     console.log('promise2')
//     setTimeout(() => {
//         console.log('timer')
//     })
// })
  
// srcipt start，async1 start，promise1，promise2，async1 success，asdf async1 end，timer

// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
// }
  
// async function async2() {
//     console.log("async2");
// }

// console.log("script start");

// setTimeout(function() {
//     console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function(resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function() {
//     console.log("promise2");
// });
// console.log('script end')

// script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout

// async function testSometing() {
//     console.log("执行testSometing");
//     return "testSometing";
// }
// async function testAsync() {
//     console.log("执行testAsync");
//     return Promise.resolve("hello async");
// }
// async function test() {
//     console.log("test start...");
//     const v1 = await testSometing();
//     console.log(v1);
//     const v2 = await testAsync();
//     console.log(v2);
//     console.log(v1, v2);
// }
// test();
// var promise = new Promise(resolve => {
//     console.log("promise start...");
//     resolve("promise");
// });
// promise.then(val => console.log(val));

// console.log("test end...");

// test start...，执行testSometing, promise start..., test end..., testSometing, 执行testAsync, promise, hello async, testSometing hello async

// async function async1 () {
//     await async2();
//     console.log('async1');
//     return 'async1 success'
// }
// async function async2 () {
//     return new Promise((resolve, reject) => {
//         console.log('async2')
//         reject('error')
//     })
// }
// async1().then(res => console.log(res))

// async2, error..
// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
// 如果改为throw new Error也是一样的
// async function async1 () {
//     console.log('async1');
//     throw new Error('error!!!')
//     return 'async1 success'
//   }
//   async1().then(res => console.log(res))

// async function async1 () {
//     try {
//         await Promise.reject('error!!!')
//     } catch(e) {
//         console.log(e)
//     }
//     console.log('async1');
//     return Promise.resolve('async1 success')
// }
// async1().then(res => console.log(res))
// console.log('script start')
// script start，error!!!，async1，async1 success
// async function async1 () {
//     // try {
//     //   await Promise.reject('error!!!')
//     // } catch(e) {
//     //   console.log(e)
//     // }
//     await Promise.reject('error!!!')
//       .catch(e => console.log(e))
//     console.log('async1');
//     return Promise.resolve('async1 success')
//   }
//   async1().then(res => console.log(res))
//   console.log('script start')
  
// const first = () => (new Promise((resolve, reject) => {
//     console.log(3);
//     let p = new Promise((resolve, reject) => {
//         console.log(7);
//         setTimeout(() => {
//             console.log(5);
//             resolve(6);
//             console.log(p)
//         }, 0)
//         resolve(1);
//     });
//     resolve(2);
//     p.then((arg) => {
//         console.log(arg);
//     });
// }));
// first().then((arg) => {
//     console.log(arg);
// });
// console.log(4);

// 3,7,4,1,2,5,resolved
// const async1 = async () => {
//     console.log('async1');
//     setTimeout(() => {
//         console.log('timer1')
//     }, 2000)
//     await new Promise(resolve => {
//         console.log('promise1')
//     })
//     console.log('async1 end')
//     return 'async1 success'
// } 
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
// .then(2)
// .then(Promise.resolve(3))
// .catch(4)
// .then(res => console.log(res))
// setTimeout(() => {
//     console.log('timer2')
// }, 1000)

// script start, async1, promise1, script end, 1, timer2, timer1

// const p1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('resolve3');
//         console.log('timer1')
//     }, 0)
//     resolve('resovle1');
//     resolve('resolve2');
// }).then(res => {
//     console.log(res)
//     setTimeout(() => {
//         console.log(p1)
//     }, 1000)
//     return 1
// }).finally(res => {
//     console.log('finally', res)
// })

// resovle1, finally undefined, timer1, resovle1