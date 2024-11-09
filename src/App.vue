<script setup>
import { ref , watch} from 'vue'
import { useRoute } from 'vue-router';
import { useGlobalStore } from './store/Global';
const globalStore = useGlobalStore();
import BasicLayout from '@/layout/BasicLayout.vue'
 
const route = useRoute();
const isWhitelisted = ref(false);
// 设置白名单
// const whitelistedPaths = new Set(['welcome', 'login', 'register']);
const whitelistedPaths = new Set(['', 'team', 'user']);

watch(() => route.path, (newPath) => {
  const path = newPath.split('/').pop();
  // 判断是否在白名单中
  isWhitelisted.value = !whitelistedPaths.has(path);
  globalStore.lastSegment = isWhitelisted.value
});

</script>

<template>  
  <BasicLayout v-if="globalStore.lastSegment !== true"></BasicLayout>
  <!-- 展示欢迎页 / 登录页 / 注册页 -->
   <div  v-else>
    <NavBar/>
    <RouterView></RouterView>
   </div>

</template>