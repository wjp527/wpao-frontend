<template>
  <div class="Loading">
    <atom-spinner :animation-duration="1000" :size="60" :color="color" />
  </div>
</template>
<script lang="ts" setup name="Loading">
import { AtomSpinner } from 'epic-spinners'
const props = defineProps<{
  color: string; // 指定 color 的类型
}>();
defineEmits(['color'])
</script>

<style lang="less" scoped>
.Loading {
  position: absolute;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center; 
}
</style>
