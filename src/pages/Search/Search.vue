<template>
  <div class="Search">
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索的标签" @search="onSearch" @cancel="onCancel" />
    </form>

    <van-divider content-position="left">已选标签</van-divider>

    <div class="search">
      <van-row :gutter="10">
        <div v-if="activeId.length == 0">请选择标签</div>
        <van-col span="4" v-for="item in activeId" :key="item">
          <van-tag :show="show" closeable size="middle" type="primary" @close="close(item)">{{ item }}</van-tag>
        </van-col>
      </van-row>
    </div>

    <van-divider content-position="left">可选标签</van-divider>

    <van-divider content-position="left"> </van-divider>

    <div class="tree">
      <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="tagList" />
    </div>
  </div>

  <div class="btn">
    <van-button class="search-btn" :disabled="disabledBtn" @click="doSearchResult" type="primary">搜索</van-button>
  </div>
</template>
<script lang="ts" setup name="Search">
import { ref ,computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
 
// 使用计算属性
const disabledBtn = computed(() => {
  return !(activeId.value.length > 0)
})

// search
// start
const originTagList = ref([
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
      { text: '人妖', id: '人妖' },
    ],
  },
  {
    text: '语言',
    children: [
      { text: 'java', id: 'java' },
      { text: 'c++', id: 'c++' },
      { text: 'python', id: 'python' },
    ],
  },
  {
    text: '级别',
    children: [
      { text: '初级', id: 4 },
      { text: '中级', id: 5 },
      { text: '高级', id: 6 },
      { text: '宗师', id: 7 },
      { text: '王', id: 8 },
    ],
  },
])

let tagList = ref()
tagList.value = JSON.parse(JSON.stringify(originTagList.value))
const searchText = ref('')

const onSearch = (val: any) => {
  // 深拷贝
  tagList.value = JSON.parse(JSON.stringify(originTagList.value))

  if (searchText.value.trim() === '') {
    tagList.value = originTagList.value
  } else {
    // 使用 map 代替 forEach，返回新的数组结构
    tagList.value = tagList.value.map((item: any) => {
      // 如果 `item.children` 存在，则筛选 `children` 中符合条件的元素
      return {
        ...item,
        children: item.children ? item.children.filter((i: any) => i.text.includes(searchText.value)) : [],
      }
    })
  }

  console.log(tagList.value, 'tagList.value')
}

const onCancel = () => {
  searchText.value = ''
}

// end

// tag
const show = ref(true)
// 关闭标签
const close = (payload: any) => {
  activeId.value = activeId.value.filter(item => item !== payload)
}

// 折叠面板
const activeId = ref([])
const activeIndex = ref(0)

const doSearchResult = async () => {
  router.push({
    path: '/searchresult',
    query: {
      tags: activeId.value,
    },
  })
}
</script>

<style lang="less" scoped>
/deep/ .van-tree-select {
  width: 100%;
}

.search {
  padding: 0 20px;
}

.tree {
  // height: 400px;
  background-color: pink;
}

.btn {
  padding: 10px 20px;

  .search-btn {
    width: 100%;
  }
}
</style>
