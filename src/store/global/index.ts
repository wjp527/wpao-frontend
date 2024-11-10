import { defineStore } from "pinia";
import { ref } from "vue";


export const useGlobalStore = defineStore("global", () => {

  // navbar的动态标题
  const GlobalNavBarTitle = ref("")

  const lastSegment = ref(false)


  return {
    GlobalNavBarTitle,
    lastSegment
  }

},
  {
    persist: true,
  })