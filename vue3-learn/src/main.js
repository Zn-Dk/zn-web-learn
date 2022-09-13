import { createApp } from 'vue'
//import App from './vue3.0/03-setup接收的参数/setup-props-context.vue'
import App from './vue3.0/05-watch/watch.vue'

const app = createApp(App)
app.mount('#app')

/*
  对比 Vue2

  createApp 比 直接 new Vue实例要更轻量化(少了很多不必要的内容)

  import Vue from 'vue'
  import App from 'xxx.vue'

  const app = createApp(App)
      等价于
  const vm = new Vue({
    render: h=>h(App)
  })

  app.mount('#app')
      等价于
  vm.$mount('#app')

*/

// eventBus
import mitt from 'mitt'
app.config.globalProperties.$bus = mitt()

//vuex
import store from '@/store/index'
app.use(store)

//如果需要自定义全局
//app.config.globalProperties.$test = (msg) => { console.log(msg) }
