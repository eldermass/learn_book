function EventEmitter() {
    this.events = new Map()
}

const wrapCallback = (fn, once = false) => ({ callback: fn, once })
EventEmitter.prototype.addListener = function (type, fn, once) {
    let handler = this.events.get(type)

    if (!handler) {
        // 没有该type，绑定一个
        this.events.set(type, wrapCallback(fn, once))
    } else if (handler && typeof handler.callback === 'function') {
        // 该 type，只有一个回调
        this.events.set(type, [handler, wrapCallback(fn, once)])
    } else {
        // 该 type，回调 >= 2
        handler.push(wrapCallback(fn, once))
    }
}

EventEmitter.prototype.removeListener = function (type, listener) {
    let handler = this.events.get(type)

    if (!handler) return

    if (!Array.isArray(handler)) {
        // 不是 array 意味着回调只有一个
        if (handler.callback === listener.callback) this.events.delete(type)
        else return 
    }

    for (let i = 0; i < handler.length; i++) {
        let item = handler[i]
        if (item.callback === listener.callback) {
            handler.splice(i, 1)
            i--
            if (handler.length === 1) {
                this.events.set(type, handler[0])
            }
        }
    }
}

EventEmitter.prototype.once = function (type, fn) {
    this.addListener(type, fn, true);
}

EventEmitter.prototype.emit = function (type, ...args) {
    let hanlder = this.events.get(type)
    if (!hanlder) return

    if (Array.isArray(hanlder)) {
        hanlder.map(item => {
            item.callback.apply(this, args)
            if (item.once) this.removeListener(type, item)
        })
    } else {
        hanlder.callback.apply(this, args)
    }
    return true
}

EventEmitter.prototype.removeAll = function (type) {
    let handler = this.events.get(type)
    if (!handler) return
    else this.events.delete(type)
}


let e = new EventEmitter();
e.addListener('type', () => {
  console.log("type事件触发！");
})
e.addListener('type', () => {
  console.log("WOW!type事件又触发了！");
})

function f() { 
  console.log("type事件我只触发一次"); 
}
e.once('type', f)


e.emit('type');
e.emit('type');
e.removeAll('type');
e.emit('type');