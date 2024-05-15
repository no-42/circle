<script setup>
import CommentListItem from "./commentListItem.vue";
import {ref, reactive, onMounted, getCurrentInstance, computed} from "vue";
import {uploadImg} from "@/api/upload.js"
import {sleep} from "uview-plus";
import message from "@/utils/message";
import MyRichInput from "../comps/myRichInput.vue";

defineProps({
  closeChat: {
    type: Function,
    required: true
  }
})

const chatMessageList = reactive([
  {
    id: "1",
    userName: "username",
    message: "Circle 一款优质社交平台已上线至各应用商店。邀请新用户可得现金红包。",
    messageTime: 1713435407
  },
  {
    id: "2",
    userName: "username",
    message: "Circle 一款优质社交平台已上线至各应用商店。邀请新用户可得现金红包。",
    messageTime: 1713435407
  },
  {
    id: "3",
    userName: "username",
    message: "Circle 一款优质社交平台已上线至各应用商店。邀请新用户可得现金红包。",
    messageTime: 1713435407
  }
])

const showEmoji = ref(false)


const commentMessage = ref('')

function changeShowEmoji() {
  showEmoji.value = !showEmoji.value
}

// 发送内容
async function enterKeyDown(message) {
  chatMessageList.push({
    userName: "username",
    message: message,
    messageTime: new Date().getTime() / 1000
  })
}

function inputConsole(html, text, delta) {
  commentMessage.value = html.detail.html
  // console.log(html, text, delta)
}

let needUploadImg = []

function choosePicture() {
  uni.chooseImage({
    success: (res) => {
      console.log(1, res.tempFilePaths[0])
      needUploadImg.push(res.tempFilePaths[0])
      editorCtx.insertImage({
        src: res.tempFilePaths[0],
        width: "50%"
      })
    }
  })
}

const instance = getCurrentInstance();
const commentRichInputHeight = ref(0)
let editorCtx;
onMounted(() => {
  getCommentRichInput()
})

function getCommentRichInput() {
  let query = uni.createSelectorQuery().in(instance);
  query.select('#commentRichInput').boundingClientRect(data => {
    commentRichInputHeight.value = data.height
  }).exec()
}

function emoChange(emoji) {
  console.log(emoji, typeof emoji)
  editorCtx.insertText({
    text: emoji
  })
  editorCtx.getContents({
    success: (html, text, delta) => {
      console.log(html, text, delta)
    }
  })
  console.log()
  showEmoji.value = false
}

function test(message) {
  chatMessageList.push({
    id: new Date().getTime(),
    userName: "username1",
    message: message,
    messageTime: new Date().getTime() / 1000
  })
}

</script>

<template>
  <div :style="{maxHeight: '75vh',marginBottom: commentRichInputHeight + 'px'}">
    <up-navbar title="评论"
               :fixed="false"
               style="margin-top: 30px"
               @leftClick="closeChat"></up-navbar>
    <view style="padding: 0 0 0 10px">
      <up-row style="margin-bottom: 10px">
        大家都在搜:
        <up-text text="Circle是啥平台" color="rgba(132, 132, 238, 1)"></up-text>
      </up-row>
      <up-list style="height: 60vh">
        <up-list-item v-for="(item,index) in chatMessageList">
          <comment-list-item :message="item.message" :user-name="item.userName"
                             :message-time="item.messageTime" :data-id="item.id" @send-message="test"></comment-list-item>
        </up-list-item>
      </up-list>
    </view>
  </div>
  <div id="commentRichInput" class="bottom-input-border">
    <my-rich-input @get-input-message="enterKeyDown"></my-rich-input>
  </div>
</template>

<style scoped lang="scss">
.bottom-input-border {
  position: fixed;
  background-color: rgba(255, 255, 255);
  padding: 20px;
  //z-index: 100000;
  bottom: 0;
  width: 90%;
}

.ql-container {
  display: block;
  position: relative;
  box-sizing: border-box;
  -webkit-user-select: text;
  user-select: text;
  outline: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: 60rpx;
  border-radius: 20rpx;
  background: rgba(229, 229, 229, 1);
  padding: 5rpx 20vw 0 20rpx;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
}

.upload_image_input_style {
  width: 50%;
}
</style>
