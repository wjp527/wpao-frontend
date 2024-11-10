<template>
  <div class="ExampleView">
    <van-form @submit="onSubmit">
      <div style="margin: 5px 20px">
        <FirstTag :title="btnTitle"  />
      </div>
      <van-cell-group inset>
        <van-field v-model="addBlogObj.title" name="title" label="标题" placeholder="请输入标题" :rules="[{ required: true, message: `请输入标题` }]" />

        <van-field v-model="addBlogObj.subTitle" name="subTitle" label="副标题" placeholder="请输入副标题" :rules="[{ required: true, message: `请输入副标题` }]" />

        <!-- 文件上传 -->
        <van-field name="blogPic" :label="BlogPic" :rules="[{ required: true, message: `请选择blog图片` }]">
          <template #input>
            <van-uploader v-model="fileValue" max-count="1" :after-read="afterRead" />
          </template>
        </van-field>
      </van-cell-group>
      <MdEditor :value="mdValue" :handle-change="handleMdChange" />
    </van-form>
  </div>
</template>
<script lang="ts" setup name="ExampleView">
import { ref } from 'vue'

// store 仓库
import { storeToRefs } from 'pinia'
import { useTeamStore } from '../../../store/Team'
import { useBlogStore } from '../../../store/Blog'
import { useUserStore } from '../../../store/User'
import { useGlobalStore } from '../../../store/Global'


// router
import { useRouter } from 'vue-router'
const router = useRouter()

// 组件库
import { showToast } from 'vant'

// 自定义组件
import MdEditor from '../../../components/MdEditor/index.vue'

const btnTitle = ref('发布')
const BlogPic = ref('封面')
const userStore = useUserStore()
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '发布博客'
// 文件上传
const fileValue: any = ref([])

const afterRead = async (file: any) => {
  // 此时可以自行将文件上传至服务器
  const formData = new FormData()

  formData.append('file', file.file)
  let res: any = await userStore.GetUserUploadFileAsync(formData)
  
  if (res === 200) {
    console.log(fileValue.value[0]);
  } else {
    showToast(res.description)
  }
}

const onSubmit = async (submitValue: any) => {
 
  submitValue.blogPic = userStore.filePic 
  submitValue.content = mdValue.value
  submitValue.teamId = teamDetail.value.id

  let res: any = await blogStore.addBlogAsync(submitValue)
  if (res === 200) {
    showToast('添加成功')
    setTimeout(() => {
      router.push('/blog')
    }, 1000)
  } else {
    showToast(res)
  }
}

const teamStore = useTeamStore()
const { teamDetail }: any = storeToRefs(teamStore)
const blogStore = useBlogStore()

const mdValue = ref('')
const handleMdChange = (v: string) => {
  mdValue.value = v
}
let addBlogObj = ref({
  teamId: teamDetail.value.id,
  title: '',
  subTitle: '',
  blogPic: '',
  content: mdValue.value,
})
</script>

<style scoped></style>
