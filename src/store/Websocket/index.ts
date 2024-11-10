import { defineStore } from "pinia";
import { ref } from "vue";


// websocket 仓库
export const useWebsocketStore: any = defineStore("Websocket", () => {

  const msg = ref('')


  return {
    msg
  }
},
  {
    persist: true,
  })