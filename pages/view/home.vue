<script setup>
import {ref, getCurrentInstance, onMounted} from "vue";
import UniSegmentedControl
  from "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue";
import MessageView from "@/pages/component/message/messageView.vue";
import ImageAndText from "@/pages/component/ImageAndText/ImageAndText.vue";

let searchValue = ref();

function searchButtonFunction() {
  console.log(searchValue.value)
}

const homeSearchStyle = {
  "width": "350rpx",
  "height": "50rpx",
  "border-radius": "40rpx",
  "background": "rgba(237, 237, 237, 1)",
  "border": "2rpx solid rgba(255, 224, 31, 1)",
  "padding-left": "30rpx",
  "margin-right": "-80rpx"
}
let current = ref(1);
function segmentedClickFunction(e) {
  console.log(clientHeight)
  current.value = e.currentIndex
}
const segmentedValues = ['关注', '推荐', '图文', '同城']

let clientHeight = ref("180rpx");
const instance = getCurrentInstance();
onMounted(() => {
  let query = uni.createSelectorQuery().in(instance);
  query.select('#top').boundingClientRect(data => {
    clientHeight = data.height + "px"
  })
  query.exec()
})
</script>

<template>
  <view :style="{position: current === 2 ? 'relative' : 'static'}">
    <div id="top"
         class="top-view"
         :style="{
            position:'fixed',
            padding:'0 60rpx 0 60rpx',
            width: '100vw',
            backgroundColor: current === 2 ? 'transparent' : 'white',
            zIndex:10000
          }">
      <view class="my_status_bar">
        <!-- 这里是状态栏 -->
      </view>
      <up-row justify="space-between">
        <up-col span="3" justify="start" style="display: flex;flex-direction: column;justify-content: center;">
          <up-image :src="`/static/img/drawable-xxxhdpi/circle.png`" mode="aspectFit" width="160rpx" height="80rpx"/>
        </up-col>
        <up-col span="7" justify="end">
          <up-input v-model="searchValue" :custom-style="homeSearchStyle" class="home-search-class" placeholder="搜索"
                    max="10">
            <template #suffix>
              <up-image :src="`/static/img/drawable-xxxhdpi/searchButton.png`" mode="aspectFit" fit="fill" width="40rpx"
                        height="40rpx" @click="searchButtonFunction"></up-image>
            </template>
          </up-input>
        </up-col>
        <up-col span="1">

        </up-col>
      </up-row>
      <up-row>
        <uni-segmented-control class="segmented-style" :current="current"
                               :values="segmentedValues"
                               style-type="text" in-active-color="rgba(128, 128, 128, 1)"
                               active-color="rgba(0, 0, 0, 1)"
                               border-active-color="linear-gradient(to right, rgba(133, 132, 238, 1), rgba(181, 124, 239, 1)) 1"
                               @click-item="segmentedClickFunction"
        ></uni-segmented-control>
      </up-row>
    </div>
    <view :style="{height: current === 2 ? 0: clientHeight}"></view>
    <view v-if="current === 0">
      <MessageView></MessageView>
    </view>
    <view v-if="current === 1">
      <MessageView></MessageView>
    </view>
    <view style="position: absolute;height: 100vh;width: 100vw;z-index: 50"
          v-if="current === 2">
      <image-and-text></image-and-text>
    </view>
    <view style="height: 100rpx" v-if="current === 3">
      <text></text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.segmented-style {
  :deep(.segmented-control__item) {
    margin-right: 60rpx;
  }
}
</style>
