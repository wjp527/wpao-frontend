<template>
  <div class="UserTeamJoin">
    <van-card v-for="item in othersTeamList" :desc="item.description" :title="item.name" :thumb="item.teamPic">
      <template #price>
        <div class="flex">
          <van-tag plain type="primary">max: {{ item.maxNum }}</van-tag>
          <van-tag plain type="primary">join: {{ item.joinNum }}</van-tag>
        </div>
        <div>过期: {{ item.expireTime }}</div>
      </template>
      <!-- <template #footer>
        <van-button type="primary" size="mini" v-if="item.userId == userInfo?.id" @click="uploadTeam(item)">更新</van-button>
        <van-button type="primary" size="mini" :disabled="item.maxNum == item.joinNum" @click="joinTeam(item)">加入队伍</van-button>
      </template> -->
    </van-card>
  </div>
</template>
<script lang="ts" setup name="UserTeamJoin">
import { onMounted, ref } from 'vue'

import { useTeamStore } from '../../store/Team' 
import { showToast } from 'vant'
const teamStore = useTeamStore() 
 

const othersTeamList:any = ref([])
const init = async () => {
  let res = await teamStore.GetCurrentJoinTeamListAsync()
  if (res == 200) {
    othersTeamList.value = teamStore.joinTeamList
  } else {
    showToast(res)
  }
}

onMounted(() => {
  init()
})

</script>

<style lang="less" scoped>
  
</style>