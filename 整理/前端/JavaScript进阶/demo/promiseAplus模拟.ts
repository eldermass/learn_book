type State = "fulfilled" | "rejected" | "pending"

// 实例类型
interface Promise2Interface<T> {
    then<T1 = T, T2 = never>(
        onfulfilled?: ResolvedFN<T1> | undefined | null,
        onrejected?: RejectFN<T2> | undefined | null
    ): Promise2Interface<T1 | T2> | void
}

// 类 类型
interface Promise2Constructor {
    new <T>(
        executor: (
            resolve: (value?: T | PromiseLike<T>) => void,
            reject: (reason?: any) => void
        ) => void
    ): Promise<T>

    all(promises: Promise2Interface<any>[]): Promise2Interface<any[]>
}

interface ResolvedFN<T> {
    (value?: T): T | Promise2Interface<T> | void
}

interface RejectFN<T> {
    (reason?: any): T | Promise2Interface<T> | void
}

class Promise2<T> implements Promise2Interface<T> {
    state: State = "pending"
    resolved_res: any[] | null = null
    reject_res: any[] | null = null
    queue: {
        fn1: (...args: any[]) => void
        fn2: (...args: any[]) => void
    }[] = []

    constructor(executor) {
        executor(
            (...agrs) => {
                this.state = "fulfilled"
                this.resolved_res = agrs
                this.queue.forEach(({ fn1, fn2 }) => {
                    fn1(...agrs)
                })
            },
            (...args) => {
                this.state = "rejected"
                this.reject_res = args
                this.queue.forEach(({ fn1, fn2 }) => {
                    fn2(...args)
                })
            }
        )
    }

    then<T1 = T, T2 = never>(
        onResolve?: ResolvedFN<T1>,
        onReject?: RejectFN<T2>
    ) {
        if (this.state === "fulfilled") {
            onResolve(...this.resolved_res)
        } else if (this.state === "rejected") {
            onReject(...this.reject_res)
        } else {
            this.queue.push({ fn1: onResolve, fn2: onReject })
        }
    }

    static all(promises: Promise2Interface<any>[]): Promise2Interface<any[]> {
        let results = []
        return new Promise2((resolve, reject) => {
            let i = 0
            next()
            function next() {
                promises[i].then(res => {
                    results.push(res)
                    i++
                    if (i === promises.length) {
                        resolve(results)
                    } else {
                        next()
                    }
                }, reject)
            }
        })
    }
}

// let p = new Promise2<number>((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 1000)
// })

// p.then((res) => {
//     console.log(res)
// })


let p1 = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(11)
    }, 1000)
})
let p2 = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(22)
    }, 1000)
})

Promise2.all([p1, p2]).then((res) => {
    console.log(res)
})
