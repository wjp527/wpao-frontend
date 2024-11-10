<template>
  <div class="Card"> 
    <van-card v-if="userList.length > 0" class="card" v-for="item in userList" tag="xxx" :price="`星球编号: ${item.planetCode}`" :desc="item.profile" :title="item.username" :thumb="item.avatarUrl">
      <template #tags>
        <van-tag class="tag" plain type="primary" v-for="tag in item.tags">{{ tag }}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" class="contact" @click="contact(item)">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>
<script lang="ts" setup name="Card">
import { useUserStore } from '../../store/User';
import { useApplyStore } from '../../store/Apply';
import { showToast } from 'vant';
const userStore = useUserStore();
const applyStore = useApplyStore();
interface UserCardListProps {
  // 子组件传来的参数
  userList: any[]
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: [] as any
}) 

const contact = async (payload: any) => {
  let res = await applyStore.addApplyAsync({
    uid: userStore.userInfo.id,
    tid: payload.id
  })
  if(res == 200) {
    showToast('申请已发送')
  } else {
    showToast(res)
  }
}

</script>

<style lang="less" scoped>
  .card {
  .tag {
    margin-right: 8px !important;
    margin-top: 8px !important;
  }
  .contact {
    padding: 10px;
  }
}

/deep/ .van-card__price-currency {
  color: transparent;
}
</style>