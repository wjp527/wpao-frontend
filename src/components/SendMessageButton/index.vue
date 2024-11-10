<template>
  <div class="SendMessageButton">
    <a href="#" class="btn-shine" :style="{ animationDuration: randomDuration + 's' }">发送消息</a>
  </div>
</template>

<script lang="ts" setup name="SendMessageButton">
import { computed } from 'vue';

// 计算属性：生成一个 2 到 5 秒之间的随机动画时间
const randomDuration = computed(() => (Math.random() * 3 + 2).toFixed(2));
</script>

<style lang="less" scoped>
.btn-shine {
  font-family: subtitle !important;
  position: absolute;
  top: 80%;
  left: 80%;
  transform: translate(-50%, -50%);
  color: #fff;
  background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine infinite linear; /* 移除具体的时间，将时间动态绑定 */
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
  font-family: "Poppins", sans-serif;
}

@keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
</style>
