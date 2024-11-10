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
// 添加一级标签
import FirstTag from './components/AddButton/FirstTag.vue'
// 添加二级标签
import SecondTag from './components/AddButton/SecondTag.vue'
import NavBar from './components/NavBar/index.vue'
import AddApplyButton from './components/AddApplyButton/index.vue'
import SendMessageButton from './components/SendMessageButton/index.vue'

import { Toast } from 'vant';

// 引入字体样式
import './assets/fonts/fonts.css'
import './common/index.css'
// 引入bytemd编辑器样式
import "bytemd/dist/index.css";


const app = createApp(App)
app.component('Loading', Loading)
app.component('ToggleSwitche', ToggleSwitche)
app.component('FirstTag', FirstTag)
app.component('SecondTag', SecondTag)
app.component('NavBar', NavBar)
app.component('AddApplyButton', AddApplyButton)
app.component('SendMessageButton', SendMessageButton)

app.use(router)
app.use(store)
app.use(Toast);
app.mount('#app')
