<script setup>
import Circle from "@/pages/component/Circle.vue";
import MyInput from "@/pages/component/MyInput.vue";
import {ref} from "vue";
import login from "@/api/login.js"
import message from "@/utils/message";

const agreeCheck = ref(false)
const userAccount = ref()
const userPassword = ref()

function agreeCheckFunction(n) {
  console.log(n)
}

function checkLoginFunction() {
  console.log("登录检查", userAccount.value, userPassword.value)
  // uni.switchTab({
  //   url: "/pages/view/home"
  // })
  login.login(userAccount.value, userPassword.value).then(res => {
    message.success("登录成功");
    uni.switchTab({
      url:"/pages/view/home"
    })
    // uni.reLaunch({
    //   url: "/pages/view/mainView"
    // })
  }).catch(err => {
    console.log(err)
    message.error("登录失败: " + err.message);
  })
}

function showFullMessage(messageType) {
  uni.navigateTo({
    url: "/pages/component/FullMessage?messageType=" + messageType
  })
}

function forgotSomething() {
  console.log("忘记密码")
}

function toRegister() {
  uni.navigateTo({
    url: "/pages/view/register/registerFirstStep"
  })
}
</script>

<template>
  <view style="padding: 60rpx 40rpx 30rpx 40rpx">
    <up-row>
      <up-col span="12">
        <button @click="toRegister" class="button-1-style">去注册</button>
      </up-col>
    </up-row>
    <Circle prefix-title="欢迎登录" style="margin-top: 100rpx"></Circle>
    <view style="margin-top: 80rpx">
      <MyInput v-model="userAccount" top-title="账号"></MyInput>
    </view>
    <view style="margin-top: 40rpx;margin-bottom: 80rpx">
      <MyInput v-model="userPassword" type="password" show-password
               top-title="密码"></MyInput>
    </view>
    <up-row class="my-text-style"
            style="margin-bottom:80rpx;font-size: 14px;display: flex;height: 40px;line-height: 40px">
      <up-col span="1">
        <up-checkbox style="margin-right: 20rpx"
                     size="20"
                     usedAlone
                     active-color="rgba(131, 117, 232, 1)"
                     icon-size="16"
                     @change="agreeCheckFunction"></up-checkbox>
      </up-col>
      同意Circle
      <text style="color: rgba(109, 95, 254, 1)" size="12" color="rgba(109, 95, 254, 1)"
               @click="showFullMessage('userAgreement')">
        《用户协议》
      </text>
      <view>
        与
      </view>
      <up-text block text="《隐私条款》" color="rgba(109, 95, 254, 1)"
               @click="showFullMessage('privacyClause')"></up-text>
    </up-row>
    <up-row justify="center" style="margin-bottom: 40rpx">
      <button class="common-button-style" @click="checkLoginFunction()">
        登录
      </button>
    </up-row>
    <up-row justify="center">
      <up-text type="info" @click="forgotSomething()">忘记密码?</up-text>
    </up-row>
  </view>
</template>

<style scoped lang="scss">
.my-text-style {
  :deep(.u-text) {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    //flex: 0;
    width: auto;
  }
}
</style>
