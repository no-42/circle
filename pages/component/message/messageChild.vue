<script setup>
defineProps({
  image: String,
  message: String,
  dateTime: String
})
</script>

<template>
  <view>
    <view style="width: 100%;padding: 0 20rpx 0 20rpx">
      <up-row>
        <up-col span="11" style="display: flex">
          <up-image :src="`/static/img/drawable-xxxhdpi/checkMyself.png`" width="80rpx" height="80rpx"
                    mode="aspectFit"></up-image>
          <up-text text="circle" size="20" margin="20rpx" :suffix-icon="`/static/img/drawable-xxxhdpi/Certified.png`">
          </up-text>
        </up-col>
        <up-col span="1">
          <up-icon name="more-dot-fill"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 20rpx">
        <up-text text="Always party always win." size="18"></up-text>
      </up-row>
      <up-row style="margin-top: 20rpx">
        <up-text type="info" mode="date" text="1612959739"/>
      </up-row>
    </view>
    <up-row>
      <up-col span="12">
        <up-lazy-load width="100%" height="auto" img-mode="widthFix" :image="`/static/img/MessageChildDemo.png`"></up-lazy-load>
      </up-col>
    </up-row>
    <up-row justify="between" style="padding: 10rpx 20rpx 30rpx 20rpx">
      <view>
        <up-icon name="star" size="40"></up-icon>
      </view>
      <view style="display: inherit;gap: 20px;">
        <up-icon name="share" size="40"></up-icon>
        <up-icon name="chat" size="40"></up-icon>
        <up-icon name="heart" size="40"></up-icon>
      </view>
    </up-row>
  </view>
</template>

<style scoped lang="scss">

</style>
