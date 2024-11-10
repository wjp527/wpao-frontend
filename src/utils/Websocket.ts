import { useWebsocketStore } from "../store/Websocket";
// let url = "ws://localhost:8004/ws";
let url = "ws://127.0.0.1:8004/ws";

const WebSocketStore = useWebsocketStore();


interface socket {
  websocket: any
  init: () => any
  send: (e: any) => void
}

const socket: socket = {
  websocket: null,
  init: () => {
    // 创建websocket对象
    socket.websocket = new WebSocket(url);
    // 服务器传来的消息
    socket.websocket.onmessage = (e: any) => {
      console.log('服务器传来的消息: ', e);
      let data = JSON.parse(e.data)
      if (data === 3) {

      } else {
        WebSocketStore.msg = e.data
      }
    }

    socket.websocket.onclose = (e: any) => {
      console.log('关闭: ', e);
    }
  },
  send: (e: any) => {
    // 0: 代表没有连接完毕
    // 1: 代表已经连接完毕，可以开始通信
    if (socket.websocket.readyState == 0) {
      console.log('还没连接成功，不能发送消息');
      setTimeout(() => {
        socket.websocket.send(JSON.stringify(e))
      }, 1000)
    } else {
      console.log(e, 'e')
      socket.websocket.send(JSON.stringify(e))
    }
  }
}

export default socket;