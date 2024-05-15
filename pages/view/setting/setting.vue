<script setup>

import {simpleNavigateBack} from "../../../utils/myRouter";
import MoreDot from "../../component/ImageAndText/moreDot.vue";
import {
  AccountManagement,
  Shape,
  PrivacyBlack,
  Gear,
  Bell,
  Earth,
  Letter,
  PlaySettings,
  HalfMonth,
  Broom,
  Pen,
  Rule,
  Protocol,
  EncryptFiles,
  About,
  ChangeAccount,
  LogOut
} from "@/utils/picture.js"

const settingObjs = [
  {
    text: "账号",
    dotList: [
      {
        text: '账号与安全',
        prefixIcon: AccountManagement,
        suffixIcon: Shape
      },
      {
        text: '隐私设置',
        prefixIcon: PrivacyBlack,
        suffixIcon: Shape
      }
    ]
  },
  {
    text: "通用",
    dotList: [
      {
        text: '通用设置',
        suffixIcon: Shape,
        prefixIcon: Gear
      },
      {
        text: '通知设置',
        suffixIcon: Shape,
        prefixIcon: Bell
      },
      {
        text: '语言',
        suffixIcon: Shape,
        prefixIcon: Earth
      },
      {
        text: '字体大小',
        suffixIcon: Shape,
        prefixIcon: Letter
      },
      {
        text: '深色模式',
        suffixIcon: Shape,
        prefixIcon: HalfMonth
      },
      {
        text: '播放设置',
        suffixIcon: Shape,
        prefixIcon: PlaySettings
      },
      {
        text: '清理缓存',
        suffixIcon: Shape,
        prefixIcon: Broom
      }
    ]
  },
  {
    text: '关于',
    dotList: [
      {
        text: '反馈与帮助',
        suffixIcon: Shape,
        prefixIcon: Pen
      },
      {
        text: 'Circle 规则中心',
        suffixIcon: Shape,
        prefixIcon: Rule
      },
      {
        text: '用户协议',
        suffixIcon: Shape,
        prefixIcon: Protocol
      },
      {
        text: '隐私政策',
        suffixIcon: Shape,
        prefixIcon: EncryptFiles
      },
      {
        text: '关于 Circle',
        suffixIcon: Shape,
        prefixIcon: About
      }
    ]
  },
  {
    dotList: [
      {
        text: '切换账号',
        suffixIcon: Shape,
        prefixIcon: ChangeAccount
      },
      {
        text: '退出登录',
        suffixIcon: Shape,
        prefixIcon: LogOut
      }
    ]
  }
]
</script>

<template>
  <up-navbar title="设置"
             :fixed="false"
             @leftClick="simpleNavigateBack"></up-navbar>
  <view style="padding: 0 50rpx 20rpx 50rpx">
    <view v-for="(item,index) in settingObjs">
      <up-row style="margin-left:20rpx;margin-bottom:10rpx;margin-top:20rpx">
        <up-text v-if="item.text" :text="item.text" type="info"></up-text>
      </up-row>
      <view class="dot">
        <up-row>
          <more-dot :item-list="item.dotList"></more-dot>
        </up-row>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.dot {
  border-radius: 20rpx;
  background: rgba(245, 245, 245, 1);
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.25);
}
</style>
