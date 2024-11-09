<template>
  <div class="Welcome">
    <van-sticky>
      <div class="top">
        <div class="title">欢迎回来</div>
        <div class="subtitle">选择标签可以获得更精确的内容推荐</div>
      </div>
    </van-sticky>

    <div class="box">
      <div v-for="item in originTagList" :key="item.id">
        <div class="title">{{ item.tagName }}</div>
        <div class="tags">
          <div  v-for="subItem in item.children" :key="subItem.id" class="sub-tag" :class="{ active: subItem.isActive }" @click="clickLabel(subItem)">{{ subItem.tagName }}</div>
        </div>
      </div>
    </div>
    
    <div class="btn">
      <van-button type="primary" :disabled="countIsActiveTrue > 5" @click="updateUserTags">我选好啦🤞 (最多5个)</van-button>
    </div> 
  </div>
</template>
<script lang="ts" setup name="Welcome">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTagStore } from '../../store/Tag'
import { useUserStore } from '../../store/User';
import { useGlobalStore } from '../../store/Global';
import { showToast } from 'vant';
const router = useRouter()
const userStore = useUserStore()
const tagStore = useTagStore()
const globalStore = useGlobalStore()
const originTagList: any = ref([]) 

const countIsActiveTrue = computed(() => {
  return originTagList.value.reduce((pre:number,item:any) => {
    return pre + item.children.filter((i: any) => i.isActive == true).length
  },0)
})
const pageInfo = ref({
  pageNum: 1,
  pageSize: 100,
})
  
const init = async () => {
  let res = await tagStore.listPage(pageInfo.value)
  if (res == 200) {
    originTagList.value = tagStore.tagList.map((item: any) => {
      item.children.forEach((subItem: any) => ({
        ...subItem,
        isActive: false
      }))
      return item
    }) 
 
  }
}

// 判断标签是否被选中 
const clickLabel = (payload: any) => {
  payload.isActive =!payload.isActive
}


const finalTags = ref([])
const arr = ref()
const updateUserTags = async () => {

   originTagList.value.map((item:any) => {
    arr.value = item.children.filter((i: any) => i.isActive == true)  
    arr.value?.forEach((j: any) => {
      // @ts-ignore
      finalTags.value.push(j.tagName)
    })  
    
    
  
  })
  
 
 let res: any = await userStore.GetUserUpdateTagAsync({
    tags: JSON.stringify(finalTags.value)
  })
  if(res == 200) {
    globalStore.lastSegment = false
    showToast('登录成功')
    router.push('/')
  } else {
    showToast(res)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.Welcome {
  min-height: 100vh;
  max-height: 100%;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  background-color: #fff;
  .title {
    font-family: 'MyCustomFont' !important;
    padding: 10px 0;
  }

  .subtitle {
    color: #b4b4b4;
    font-size: 12px;
    padding-bottom: 10px;
  }
}

.box {
  padding: 0px 20px;
  margin-bottom: 80px;

  .title {
    font-size: 16px;
    margin: 20px 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    .sub-tag {
      padding: 5px 20px;
      border: 1px solid #eae8e9;
      margin: 10px;
      border-radius: 10px;
    }
  }
}

.btn {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 999;
  display: flex;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  background-color: #fff;

  /deep/ .van-button {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.active {
  color: #fff;
  border-radius: 43px;
background: linear-gradient(225deg, #177be1, #1b93ff);
box-shadow:  -5px 5px 0px #177de4,
             5px -5px 0px #1b95ff;
}
</style>
