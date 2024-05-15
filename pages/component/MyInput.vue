<script setup>

const props = defineProps({
  topTitle: {
    type: String
  }
})
const inputStyle = {
  "width": "100%",
  "border-radius": "8px",
  "background": "rgba(229, 229, 229, 1)",
  "display": "flex",
  "height": "50rpx",
  "padding-left": "30rpx"
}
</script>

<template>
  <view style="width: 100%">
    <up-row v-if="topTitle" class="top-title-style">
      {{ topTitle }}
    </up-row>
    <up-row>
      <up-input v-bind="$attrs" :custom-style="inputStyle" font-size="16">
      </up-input>
    </up-row>
  </view>
</template>

<style scoped lang="scss">
.top-title-style {
  height: 40rpx;
  margin-bottom: 10rpx;
  display: flex;
  /** 文本1 */
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 40rpx;
  color: rgba(187, 187, 196, 1);
}

//.input-style {
//  :deep(.el-input__wrapper) {
//    // 如果没有下面这一行样式的话 无法对border进行自定义修改
//    box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
//    border: none; /* 对border进行样式修改 */
//    padding: 0;
//  }
//
//  :deep(.el-input__inner) {
//    width: 100%;
//    height: 80rpx;
//    border-radius: 8px;
//    background: rgba(229, 229, 229, 1);
//    display: flex;
//    padding-left: 30rpx;
//  }
//}

.input-style {
  width: 100%;
  //height: 80rpx;
  border-radius: 10px;
  background: rgba(229, 229, 229, 1);
  display: flex;
  //padding: 0 30rpx 0 30rpx;
}

.input-style-with-suffix {
  :deep(.el-input__wrapper) {
    // 如果没有下面这一行样式的话 无法对border进行自定义修改
    box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
    border: none; /* 对border进行样式修改 */
    padding: 0;
  }

  :deep(.el-input__inner) {
    width: 100%;
    height: 80rpx;
    //border-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: rgba(229, 229, 229, 1);
    display: flex;
    padding-left: 30rpx;
  }
}

.el-input-group__append {
  padding: 0;
}

.my-input-button-style {
  height: 100%;
}

:deep(.el-input__suffix-inner>:first-child) {
  margin: 0;
}

:deep(.el-button) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
