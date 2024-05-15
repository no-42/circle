<script setup>
import {simpleNavigateBack} from "../../../utils/myRouter";
import {ref} from "vue";

const props = defineProps({
  updateId: String,
  type: String,
  navbarTitle: String,
  tip: String
})
// const emits = defineEmits(['saveClick'])
const inputMessage = ref('')
const textAreaMessage = ref('')

function buttonClick() {
  uni.$emit('updateDetailSaveClick', {updateId: props.updateId, msg: props.type === 'input' ? inputMessage.value : textAreaMessage.value})
  simpleNavigateBack()
}
</script>

<template>
  <up-navbar :title="'修改' + navbarTitle"
             :fixed="false"
             bgColor="transparent"
             leftIconColor="white"
             style="background-color: transparent"
             :titleStyle="{
               color:'white'
             }"
             @leftClick="simpleNavigateBack"></up-navbar>
  <view style="padding: 40rpx 60rpx 0 60rpx">
    <up-row>
      <up-text :text="'我的' + navbarTitle" color="white"></up-text>
    </up-row>
    <up-row style="margin-top: 20rpx" class="textarea-class">
      <up-input v-if="type === 'input'" clearable :placeholder="navbarTitle" shape="circle"
                :custom-style="{backgroundColor:'rgba(229, 229, 229, 1)'}"
                v-model="inputMessage"
      ></up-input>
      <view v-if="type === 'textArea'" class="u-textarea">
          <textarea
              class="u-textarea__field"
              :style="[{
                        whiteSpace: 'pre-wrap',
                        minHeight: '200rpx',
                      }]"
              v-model="textAreaMessage"
              :placeholder="navbarTitle"
              maxlength="100"
              auto-height></textarea>
        <text
            class="u-textarea__count"
            :style="{
                'background-color': 'transparent',
            }"
        >{{ textAreaMessage.length }}/100
        </text>
      </view>
    </up-row>
    <up-text :text="tip" color="white" size="10" style="margin-top: 10rpx"></up-text>
  </view>
  <button class="button-yellow" style="position: fixed;margin-left: 60rpx;width: calc(100vw - 120rpx);top: 90%"
          @click="buttonClick()">
    保存
  </button>
</template>

<style scoped lang="scss">
uni-page-body {
  background: linear-gradient(90deg, rgba(134, 132, 238, 1) 0%, rgba(179, 124, 239, 1) 100%)
}

.textarea-class {
  :deep(.u-textarea--radius) {
    border-radius: 15px;
    background-color: rgba(229, 229, 229, 1);
  }
}

.u-textarea {
  border-radius: 15px;
  background: rgba(229, 229, 229, 1);
  position: relative;
  @include flex;
  flex: 1;
  padding: 9px;

  &__field {
    flex: 1;
    font-size: 15px;
    color: $u-content-color;
    width: 100%;
  }

  &__count {
    position: absolute;
    right: 5px;
    bottom: 2px;
    font-size: 12px;
    color: $u-tips-color;
    background-color: #ffffff;
    padding: 1px 4px;
  }
}
</style>
