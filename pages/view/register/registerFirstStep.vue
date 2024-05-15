<script setup>

import MyInput from "@/pages/component/MyInput.vue"
import {ref} from "vue";
import Circle from "@/pages/component/Circle.vue";
import {toLogin} from "@/api/api.js"
import {simpleNavigateTo} from "@/utils/myRouter";

const step = ref(1)
const userName = ref('')
const userPhoneOrEmail = ref('')

function nextStep(userPhoneOrEmail, userName) {
  const registerType = getRegisterType()
  simpleNavigateTo(
      "/pages/view/register/registerSecondStep",
      {
        registerType,
        userPhoneOrEmail,
        userName
      }
  )
}

function getRegisterType() {
  return 'phone'
}
</script>

<template>
  <view style="padding: 60rpx 40rpx 30rpx 40rpx">
    <up-row>
      <button @click="toLogin" class="button-1-style">去登录</button>
    </up-row>
    <Circle prefix-title="创建你的" suffix-title="账户" style="margin-top: 100rpx;margin-bottom: 20rpx"></Circle>
    <view style="font-size: 20px;font-weight: bold">
      第 1 步，共 3 步
    </view>
    <view style="margin-top: 40rpx">
      <MyInput top-title="用户名" v-model="userName"></MyInput>
    </view>
    <view style="margin-top: 40rpx">
      <MyInput top-title="手机号或邮箱地址" v-model="userPhoneOrEmail"></MyInput>
    </view>
    <button class="common-button-style" style="margin-top: 40rpx" @click="nextStep(userName,userPhoneOrEmail)">
      下一步
    </button>
    <up-row justify="center" style="margin-top: 100rpx">
      <view>
        <up-text text="已有帐号了?" size="16"></up-text>
      </view>
      <view>
        <up-text text="登录" size="16" color="rgba(176, 122, 237, 1)" @click="toLogin"></up-text>
      </view>
    </up-row>
  </view>
</template>

<style scoped lang="scss">

</style>
