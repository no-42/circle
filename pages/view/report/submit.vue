<script setup>
import {simpleNavigateBack} from "@/utils/myRouter";
import {ref} from "vue";
import {uploadImg} from "../../../api/upload";

defineProps({
  type: String,
  typeText: String
})

const tagColor = ref('white')
const reportReason = ref('');
const reportDescribe = ref('');
const uploadList = ref([])
const chooseDetailTag = () => {
  tagColor.value = tagColor.value === 'white' ? `rgba(255, 235, 59, 1)` : `white`
}

const deletePic = (event) => {
  uploadList.value.splice(event.index, 1);
}

const afterRead = async (event) => {
  let lists = [].concat(event.file);
  let fileListLen = uploadList.value.length;
  lists.map((item) => {
    uploadList.value.push({
      ...item,
      status: 'uploading',
      message: '上传中',
    });
  });
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadImg(lists[i].url,(res)=>{});
    let item = uploadList.value[fileListLen];
    uploadList.value.splice(fileListLen, 1, {
      ...item,
      status: 'success',
      message: '',
      url: result,
    });
    fileListLen++;
  }
}

function submitReport() {
  simpleNavigateBack(2)
}
</script>

<template>
  <up-navbar title="举报帖子"
             :fixed="false"
             bgColor="transparent"
             leftIconColor="white"
             style="background-color: transparent"
             :titleStyle="{
               color:'white'
             }"
             @leftClick="simpleNavigateBack"></up-navbar>
  <view
      style="padding: 20rpx 60rpx 20rpx 60rpx;display: flex;flex-direction: column;justify-content: space-between;height: 90%">
    <view>
      <up-row>
        <up-text :text="`举报理由：` + typeText"
                 color="rgba(229, 229, 229, 1)"
                 margin="0 0 20rpx 20rpx"></up-text>
      </up-row>
      <up-row>
        <textarea :style="{
                        whiteSpace: 'pre-wrap',
                        minHeight: '120rpx',
                        borderRadius: '15px',
                        background: 'rgba(229, 229, 229, 1)',
                        padding: '20rpx'
                      }"
                  :value="reportReason"
                  placeholder="帖子中可能含有展示或隐晦表达淫秽色情、诱惑诱导性交友、渲染低级趣味的内容。"
                  auto-height></textarea>
      </up-row>
      <up-row style="margin-top: 20rpx">
        <up-text text="请选择具体的内容"
                 color="rgba(229, 229, 229, 1)"
                 margin="0 0 20rpx 20rpx"></up-text>
      </up-row>
      <view>
        <up-tag text="111" plain :border-color="tagColor" :color="tagColor" @click="chooseDetailTag"></up-tag>
      </view>
      <up-line color="white" style="margin-top: 40rpx;margin-bottom: 40rpx"></up-line>
      <up-row>
        <up-text text="举报描述（选填）"
                 color="rgba(229, 229, 229, 1)"
                 margin="0 0 20rpx 20rpx"></up-text>
      </up-row>
      <up-row>
        <view class="u-textarea">
          <textarea
              class="u-textarea__field"
              :style="[{
                        whiteSpace: 'pre-wrap',
                        minHeight: '400rpx',
                      }]"
              placeholder="请详细描述你举报该帖子的原因，一旦发现违规我们将对该帖子进行处理。"
              v-model="reportDescribe"
              maxlength="200"
              auto-height></textarea>
          <text
              class="u-textarea__count"
              :style="{
                'background-color':   'transparent'  ,
            }"
          >{{ reportDescribe.length }}/200
          </text>
        </view>
      </up-row>
      <up-row style="margin-top: 20rpx">
        <up-text text="图片材料提交（选填）"
                 color="rgba(229, 229, 229, 1)"
                 margin="0 0 20rpx 20rpx"></up-text>
      </up-row>
      <up-row>
        <up-upload
            class="upload-class"
            :file-list="uploadList"
            @delete="deletePic"
            @afterRead="afterRead"
            multiple
            deletable
            max-count="5"
            :upload-text="uploadList.length + `/5`"
        >
        </up-upload>
      </up-row>
    </view>
    <button class="button-yellow" @click="submitReport">
      提交
    </button>
  </view>
</template>

<style scoped lang="scss">
uni-page-body {
  background: linear-gradient(90deg, rgba(134, 132, 238, 1) 0%, rgba(179, 124, 239, 1) 100%)
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

.upload-class {
  :deep(.u-upload__button){
    border-radius: 20rpx;
  }
}
</style>
