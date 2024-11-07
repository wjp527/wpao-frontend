import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// vant组件样式
/* main.css */
import 'vant/lib/index.css';
// 路由
import router from './router'
// 状态管理
import store from './store'

import Loading from './components/Loading/index.vue'
import { Toast } from 'vant';

const app = createApp(App)
app.component('Loading', Loading)
app.use(router)
app.use(store)
app.use(Toast);
app.mount('#app')
