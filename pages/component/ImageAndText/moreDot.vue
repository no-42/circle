<script setup lang="ts">
import {defineProps} from 'vue'

interface moreDotItem {
  itemList: itemObj[]
}

interface itemObj {
  prefixIcon: String,
  suffixIcon: String,
  text: String,
  textColor: String,
  click: Function
}

const props = withDefaults(defineProps<moreDotItem>(), {})

</script>

<template>
  <view class="dot-style">
    <up-row class="more-dot-row" @click="itemObj.click?itemObj.click():()=>{}" v-for="(itemObj,index) in itemList">
      <up-col style="display: flex;text-align: center" align="center" justify="center" span="2">
        <up-image mode="scaleToFill" width="40rpx" height="40rpx" :src="itemObj.prefixIcon"></up-image>
      </up-col>
      <up-col align="center" span="8">
        <up-text :text="itemObj.text" size="14" :color="itemObj.textColor ? itemObj.textColor : 'black'"></up-text>
      </up-col>
      <up-col style="display: flex;text-align: center" align="center" justify="center" span="2">
        <up-image mode="scaleToFill" v-if="itemObj.suffixIcon" width="16rpx" height="30rpx"
                  :src="itemObj.suffixIcon"></up-image>
      </up-col>
    </up-row>
  </view>
</template>

<style scoped lang="scss">

.dot-style {
  width: 100%;
  border-radius: 20rpx;
  background: rgba(245, 245, 245, 1);
  box-shadow: 0dp 2dp 4dp rgba(0, 0, 0, 0.25);
}

.more-dot-row {
  height: 90rpx;
  width: 100%;
}
</style>
