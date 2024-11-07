<template>
  <div class="UserTeamCreate">
    <van-card v-for="item in creatList" :desc="item.description" :title="item.name" :thumb="item.teamPic">
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
<script lang="ts" setup name="UserTeamCreate">
import { onMounted, ref } from 'vue'

import { useTeamStore } from '../../store/team'
import { useUserStore } from '../../store/user'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
const teamStore = useTeamStore()
const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)

const creatList:any = ref([])
const init = async () => {
  let res = await teamStore.GetCreateTeamListAsync({
    // @ts-ignore
    userId: userInfo.value.id,
  })
  if (res == 200) {
    creatList.value = teamStore.createTeamList
  } else {
    showToast(res)
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.UserTeamCreate {
  padding-bottom: 80px;
}
</style>
