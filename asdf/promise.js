/**
 * 1.promise函数里有异步操作，then里面判断的状态为pending肯定有异步操作。
 * 2.把then里面函数存到数组（onResolvedCallbacks，onRejectedCallbacks）异步借宿再调用（发布订阅者）
 * 3.在resolve，reject分别获取数组（onResolvedCallbacks，onRejectedCallbacks）中的函数循环执行
 * 
 * 如果then中返回一个结果是Promise或者是普通值，下个then如果在回拿到它的执行结果
 * 如果在失败的函数中返回的是普通值或者是promise的成功值，也会走到外层then的成功中
 * 如果then成功中有失败或者跑出异常，会给下一个then的失败
 * catch找最近的失败，内部其实也是then
 * promise实现链式调动，主要是每次返回的都是新的promise
 * 
 * 每次调用then方法都返回一个新的promise
 * 执行then方法中的成功和失败的范沪指，都走下一个then方法的成功
 * 执行then方法中只要报错就走下一个then中的reject
 * 执行then方法中可能返回一个普通值或者是promise，要判断x的类型是不是promise，如果是promise就是执行拿到它的状态，作为promise 成功或失败
 */
/**
 * excutor是同步的，then是同步的，但是then里面的回调函数是异步的
 */
const PENDING = 'pending';
const RESOVLE = 'resolve';
const REJECT = 'reject';
function resolvePromise(promise2, x, resolve, reject) {
    //不能引用同一个对象，有可能造成死循环
    if (promise2 === x) {
        return reject(new TypeError('不能引用同一个对象'));
    }
    let called;
    // 判断x的类型，x如果是对象或者是函数，说明是一个promise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function' ) {
        // 保存对x的引用，然后调试该引用，然后调用该引用，避免多次访问x.then属性，
        // 边多次访问x.then属性，这些预防的措施对于确保访问器属性的一致性非常重要，
        // 访问器属性的值可能在两次检索之间发生更改。
        try {
            let then = x.then;
            if (typeof then === 'function') { // 肯定是promise
                // 需要重新指向this，因为严格模式下this为undefined，非严格模式下为全局对象
                then.call(x, y=>{
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, rejec)
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        //不是promise对象就是普通值
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认是等待状态
        this.value = undefined;
        this.reason = undefined;
        // 存放成功，失败的回调函数
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOVLE;
                //异步完成以后依次执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECT;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        //默认立即执行executor函数
        try {
            executor(resolve, reject);
        } catch (error) {
            // 如果出现了错误，主动调用reject乡下传递
            reject(error)
        }
    }
    catch(errCallBack) {
        return this.then(null, errCallBack);
    }
    then(onfullfilled, onrejected) {
        // then的默认值
        onfullfilled = typeof onfullfilled === 'function' ? onfullfilled : v=> v;
        onrejected = typeof onrejected === 'function' ? onrejected : err=> {
            throw err;
        };
        let promise2 = new Promise((resolve, reject) => {

            if (this.status === RESOVLE) {
                setTimeout(() => {
                    try {
                        let x = onfullfilled(this.value);
                        // resolve(x)
                        // resolvePromise(promise2, x, resolve, reject) 判断返回值是不是Promise
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.value);
                        // resolve(x)
                        // resolvePromise(promise2, x, resolve, reject) 判断返回值是不是Promise
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) { // 这个时候肯定有异步操作
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfullfilled(this.value);
                            // resolve(x)
                            // resolvePromise(promise2, x, resolve, reject) 判断返回值是不是Promise
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.value);
                            // resolve(x)
                            // resolvePromise(promise2, x, resolve, reject) 判断返回值是不是Promise
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        });
        return promise2
    }
}
module.exports = Promise;