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

// 加载组件
import Loading from './components/Loading/index.vue'
// 加载自定义组件
import ToggleSwitche from './components/ToggleSwitche/index.vue'

import { Toast } from 'vant';

const app = createApp(App)
app.component('Loading', Loading)
app.component('ToggleSwitche', ToggleSwitche)
app.use(router)
app.use(store)
app.use(Toast);
app.mount('#app')
