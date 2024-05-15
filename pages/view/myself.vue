<script setup>
import {
  ToBottom,
  AppLogo,
  QRcode,
  Certified,
  MCN,
  IP,
  Dynamic,
  Privacy,
  Collection,
  Like,
  Carousel,
  Playback
} from "@/utils/picture";
import UniSegmentedControl
  from "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {simpleNavigateTo} from "@/utils/myRouter";

let current = ref(0);
const segmentedValues = [
  {
    icon: Dynamic,
    active: Dynamic
  },
  {
    icon: Privacy,
    active: Privacy
  },
  {
    icon: Collection,
    active: Collection
  },
  {
    icon: Like,
    active: Like
  }
]

const gridItem = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

function segmentedClickFunction(e) {
  current.value = e.currentIndex
}

function setDetail() {
  simpleNavigateTo(
      "/pages/view/myselfChild/myselfDetail"
  )
}

function updateSetting() {
  simpleNavigateTo(
      "/pages/view/setting/setting"
  )
}

const showViewHeight = ref(0)
const instance = getCurrentInstance();
const {windowWidth, windowHeight} = uni.getSystemInfoSync();
onMounted(() => {
  let query = uni.createSelectorQuery().in(instance);
  let topViewHeight, changeViewHeight;
  setTimeout(() => {
    query.select('#topView').boundingClientRect(data => {
      topViewHeight = data.height
    })
    query.exec()
    query.select('#changeView').boundingClientRect(data => {
      changeViewHeight = data.height
    })
    query.exec()
    showViewHeight.value = windowHeight - changeViewHeight - topViewHeight
  }, 1000)
})
</script>

<template>
  <view>
    <view id="topView">
      <view style="display: flex;flex-direction: row;justify-content: space-between;" class="top-item">
        <view>
          <up-text text="Circle" size="30px" :suffix-icon="ToBottom" icon-style="width: 30rpx;height:30rpx" ></up-text>
        </view>
        <up-row gutter="20">
          <up-col span="6">
            <up-icon name="scan" size="30"></up-icon>
          </up-col>
          <up-col span="6">
            <up-icon name="setting" size="30" @click="updateSetting"></up-icon>
          </up-col>
        </up-row>
      </view>
      <up-row class="top-item">
        <view style="padding: 1px;border-radius: 50px;background-color: rgba(229, 229, 229, 1)">
          <up-image bg-color="rgba(229, 229, 229, 1)" :src="AppLogo" shape="circle"
                    mode="aspectFit" width="80" height="80" radius="50px"></up-image>
        </view>
        <view style="margin-left: 20rpx">
          <up-text text="Circle" size="26" :suffix-icon="QRcode" class="text-style"
                   icon-style="margin-bottom:5px"></up-text>
          <up-icon :name="Certified" label="Circle 官方账号" label-size="right" size="20"></up-icon>
        </view>
      </up-row>
      <view class="top-item" style="display: flex;flex-wrap: wrap;">
        <up-text text="帖子 6" bold></up-text>
        <up-text text="帖子 999w" bold></up-text>
        <up-text text="关注 1626" bold></up-text>
      </view>
      <up-row class="top-item">
        <up-icon :name="MCN" label="原子跳动" label-size="right" size="16"></up-icon>
      </up-row>
      <up-row class="top-item">
        <up-text text="简介"></up-text>
      </up-row>
      <up-row class="top-item">
        <up-tag id="ip"
                text="ip: 111"
                bg-color="rgba(166, 166, 166, 0.34)"
                border-color="rgba(166, 166, 166, 0.34)"
                color="black"
                :icon="IP"
                size="12"
                type="mini"
        ></up-tag>
      </up-row>
      <up-row class="top-item">
        <up-col span="6">
          <view style="padding-right: 4rpx">
            <up-button text="编辑主页" color="rgba(229, 229, 229, 1)"
                       :custom-style="{color:'black',fontWeight:'bold',borderRadius:'20rpx'}"
                       @click="setDetail"></up-button>
          </view>
        </up-col>
        <up-col span="6">
          <view style="padding-left: 4rpx">
            <up-button text="分享主页" color="rgba(229, 229, 229, 1)"
                       :custom-style="{color:'black',fontWeight:'bold',borderRadius:'20rpx'}"></up-button>
          </view>
        </up-col>
      </up-row>
    </view>
    <up-row id="changeView">
      <uni-segmented-control class="segmented-style"
                             :current="current"
                             :values="segmentedValues"
                             style-type="icon"
                             in-active-color="rgba(128, 128, 128, 1)"
                             active-color="rgba(0, 0, 0, 1)"
                             border-active-color="linear-gradient(to right, rgba(133, 132, 238, 1), rgba(181, 124, 239, 1)) 1"
                             @click-item="segmentedClickFunction"
      ></uni-segmented-control>
    </up-row>
    <scroll-view
        :style="{
          height: showViewHeight + 'px'
        }"
        scroll-y>
      <up-grid align="center">
        <up-grid-item v-for="(item,index) in gridItem">
          <view :style="{width: (windowWidth / 3) + 'px',
                       height:(windowWidth / 3) + 'px',
                      backgroundColor: 'orange',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}">
            <up-image mode="aspectFit" :width="(windowWidth / 3) - 5"
                      :height="(windowWidth / 3) - 5"></up-image>
            <up-icon style="position: absolute;margin-top: -95px;margin-left: 95px;" :name="Carousel"></up-icon>
            <up-text style="position: absolute;margin-left: 20px;margin-top: 95px" size="12" text="12.3亿" color="white"
                     :prefix-icon="Playback"></up-text>
          </view>
        </up-grid-item>
      </up-grid>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.text-style {
  display: flex;
  align-items: flex-end;
}

.segmented-style {
  width: 100%;
}

.top-item {
  margin: 10rpx 60rpx 10rpx 60rpx;
}
</style>
