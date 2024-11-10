<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
  <Viewer />
</template>

<script lang="ts" setup name="MdEditor">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import gemoji from "@bytemd/plugin-gemoji";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";

 
/** ✨
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
/** ✨
 * 定义组件默认值
 * @param props 组件属性
 * 如果父组件没有传值，那么使用默认值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const plugins = ref([
  gfm(), // 解析GFM
  highlight(), // 代码高亮
  gemoji(), // 表情
  // Add more plugins here
]);
</script>
