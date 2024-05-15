<script setup>
import {ref} from "vue";
import {toLogin} from "@/api/api.js"

const verificationCode = ref()
defineProps(['registerType', 'userPhoneOrEmail', 'userName'])

function nextStep(registerType, userName, userPhoneOrEmail) {
  uni.navigateTo({
    url: `/pages/view/register/registerThirdStep?userPhoneOrEmail=${userPhoneOrEmail}&userName=${userName}&registerType=${registerType}`
  })
}

function retrieveCodeAgain() {
  console.log("重新获取验证码")
}
</script>

<template>
  <view style="padding: 60rpx 40rpx 30rpx 40rpx">
    <up-row>
      <button @click="toLogin" class="button-1-style">帮助</button>
    </up-row>
    <up-row class="h1-title-style" style="margin-top: 100rpx;margin-bottom: 20rpx">
      {{ registerType === 'phone' ? '手机号码' : '邮箱' }}验证
    </up-row>
    <view style="font-size: 20px;font-weight: bold">
      第 2 步，共 3 步
    </view>
    <up-row class="h1-title-style" style="margin-top: 20rpx">
      <up-text size="26" bold text="我们向你发送了一个验证码"></up-text>
    </up-row>
    <up-row>
      <up-text size="16" bold :text="'在下面输入验证'+ userPhoneOrEmail"></up-text>
    </up-row>
    <up-row style="margin-top: 40rpx;display: flex;">
      <u-code-input :maxlength="6"
                    v-model="verificationCode"
                    size="50"
                    :focus="true"
                    bold
                    borderColor="rgba(132, 128, 234, 1)"
                    @finish="nextStep(registerType,userName,userPhoneOrEmail)"></u-code-input>
    </up-row>
    <up-row style="display: flex;justify-content: center;margin-top: 100rpx">
      <up-text @click="retrieveCodeAgain">重新获取验证码</up-text>
    </up-row>
  </view>
</template>

<style scoped lang="scss">
:deep(.u-code-input__item) {
  border-radius: 10px;
  border: rgba(132, 128, 234, 1);
}

:deep(.u-code-input) {
  height: 100rpx;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;
}
</style>
