<template>
  <div class="TeamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="name" name="name" label="队伍名称" placeholder="队伍名称" :rules="[{ required: true, message: '请填写队伍名称' }]" />
        <van-field v-model="description" name="description" label="队伍描述" placeholder="队伍描述" :rules="[{ required: true, message: '请填写队伍描述' }]" />

        <van-field name="teamPic" label="文件上传" :rules="[{ required: true, message: '请上传队伍图片' }]">
          <template #input>
            <van-uploader v-model="teamPic1" max-count="1" :after-read="afterRead" />
          </template>
        </van-field>



        <van-field name="maxNum" label="最大人数">
          <template #input>
            <van-stepper v-model="maxNum" />
          </template>
        </van-field>

        <!-- 日期组件 -->
        <van-field v-model="expireTime" is-link readonly name="expireTime" label="时间选择" placeholder="点击选择结束时间" @click="openDatePicker" :rules="[{ required: true, message: '请选择过期时间' }]" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker v-model="currentDate" type="datetime" @change="changeExpireTime" @confirm="onConfirm" @cancel="showPicker = false"  />
        </van-popup>

        <van-field name="teamStatus" label="队伍状态">
          <template #input>
            <van-radio-group v-model="teamStatus" @change="changeTeamStatus" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>


        <van-field v-if="isShowPassword" v-model="password" name="password" label="密码" placeholder="请填写加密密码" :rules="[{ required: true, message: '请填写加密密码' }]" /> 
 

      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup name="TeamAdd">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../../store/Global'
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '添加队伍'

import { useUserStore } from '../../store/User'
import { showToast } from 'vant'

import { useTeamStore } from '../../store/Team'
const teamStore: any = useTeamStore()
const userStore: any = useUserStore()
const router = useRouter()
// form表单
const name = ref('')
const description = ref('')

const onSubmit = async (values: any) => { 
  values.teamPic = userStore.filePic
  let res = await teamStore.GetAddTeanAsync(values) 
  if (res == 200) {
    showToast('添加成功')
    setTimeout(() => {
      router.push('/team')
    },1000)
  } else {
    showToast(res)
  }
}

// 文件上传
const teamPic1: any = ref([])
const teamPic: any = ref([])

// 上传函数
const afterRead = async (file: any) => {
  // 此时可以自行将文件上传至服务器
  // 创建formdata类型的数据
  const formData = new FormData()
  formData.append('file', file.file)
  let res: any = await userStore.GetUserUploadFileAsync(formData)
  if (res === 200) {
    teamPic.value = userStore.filePic
  } else {
    showToast(res.description)
  }
}

// 队伍类型
const teamStatus = ref('0')

// 最大人数
const maxNum = ref(5)

// 日期
const expireTime = ref('')
const showPicker = ref(false)
const currentDate = ref<number[]>([])
const openDatePicker = () => {
  currentDate.value = []
  showPicker.value = true
  let data = new Date()
  let year = data.getFullYear()
  let month = data.getMonth() + 1
  let day = data.getDate() + 1
  currentDate.value.push(year, month, day)
}

const changeExpireTime = (payload: any) => {
 
}
const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  selectedValues.push("00", "00", "00", "00")
 

  let formattedDate = selectedValues.join('-')

  let parts = formattedDate.split('-')
  expireTime.value = `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]}:${parts[5]}`

  showPicker.value = false
  selectedValues=[]
}

// 队伍加密密码
const password = ref()
// 只有加密，才会显示密码输入框
const isShowPassword = ref(false)
const changeTeamStatus = (payload: any) => {
 
  if(payload == '2') {
    isShowPassword.value = true
  } else {
    isShowPassword.value = false
  }
}
</script>

<style lang="less" scoped></style>
