<script setup lang="ts">
import {ref, onMounted, getCurrentInstance} from "vue";
import {uploadImg} from "@/api/upload.js"

const emit = defineEmits(['getInputMessage'])
const showEmoji = ref(false)
const commentMessage = ref()

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

function changeShowEmoji() {
  showEmoji.value = !showEmoji.value
}

function emoChange(emoji) {
  editorCtx.insertText({
    text: emoji
  })
  editorCtx.getContents({
    success: (html, text, delta) => {
      console.log(html, text, delta)
    }
  })
  showEmoji.value = false
}

function inputConsole(html, text, delta) {
  commentMessage.value = html.detail.html
}

function callFriends(event) {
}

async function sendMessage() {
  commentMessage.value = commentMessage.value.replace(/<p><br><\/p>$/, '')
  if (needUploadImg.length > 0) {
    commentMessage.value = commentMessage.value.replace(/\<img/gi, '<img style="width:50%;height:auto"')
    let upLoadObj = {
      finishUpLoad: 0,
      needUpload: 0
    }
    for (let img of needUploadImg) {
      /*如果可以找到，直接进行*/
      if (commentMessage.value.includes(img)) {
        upLoadObj.needUpload++
        await uploadImg(img, function (uploadFileRes) {
          const reg = new RegExp(img, "g");
          commentMessage.value = commentMessage.value.replace(reg, uploadFileRes.data.url)
          upLoadObj.finishUpLoad++
          console.log('上传成功', upLoadObj, commentMessage.value)
        })
      }
    }
  }
  console.log('上传结束')
  emit('getInputMessage', commentMessage.value)
  editorCtx.clear()
}

const instance = getCurrentInstance();
let editorCtx;
let inputRightPicWidth = ref(0);
let inputRightPicHeight = ref(0);
let inputWidth = ref(0);
let inputHeight = ref(0);
onMounted(() => {
  let query = uni.createSelectorQuery().in(instance);
  let editorQuery = query.select('#item-editor')
  editorQuery.context(res => {
    editorCtx = res.context
  }).exec()
  query.select('#input-right-pic').boundingClientRect(data => {
    inputRightPicWidth.value = data.width
    inputRightPicHeight.value = data.height
  }).exec()
  editorQuery.boundingClientRect(data => {
    inputWidth.value = data.width
    inputHeight.value = data.height
  }).exec()
})
const focusEditor = ref(false)
const editorRef = ref(null);
</script>

<template>
  <view>
    <div :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }"
    >
      <view style="width: 100%">
        <editor id="item-editor"
                class="ql-container"
                :style="{
                  paddingLeft:'5rpx',
                  paddingRight:focusEditor ? '5rpx' : inputRightPicWidth + 'px',
                  paddingBottom:focusEditor ? inputRightPicHeight + 'px' : '0'
                }"
                placeholder="评论"
                @keydown.enter="sendMessage"
                @input="inputConsole"
                ref="editorRef"
                @focus="focusEditor=true"
                @blur="focusEditor=false">
        </editor>
      </view>
      <div id="input-right-pic"
           :style="{
              position: 'fixed',
              marginLeft: focusEditor ? '5rpx' : inputWidth - inputRightPicWidth + 'px',
              marginTop: focusEditor ? inputHeight + 'px' : 0
            }"
      >
        <up-row>
          <up-icon size="40rpx" class="input-suffix-item" :name="`/static/img/drawable-xxxhdpi/addPicture.png`"
                   @click="choosePicture"></up-icon>
          <up-icon class="input-suffix-item" size="40rpx" :name="`/static/img/drawable-xxxhdpi/call.png`"
                   @click="callFriends"></up-icon>
          <up-icon class="input-suffix-item" size="40rpx" :name="`/static/img/drawable-xxxhdpi/emo.png`"
                   @click="changeShowEmoji"></up-icon>
        </up-row>
      </div>
      <shinn-xEmoji :show="showEmoji" @change="emoChange" bottom="56px"></shinn-xEmoji>
    </div>
  </view>
</template>

<style scoped lang="scss">
.bottom-input-border {
  background-color: rgba(255, 255, 255);
  padding: 20px;
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
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
}
</style>
