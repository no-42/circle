<script setup>
import {ref, onMounted} from "vue";
import Comment from "./comment.vue";

const testList = ["/static/img/MessageChildDemo.png", "/static/img/MessageChildDemo.png", "/static/img/MessageChildDemo.png"]
const current = ref(0)
const indicatorWidth = ref(50)
const showChat = ref(false)
const bottomRightIconList = [
  {
    icon: "/static/img/drawable-xxxhdpi/redHeart.png",
    label: "3.2w",
    click: function () {
      console.log("redHeart")
    }
  },
  {
    icon: "/static/img/drawable-xxxhdpi/chat.png",
    label: "4444",
    click: function () {
      console.log("chat")
      showChat.value = true
      uni.hideTabBar({})
    }
  },
  {
    icon: "/static/img/drawable-xxxhdpi/share.png",
    label: "1111",
    click: function () {
      console.log("share")
    }
  }
]

function getChat() {
  console.log('获取数据')
}

function closeChat() {
  showChat.value = false
}

onMounted(() => {
  const info = uni.getSystemInfoSync()
  const innerWidth = info.screenWidth;
  indicatorWidth.value = Math.floor(innerWidth / testList.length) - 5
})

function doFunction() {
  console.log("点击")
}
</script>
<template>
  <view style="height: 100%;position: relative;display: flex;flex-direction: column-reverse;">
    <view style="position: absolute;width: 100vw">
      <up-swiper
          :list="testList"
          indicator
          indicatorMode="line"
          height="100vh"
          :autoplay="true"
          @change="e => current = e.current"
          circular>
        <template #indicator>
          <view
              class="indicator"
          >
            <view
                :style="[{width: indicatorWidth + 'px'}]"
                class="indicator__dot"
                v-for="(item, index) in testList"
                :key="index"
                :class="[index === current && 'indicator__dot--active']"
            >
            </view>
          </view>
        </template>
      </up-swiper>
    </view>
    <view class="bottom-text-view">
      <up-row class="view-item">
        <up-text :iconStyle="[{color:'white',margin:'3px',fontSize:'18px',width:'20px',height:'20px'}]" color="white"
                 prefix-icon="@"
                 text="Circle"
                 size="18px"
                 :suffix-icon="`/static/img/drawable-xxxhdpi/CertifiedYellow.png`"
        ></up-text>
      </up-row>
      <up-row>
        <up-text lines="3"
                 text="Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit.
                 Fringilla ac a eu cras.
                  Et augue amet id"
                 color="white"
                 class="view-item"
        ></up-text>
      </up-row>
      <up-row style="margin-top: 20px" class="view-item">
        <up-col span="1">
          <up-image :src="`/static/img/drawable-xxxhdpi/music.png`" width="20" height="20"/>
        </up-col>
        <up-col span="11">
          <up-text text="eyes blue like the atlantic" color="white"></up-text>
        </up-col>
      </up-row>
    </view>
    <view class="bottom-right-style">
      <div class="circle-border">
        <up-image style="box-sizing: border-box"
                  class="bottom-right-item view-item" :src="`/static/img/drawable-xxxhdpi/appLogo.png`"
                  shape="circle" width="40px" height="40px" @click="doFunction"></up-image>
      </div>
      <up-icon v-for="(item,index) in bottomRightIconList"
               class="bottom-right-item view-item"
               imgMode="aspectFit"
               size="36px"
               label="32w"
               label-pos="bottom"
               label-color="white"
               :name="item.icon"
               style="margin-right: 5px"
               @click="item.click"
      >

      </up-icon>
      <div class="music-circle-border bottom-right-item">
        <up-image style="box-sizing: border-box"
                  class="bottom-right-item view-item" :src="`/static/img/drawable-xxxhdpi/appLogo.png`"
                  shape="circle" width="40px" height="40px" @click="doFunction"></up-image>
      </div>
    </view>
  </view>
  <up-popup :show="showChat" mode="bottom" round="20" @open="getChat" @close="closeChat">
    <comment :close-chat="closeChat"></comment>
  </up-popup>
</template>

<style scoped lang="scss">
.my-up-swiper {
  :deep(.u-swiper-indicator__wrapper--line) {
    margin-bottom: 100rpx;
  }
}

.indicator {
  @include flex(row);
  justify-content: center;
  margin-bottom: 50px;

  &__dot {
    height: 5px;
    //width: 50px;
    //border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.35);
    //margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #ffffff;
    }
  }

  &__dot:first-child {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  &__dot:last-child {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
}

.music-circle-border {
  padding: 8px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.13);
}

.view-item {
  pointer-events: all
}

.bottom-text-view {
  pointer-events: none;
  position: absolute;
  width: 80vw;
  height: 30vh;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px
}

.bottom-right-style {
  pointer-events: none;
  position: absolute;
  width: 95vw;
  height: 80vh;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  align-items: flex-end;
}

.bottom-right-style *:not(.bottom-right-item:last-child) {
  margin-bottom: 40px;
}
</style>
