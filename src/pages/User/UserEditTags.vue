<template>
  <div class="UserEditTags">
    <van-sticky>
      <div class="top">
        <FirstTag @click="addFirstTag" :title="title" /> 
      </div>
    </van-sticky>

    <div class="box">
    
      <div v-for="item in originTagList" :key="item.id">
        <div class="title">{{ item.tagName }}</div>
        <SecondTag  @click="add(item, item.children)"/>
        <!-- <van-button  size="mini" type="primary"> 添加</van-button> -->
        <div class="tags">
          <van-tag :show="subItem.isActive" closeable v-for="(subItem, index) in item.children" :key="subItem.id"
            class="sub-tag" plain  @click="editTag(item, subItem)" @close="clickLabel(subItem)">{{ subItem.tagName }}</van-tag>
        </div>
      </div>
    </div>

    <div class="btn">
      <van-button type="primary"   :disabled="true">自动更新💖</van-button>
    </div>
  </div>

  <!-- 一级添加标签弹窗 -->
  <van-dialog v-model:show="FirstAddshow" title="新增标签" show-cancel-button @confirm="confirmAddFirstTag">
    <van-field v-model="addFirstTagText" name="标签" label="标签" placeholder="标签"
    :rules="[{ required: true, message: '请输入一级标签' }]" />
  </van-dialog>
  <!-- 二级添加标签弹窗 -->
  <van-dialog v-model:show="Addshow" title="新增标签" show-cancel-button @confirm="confirmAddTag">
    <van-field v-model="addTagText" name="标签" label="标签" placeholder="标签"
    :rules="[{ required: true, message: '请输入标签值' }]" />
  </van-dialog>
  <!-- 修改标签弹窗 -->
  <van-dialog v-model:show="show" title="修改标签" show-cancel-button @confirm="confirmUpdateTag">
    <van-field v-model="updateTagText" name="标签" label="标签" placeholder="标签"
    :rules="[{ required: true, message: '请更新标签' }]" />
  </van-dialog>
</template>
<script lang="ts" setup name="UserEditTags">
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
globalStore.GlobalNavBarTitle = '更新标签'
const originTagList: any = ref([])

const title = "Add"
 
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
        isActive: true
      }))
      return item
    })

  }
}


// 判断标签是否被选中 
const clickLabel = async (payload: any) => { 
 let res = await tagStore.deleteTag({
    id: payload.id
  })
  if(res == 200) {
    showToast('删除成功')
    init()
  } else {
    showToast(res)
  } 
  
}
 
 
// 添加一级标签
const addFirstTagText = ref()
const FirstAddshow = ref(false)
const addFirstTagObj = ref()
const addFirstTag = () => {
  setTimeout(() => {
    FirstAddshow.value = true
  // 清空表单
    addFirstTagText.value = ''
  }, 1000)
}

// 确认一级表单
const confirmAddFirstTag =  async() => {
  addFirstTagObj.value = {
    isParent: 1,
    parentId: 0,
    remark: '',
    tagName: addFirstTagText.value
  }

  let res = await tagStore.addTag(addFirstTagObj.value)
  if(res === 200) {
    showToast('添加成功')
    FirstAddshow.value = false
    init()
  } else {
    showToast(res)
  }
}

// 添加二级标签 0: add 1: update
const Addshow = ref(false)
const addTagText = ref()
let addItem = ref()
let addChildren = ref()
const add = (item: any, children: any) => {
  Addshow.value = true 
  addItem.value = item
  addChildren.value = children
  // 清空表单
  addTagText.value = ''

}

const confirmAddTag = async () => {
  addChildren.value.push({
    isParent: 0,
    parentId: addItem.value.id,
    userId: userStore.userInfo.id,
    tagName: addTagText.value
  }) 
  const finalAddTags = addChildren.value.slice(-1)[0]
  let res = await tagStore.addTag(finalAddTags)
  if(res === 200) {
    showToast('添加成功')
    Addshow.value = false
    init()
  } else {
    showToast(res)
  }
}

// 修改标签
const show = ref(false)
const updateTag = ref()
const subItemTag = ref()
const updateTagText = ref()
const editTag = (item: any, subItem: any) => {
  show.value = true
  updateTag.value = item
  
  subItemTag.value = subItem 
  updateTagText.value = subItem.tagName 
 
}
const confirmUpdateTag = async () => {  
  subItemTag.value.tagName = updateTagText.value 
  let res = await tagStore.updateTags([updateTag.value])
  if(res === 200) {
    showToast('修改成功')
  } else {
    showToast(res)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.UserEditTags {
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
  padding: 10px;

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
  box-shadow: -5px 5px 0px #177de4,
    5px -5px 0px #1b95ff;
}
</style>
