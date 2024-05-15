<script setup>
import MessageChild from "./messageChild.vue";

const messageData = [{},{},{}]
</script>

<template>
  <view style="margin-top: 10rpx">
    <up-list>
      <up-list-item v-for="(item,index) in messageData">
        <message-child></message-child>
      </up-list-item>
    </up-list>
  </view>
</template>

<style scoped lang="scss">

</style>
