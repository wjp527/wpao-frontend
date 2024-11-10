<template>
  <div class="Team">
    <Loading color="#1989fa" v-show="loading" />
    <van-search v-model="searchValue" placeholder="请输入队伍" @search="onSearch" />

    <van-tabs v-model:active="active" @change="teamStatusChagne">
      <van-tab title="公开">
        <van-card v-for="item in teamListByPublic" :tag="item.TeamStatusCN" :desc="item.description" :title="item.name" :thumb="item.teamPic">
          <template #price>
            <div class="flex">
              <van-tag plain type="primary">max: {{ item.maxNum }}</van-tag>
              <van-tag plain type="primary">join: {{ item.joinNum }}</van-tag>
            </div>
            <div>过期: {{ item.expireTime }}</div>
          </template>
          <template #footer>
            <van-button type="primary" size="mini" :disabled="item.maxNum == item.joinNum" @click="joinTeam(item)" v-if="item.userId != userInfo?.id && item.hasJoin == false">加入队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.userId == userInfo?.id && item.hasJoin == true" @click="uploadTeam(item)">更新队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.hasJoin == true" @click="QuitTeam(item)">退出队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.userId == userInfo?.id" @click="DissolveTeam(item)">解散队伍</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="加密">
        <van-card v-for="item in teamListSecret" :tag="item.TeamStatusCN" :desc="item.description" :title="item.name" :thumb="item.teamPic">
          <template #price>
            <div class="flex">
              <van-tag plain type="primary">max: {{ item.maxNum }}</van-tag>
              <van-tag plain type="primary">join: {{ item.joinNum }}</van-tag>
            </div>
            <div>过期: {{ item.expireTime }}</div>
          </template>
          <template #footer>
            <van-button type="primary" size="mini" :disabled="item.maxNum == item.joinNum" @click="joinTeam(item)" v-if="item.userId != userInfo?.id && item.hasJoin == false">加入队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.userId == userInfo?.id && item.hasJoin == true" @click="uploadTeam(item)">更新队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.hasJoin == true" @click="QuitTeam(item)">退出队伍</van-button>
            <van-button type="primary" size="mini" v-if="item.userId == userInfo?.id" @click="DissolveTeam(item)">解散队伍</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>

    <van-dialog v-model:show="showCenter" title="请输入密码" show-cancel-button @open="open" @confirm="onSubmit">
      <van-form >
        <van-cell-group inset>
          <van-field type="password" v-model="password" name="password" label="密码" placeholder="请填写加密密码" :rules="[{ required: true, message: '请填写加密密码' }]" />
        </van-cell-group>
 
      </van-form>
    </van-dialog>

    <van-floating-bubble v-model="offset" icon="plus" @click="onClick" axis="xy" magnetic="x" />
  </div>
</template>
<script lang="ts" setup name="Team">
import { onMounted, ref } from 'vue'

import { useGlobalStore } from '../../store/Global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '队伍'

import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/User'
import { useTeamStore } from '../../store/Team'
const userStore = useUserStore()
const teamStore = useTeamStore()

const { userInfo } = storeToRefs(userStore)
import router from '../../router'
import { showToast, Toast } from 'vant'

// 加载中
const loading = ref(true)

// 搜索
const searchValue = ref('')
// 公开数据
const teamListByPublic: any = ref([])
// 加密数据
const teamListSecret: any = ref([])
const onSearch = async (val: string) => {
  if (active.value == 0) {
    let res = await teamStore.GetSelectTeamAsync({
      searchText: val,
    })
    if (res == 200) {
      // 只截取4位数据
      teamListByPublic.value = teamStore.selectTeamList
    } else {
      showToast(res)
    }
  } else {
    let res = await teamStore.GetSelectTeamAsync({
      searchText: val,
      teamStatus: 2,
    })
    if (res == 200) {
      teamListSecret.value = teamStore.selectTeamList
    } else {
      showToast(res)
    }
  }
}

// tabs切换
const active = ref(0)

// 添加队伍按钮
const offset = ref({ y: 550 })
const onClick = () => {
  router.push('/team/add')
}

// 初始化公开数据
const initPublic = async () => {
  let res = await teamStore.GetTeamListAsync()
  loading.value = true
  if (res === 200) {
    teamListByPublic.value = teamStore.teamList
    loading.value = false
  } else {
    showToast(res)
  }
}

// 初始化加密数据
const initSercet = async () => {
  let res = await teamStore.GetTeamListAsync({
    teamStatus: 2,
  })
  loading.value = true
  if (res === 200) {
    teamListSecret.value = teamStore.teamList
    loading.value = false
  } else {
    showToast(res)
  }
}

const teamStatusChagne = (index: number) => {
  if (active.value == 0) {
    // 公开
    initPublic()
  } else {
    // 加密
    initSercet()
  }
}

// 更新队伍
const uploadTeam = (item: any) => {
  teamStore.updateTeam = item
  router.push('/team/update')
}

// 退出队伍
const QuitTeam = async (item: any) => {
 
  let res = await teamStore.GetQuitTeamAsync({
    teamId: item.id,
  })
  if (res == 200) {
    showToast('退出成功')
    initPublic()
    initSercet()
  } else {
    showToast(res)
  }
}
// 解散队伍
const DissolveTeam = async (item: any) => {
  const res = await teamStore.GetDissolveTeamAsync({
    id: item.id,
  })
  if (res == 200) {
    showToast('解散成功')
    initPublic()
    initSercet()
  } else {
    showToast(res)
  }
}
// 加入队伍
let sercetObj: any = ref({})
const joinTeam = async (item: any) => {
 
  // 公开
  if (item.teamStatus == 0) {
    let res: any = await teamStore.GetJoinTeamAsync({
      teamId: item.id,
    }) 
    if (res == 200) {
      showToast('加入成功')
      initPublic()
    } else {
      showToast(res)
    }
  } else if (item.teamStatus == 2) {
    // 加密
    showCenter.value = true
    sercetObj.value = item
  }
}

const showCenter = ref(false)
const password = ref('')
const open = () => {
  password.value = ''
}
const onSubmit = async () => { 
  let res: any = await teamStore.GetJoinTeamAsync({
    teamId: sercetObj.value.id,
    password: password.value,
  })
  if (res == 200) {
    showToast('加入成功')
    showCenter.value = false
    // 加密
    initSercet()
  } else {
    // showCenter.value = true
    showToast(res)
  }
}
onMounted(() => {
  initPublic()
})
</script>

<style lang="less" scoped>
.Team {
  padding-bottom: 80px;
}
/deep/ .van-card__price-currency {
  color: #fff;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;

  /deep/ .van-tag {
    margin: 2px 0;
  }
}
</style>
