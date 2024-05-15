<script setup>
import {
  Certified,
  Heart,
  BreakHeart,
  Warning,
  Shape,
  Copy,
  SearchBlack,
  Popular,
  BreakHeartBlack
} from "/utils/picture.js"
import {computed, ref} from "vue"
import MoreDot from "./moreDot.vue";
import MyRichInput from "../comps/myRichInput.vue";
import {simpleNavigateTo} from "@/utils/myRouter.js"

const props = defineProps({
  dataId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  messageTime: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['sendMessage'])

const moreDotObj1 = [
  {
    prefixIcon: Copy,
    suffixIcon: Shape,
    text: '复制该评论'
  }
]

const moreDotObj2 = [
  {
    prefixIcon: BreakHeartBlack,
    // suffixIcon: '/static/img/drawable-xxxhdpi/Shape.png',
    text: '不感兴趣'
  },
  {
    prefixIcon: Warning,
    suffixIcon: Shape,
    text: '举报',
    textColor: "rgba(255, 69, 69, 1)",
    click: () => {
      console.log("举报")
      showMoreDot.value=false
      simpleNavigateTo(
          "/pages/view/report/report",
          {dataId: props.dataId}
      )
    }
  },
  {
    prefixIcon: SearchBlack,
    suffixIcon: Shape,
    text: '搜索'
  },
  {
    prefixIcon: Popular,
    text: '帮上热门'
  }
]

const showMoreDot = ref(false)
const showReply = ref(false)

function moreDotClick() {
  showMoreDot.value = true
}

function closeDot() {
  showMoreDot.value = false
}

function reply() {
  showReply.value = true
}

function closeReply() {
  showReply.value = false
}

function send(message) {
  console.log(message)
  showReply.value = false
  emit('sendMessage', message)
}

// 获取时间描述
const getDateTime = computed(() => (date, type = "default", zeroFillFlag = true) => {
  date = date * 1000
  // 定义countTime变量，用于存储计算后的数据
  let countTime;
  // 获取当前时间戳
  let time = new Date().getTime();
  // 转换传入参数为时间戳
  let afferentTime = new Date(date).getTime();
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - afferentTime}`);
  if (time < 10000) {
    // 10秒内
    return "刚刚";
  } else if (time < 60000) {
    // 超过10秒少于1分钟内
    countTime = Math.floor(time / 1000);
    return `${countTime}秒前`;
  } else if (time < 3600000) {
    // 超过1分钟少于1小时
    countTime = Math.floor(time / 60000);
    return `${countTime}分钟前`;
  } else if (time < 86400000) {
    // 超过1小时少于24小时
    countTime = Math.floor(time / 3600000);
    return `${countTime}小时前`;
  } else if (time >= 86400000 && type === "default") {
    // 超过二十四小时（一天）且格式参数为默认"default"
    countTime = Math.floor(time / 86400000);
    //大于等于365天
    if (countTime >= 365) {
      return `${Math.floor(countTime / 365)}年前`;
    }
    //大于等于30天
    if (countTime >= 30) {
      return `${Math.floor(countTime / 30)}个月前`;
    }
    return `${countTime}天前`;
  } else {
    // 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
    // 数字补零
    let Y = new Date(date).getFullYear();
    let M = new Date(date).getMonth() + 1;
    let zeroFillM = M > 9 ? M : "0" + M;
    let D = new Date(date).getDate();
    let zeroFillD = D > 9 ? D : "0" + D;
    // 传入格式为"-" "/" "."
    if (type === "-" || type === "/" || type === ".") {
      return zeroFillFlag
          ? Y + type + zeroFillM + type + zeroFillD
          : Y + type + M + type + D;
    }
    // 传入格式为"年月日"
    if (type === "年月日") {
      return zeroFillFlag
          ? Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2]
          : Y + type[0] + M + type[1] + D + type[2];
    }
    // 传入格式为"月日"
    if (type === "月日") {
      return zeroFillFlag
          ? zeroFillM + type[0] + zeroFillD + type[1]
          : M + type[0] + D + type[1]
    }
    // 传入格式为"年"
    if (type === "年") {
      return Y + type
    }
  }
})
</script>

<template>
  <view style="margin: 0 0 20px 0 ">
    <up-row align="top">
      <up-col span="2">
        <view class="circle-border" style="width: 40px">
          <up-image style="box-sizing: border-box"
                    class="bottom-right-item view-item" :src="`/static/img/drawable-xxxhdpi/appLogo.png`"
                    shape="circle" width="40px" height="40px"></up-image>
        </view>
      </up-col>
      <up-col span="9">
        <up-row>
          <up-col span="12">
            <up-row class="simple-gutter">
              <text class="view-item" style="color: rgba(128, 128, 128, 1);font-size: 14px" type="info">
                {{ userName }}
              </text>
              <up-icon class="view-item" :name="Certified"></up-icon>
              <view class="tag-box view-item">
                作者
              </view>
            </up-row>
          </up-col>
        </up-row>
        <up-row>
          <!--          <up-text lines="1" :text="message"></up-text>-->
          <rich-text :nodes="message"></rich-text>
        </up-row>
        <up-row>
          <!--          <up-text :text="messageTime" :format="computed"></up-text>-->
        </up-row>
      </up-col>
      <up-col span="1">
        <up-icon name="more-dot-fill" @click="moreDotClick"></up-icon>
      </up-col>
    </up-row>
    <up-row>
      <up-col span="2">
      </up-col>
      <up-col span="3">
        <text style="font-size: 13px;color: rgba(128, 128, 128, 1)">{{ getDateTime(messageTime, "-", false) }}</text>
      </up-col>
      <up-col span="3">
        <up-text text="回复" @click="reply"></up-text>
      </up-col>
      <up-col span="2">
        <up-icon :name="Heart" label="5222"></up-icon>
      </up-col>
      <up-col span="2">
        <up-icon :name="BreakHeart" label="5222"></up-icon>
      </up-col>
    </up-row>
  </view>
  <up-popup :show="showMoreDot" mode="bottom" round="20" @close="closeDot">
    <view class="dot">
      <moreDot style="margin-bottom: 40rpx" :item-list="moreDotObj1"></moreDot>
      <moreDot :item-list="moreDotObj2"></moreDot>
    </view>
    <!--    <comment :close-chat="closeChat"></comment>-->
  </up-popup>
  <up-popup :show="showReply" mode="bottom" round="20" @close="closeReply">
    <view class="dot">
      <my-rich-input @get-input-message="send"></my-rich-input>
    </view>
  </up-popup>
</template>

<style scoped lang="scss">
.tag-box {
  display: flex;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 10px;
  padding: 1px 7px 1px 7px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(131, 128, 234, 1) 0%, rgba(176, 122, 237, 1) 100%);
}

.simple-gutter * :not(.view-item:last-child) {
  margin-right: 5px;
}

.dot {
  padding: 40rpx 60rpx 40rpx 60rpx;
  //width: 100vw;
  border-top-right-radius: 40rpx;
  border-top-left-radius: 40rpx;
  background: linear-gradient(180deg, rgba(201, 201, 122, 1) 0%, rgba(109, 167, 253, 1) 100%);
  box-shadow: 0dp -5dp 13dp rgba(0, 0, 0, 0.25);
}

.ql-container {
  display: block;
  position: relative;
  box-sizing: border-box;
  -webkit-user-select: text;
  user-select: text;
  outline: none;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: 60rpx;
  border-radius: 20rpx;
  background: rgba(229, 229, 229, 1);
  padding: 5rpx 20vw 0 20rpx;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
}
</style>
