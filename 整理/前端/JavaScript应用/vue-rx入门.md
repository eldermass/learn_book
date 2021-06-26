# vue-rx 使用

## 基础配置和使用

```js
import Vue from "vue"
import VueRx from "vue-rx"

Vue.use(VueRx)

// 全局使用 `subscriptions` 提供 Rx observables
new Vue({
  el: '#app',
  subscriptions: {
    msg: messageObservable
  }
})

// 也能在组件中提供
import { Observable } from 'rxjs'
Vue.component('foo', {
  subscriptions: function () {
    return {
      msg: new Observable(...)
    }
  }
})
// 就能在模板中直接使用了
<div>{{ msg }}</div>
// 也可以通过 $observables 获得暴露的Ob
vm.$observables.msg.subscribe(msg => console.log(msg))
```

## v-stream 的使用

```html
<div>
  <p>you've inputed debounce: {{ value }}</p>
  <input type="text" v-stream:input="$valueChange" />
</div>
```

```js
export default {
  subscriptions() {
    this.$valueChange = new Subject()

    // 获得一个新的 Ob 对象
    this.$valueChangeText = this.$valueChange.pipe(
      map((res) => {
        return res.event.target.value
      }),
      startWith(""),
      debounceTime(500)
    )
    return {
      value: this.$valueChangeText,
    }
  },
  methods: {
    munalCall() {
      // 我这里也可以手动的调用
      this.$valueChangeText.next("newValue")
    },
  },
}
```

## 组件间的数据交互

为了方便组件间传值，之前在 Vue 中嘱咐谨慎使用的 provide/inject 可以重新启用：

```js
provide() {
    this.$valueChange = new Subject();
    this.$valueChangeText = this.$valueChange.pipe(
      map(res => res.event.target.value),
      startWith(""),
      debounceTime(500)
    );
    return {
      $valueChange: this.$valueChange,
      $valueChangeText: this.$valueChangeText
    };
},
```

在子组件或者孙组件中，如果你需要，直接 inject 就可以使用了：

```js
export default {
  inject: ["$valueChange", "$valueChangeText"],
  subscriptions() {
    return {
      test: this.$valueChangeText,
    }
  },
}
```

## 取消订阅

通过 mixin 来取消订阅，如果没有取消订阅的事件流是会造成内存泄漏的。

```js
  beforeCreate(...data) {
    this.$subscriptions = [];
  },
  beforeDestroy() {
    this.$subscriptions.forEach(el => {
      if (el.unsubscribe) {
        el.unsubscribe();
      }
    });
  }
```
