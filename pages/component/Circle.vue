<script setup>
const props = defineProps({
  circleRowJustify: {
    type: String,
    default: function () {
      return 'start'
    }
  },
  prefixTitle: {
    type: String,
    default: function () {
      return ''
    }
  },
  suffixTitle: {
    type: String,
    default: function () {
      return ''
    }
  }
})
</script>

<template>
  <up-row :justify="circleRowJustify" class="h1-title-style">
    {{ prefixTitle }}
    <up-image :src="`/static/img/drawable-xxxhdpi/circle.png`" mode="aspectFit" width="200rpx" height="90rpx" style="margin: 0 20rpx 0 20rpx"></up-image>
    {{ suffixTitle }}
  </up-row>
</template>

<style scoped lang="scss">


</style>
