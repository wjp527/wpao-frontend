<template>
  <div class="Team">
    team
  </div>
</template>
<script lang="ts" setup name="Team">
import { ref } from 'vue'
import { useGlobalStore } from '../../store/global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '队伍'
</script>

<style lang="less" scoped>
  
</style>