<script setup>
import {ref} from "vue";
import {simpleNavigateTo,simpleNavigateBack} from "@/utils/myRouter.js"

const pros = defineProps({
  dataId: {
    type: String,
    required: true
  }
})

const contentViolation = ref('vulgar');
let chooseType;
const dataList = [
  {
    groupName: "内容违规",
    radioItems: [
      {
        name: "vulgar",
        text: "色情低俗"
      },
      {
        name: "delinquency",
        text: "违法犯罪"
      },
      {
        name: "historicalNihilism",
        text: "历史虚无主义"
      },
      {
        name: "spreadHatred",
        text: "辱骂、引战、宣扬仇恨"
      },
      {
        name: "privateSale",
        text: "引导私下交易"
      },
      {
        name: "inappropriateWords",
        text: "涉证不当言行"
      },
      {
        name: "falseInformation",
        text: "不实信息"
      },
      {
        name: "aIGenerated",
        text: "AI生成内容问题"
      }
    ]
  },
  {
    groupName: "未成年保护",
    radioItems: [
      {
        name: "inappropriateBehaviorOfMinors",
        text: "未成年人不适当行为"
      }
    ]
  },
  {
    groupName: "侵权",
    radioItems: [
      {
        name: "tort",
        text: "侵犯著作、商标、名誉、隐私、专利权"
      },
      {
        name: "plagiarism",
        text: "盗用抄袭作品"
      }
    ]
  },
  {
    groupName: "其他",
    radioItems: [
      {
        name: "other",
        text: "其他"
      }
    ]
  }
]
let chooseObj = dataList[0].radioItems[0];
const chooseReason = (groupIndex, index) => {
  chooseObj = dataList[groupIndex].radioItems[index]
}

const detailMessage = () => {
  simpleNavigateTo(
      "/pages/view/report/submit",
      {
        type: chooseObj.name,
        typeText: chooseObj.text
      }
  )
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
    <up-radio-group
        v-model="contentViolation"
        iconPlacement="right"
        placement="column"
        activeColor="rgba(255, 69, 69, 1)"
    >
      <view v-for="(item,groupIndex) in dataList"
            :class="{'radio-group-class':groupIndex!==0}">
        <up-row>
          <up-text :text="item.groupName"
                   color="rgba(229, 229, 229, 1)"
                   margin="0 0 20rpx 20rpx"></up-text>
        </up-row>
        <view style="background: white;border-radius: 20rpx;padding: 5rpx">
          <up-radio v-for="(obj,index) in item.radioItems"
                    style="padding:10rpx 20rpx 10rpx  20rpx;font-weight: bold"
                    labelSize="14"
                    :label="obj.text"
                    :name="obj.name"
                    @click="chooseReason(groupIndex,index)"></up-radio>
        </view>
      </view>
    </up-radio-group>
    <button class="button-yellow" @click="detailMessage">
      下一步
    </button>
  </view>
</template>

<style scoped lang="scss">
uni-page-body {
  background: linear-gradient(90deg, rgba(134, 132, 238, 1) 0%, rgba(179, 124, 239, 1) 100%)
}

.radio-group-class {
  margin-top: 20rpx;
}


</style>
