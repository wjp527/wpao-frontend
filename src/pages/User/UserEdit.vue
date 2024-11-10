<template>
  <div class="Edit">
    
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 文件上传 -->
        <van-field v-if="editUser.editKey === 'avatarUrl'" name="avatarUrl" :label="editUser.editName" :rules="[{ required: true, message: `请输入${editUser.editName}` }]">
          <template #input>
            <van-uploader v-model="fileValue" max-count="1" :after-read="afterRead" />
          </template>
        </van-field>

        <van-field v-else-if="editUser.editKey === 'gender'" name="gender" v-model="fieldValue" is-link readonly :label="editUser.editName" placeholder="选择性别" @click="showPicker = true" />

        <van-field v-else v-model="editUser.currentValue" :name="editUser.editKey" :label="editUser.editName" :placeholder="editUser.editName" :rules="[{ required: true, message: `请输入${editUser.editName}` }]" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>

  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>
<script lang="ts" setup name="Edit">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../store/User'
import { useGlobalStore } from '../../store/Global'

import { showToast } from 'vant'
const route = useRoute()
const router = useRouter()

const userStore: any = useUserStore()
const globalStore = useGlobalStore()
globalStore.GlobalNavBarTitle = '修改信息'

const editUser: any = ref({
  id: route.query.id as string,
  editKey: route.query.editKey as string,
  editName: route.query.editName as string,
  currentValue: route.query.currentValue as string,
})

// 文件上传
const fileValue: any = ref([])
const init = async () => {
  let res = await userStore.GetCurrentUserAsync()
  if (res === 200) {
    if (userStore.userInfo.avatarUrl != '') {
      fileValue.value[0] = {
        url: userStore.userInfo.avatarUrl,
      }
    }
  }
}
init()

const afterRead = async (file: any) => {
  // 此时可以自行将文件上传至服务器
  const formData = new FormData()
 
  formData.append('file', file.file)
  let res: any = await userStore.GetUserUploadFileAsync(formData)
  if (res === 200) {
  } else {
    showToast(res.description)
  }
}

// 选择性别
const columns = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
]
const fieldValue = ref('')
const showPicker = ref(false) 
fieldValue.value = editUser.value.currentValue == 0 ? '男' : '女'
// editUser.currentValue = editUser.value.currentValue == 0 ? (fieldValue.value = '男') : (fieldValue.value = '女')
 

const onConfirm = ({ selectedOptions }:any) => {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].text 
  editUser.currentValue = fieldValue.value 
}

// --------------------- 普通修改直接进入 ---------------------

const onSubmit = async (submitValue: any) => {
  if (!isValidPhoneNumber(submitValue.phone) && editUser.editKey === 'phone') {
    showToast('请输入正确的手机号')
    return
  }
  if (!isValidEmail(submitValue.email) && editUser.editKey === 'email') {
    showToast('请输入正确的邮箱')
    return
  }

  submitValue.avatarUrl = userStore.userAvatarUrl || fileValue.value[0].url

  if (editUser.value.editKey === 'gender') {
    submitValue.gender = fieldValue.value == '男' ? 0 : 1
  }

  let res: any = await userStore.GetUserUserListUpdateAsync({ ...submitValue, id: editUser.value.id })
  if (res === 200) {
    showToast('修改成功')
    setTimeout(() => {
      router.replace('/user')
    }, 500)
  } else {  
    showToast(res)
  }
}

// 正则
const isValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/ // 适用于中国大陆手机号码
  return phoneRegex.test(phone)
}
const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
</script>

<style lang="less" scoped></style>
