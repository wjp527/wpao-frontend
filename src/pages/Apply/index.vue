<template>
  <div class="Apply">
    <!-- 骨架屏 -->
    <van-skeleton v-for="(item, index) in pageInfo.pageSize" :key="index" v-show="loading">
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <van-skeleton-image />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-paragraph row-width="60%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
          </div>
        </div>
      </template>
    </van-skeleton>

    <van-card v-if="finalList.length > 0" class="card" v-for="(item, index) in finalList" tag="xxx"
      :price="`星球编号: ${item.planetCode}`" :desc="item.profile" :title="item.username" :thumb="item.avatarUrl">
      <template #tags>
        <van-tag class="tag" plain type="primary" v-for="tag in item.tags">{{ tag }}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" plain type="danger" class="contact" @click="refuse(applyList[index].id)">拒绝</van-button>
        <van-button size="mini" type="primary" class="contact" @click="agree(applyList[index].id)">同意</van-button>
      </template>
    </van-card>
  </div>
</template>
<script lang="ts" setup name="Apply">
import { onMounted, ref } from 'vue'
import { useApplyStore } from '../../store/Apply';
import { showToast } from 'vant';
const applyStore = useApplyStore()

import { useGlobalStore } from '../../store/Global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '好友申请'


// 加载中
const loading = ref(false)
const pageInfo = ref({
  pageNum: 1,
  pageSize: 10
})

const applyList: any = ref([])
const finalList: any = ref([])
const init = async () => {
  loading.value = true
  let res = await applyStore.listApplyAsync(pageInfo.value)
  finalList.value = []
  if (res === 200) {
    applyList.value = applyStore.applyList
    applyList.value.forEach((item: any) => {
      finalList.value.push(item.sendUserInfo)
    })
    loading.value = false

  } else {
    showToast(res)
    loading.value = false
  }
}

// 拒绝
const refuse = async (payload: any) => {
  let res = await applyStore.applyDealAsync({
    id: payload
  })
  if (res === 200) {
    showToast('拒绝成功')
    init()
  } else {
    showToast(res)
  }
}
// 同意
const agree = async (payload: any) => {
  let res = await applyStore.applyDealAsync({
    id: payload
  })
  if (res === 200) {
    showToast('同意成功')
    init()
  } else {
    showToast(res)
  }
}
onMounted(() => {
  init()
})

</script>

<style lang="less" scoped>
/deep/ .van-card__price-currency {
  color: transparent;
}

.tag {
  margin: 2px 2px;
}
</style>