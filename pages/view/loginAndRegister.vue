<script setup>
import Circle from "@/pages/component/Circle.vue";

const otherLogin = [
  {
    logo: "../../static/img/drawable-xxxhdpi/tiktok.png",
    mode: "tiktok"
  },
  {
    logo: "../../static/img/drawable-xxxhdpi/qq.png",
    mode: "qq"
  },
  {
    logo: "../../static/img/drawable-xxxhdpi/weixin.png",
    mode: "weixin"
  },
  {
    logo: "../../static/img/drawable-xxxhdpi/weibo.png",
    mode: "weibo"
  }
]

function otherLoginFunction(mode) {
  console.log(mode)
}

function toRegisterFunction() {
  console.log("注册")
  uni.navigateTo({
    url:"/pages/view/register/registerFirstStep"
  })
}

function toLoginFunction() {
  console.log("登录")
  uni.navigateTo({
    url:"/pages/view/login"
  })
}
</script>

<template>
  <view class="child-view" style="height: 100%">
    <view class="child-view" style="height: 70%;justify-content: center;">
      <up-row justify="center">
        <up-col :span="12">
          <up-image
              src="../../static/img/drawable-xxxhdpi/appLogo.png"
              mode="aspectFit"
              width="280rpx" height="260rpx"></up-image>
        </up-col>
      </up-row>
      <Circle prefix-title="欢迎使用" circle-row-justify="center"></Circle>
    </view>
    <view class="child-view" style="height: 30%;width: 100%">
      <up-row justify="center">
        <button class="login-button-style"
                @click="toLoginFunction"
                style="background: linear-gradient(90deg, rgba(128, 128, 234, 1) 0%, rgba(180, 122, 237, 1) 100%);">
          登录
        </button>
      </up-row>
      <up-row justify="center">
        <button class="login-button-style"
                @click="toRegisterFunction"
                style="background: rgba(2, 224, 210, 1);">
          注册
        </button>
      </up-row>
      <up-row justify="center"
              style="
              width: 240rpx;
              height: 20rpx;
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 0;
              line-height: 20rpx;
              color: rgba(166, 166, 166, 1);
              ">
        或用其他方式一键登录
      </up-row>
      <up-row style="width: 100%" justify="center">
        <up-grid :border="false" col="4">
          <up-grid-item v-for="(item,index) in otherLogin" :key="index" @click="otherLoginFunction(item.mode)">
            <view class="other-login">
              <up-icon :name="item.logo" size="20"></up-icon>
            </view>
          </up-grid-item>
        </up-grid>
      </up-row>
    </view>
  </view>
</template>

<style scoped lang="scss">
.login-button-style {
  width: 480rpx;
  height: 100rpx;
  border-radius: 20rpx;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 100rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
  text-decoration: none;
}

.child-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.other-login {
  width: 120rpx;
  height: 80rpx;
  border-radius: 16px;
  border: 1px solid rgba(242, 242, 242, 1);
  background-color: white;
  display: flex;
  justify-content: center;
  margin: 0 20rpx 0 20rpx;
}
</style>
