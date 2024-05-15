<script setup>
import {ref} from "vue";

let footerItemList = [
  {
    img: "~@/static/img/drawable-xxxhdpi/unHomeChecked.png",
    active: "~@/static/drawable-xxxhdpi/img/homeChecked.png",
    name: '首页',
    path: '/main/home'
  },
  {
    img: "~@/static/img/drawable-xxxhdpi/unCheckMessage.png",
    active: "~@/static/img/drawable-xxxhdpi/checkMessage.png",
    name: '消息',
    path: '/main/message'
  }, {
    img: "~@/static/img/drawable-xxxhdpi/unCheckSendMessage.png",
    active: "~@/static/img/drawable-xxxhdpi/unCheckSendMessage.png",
    name: '发布',
    path: '/main/sendMessage'
  }, {
    img: "~@/static/img/drawable-xxxhdpi/unCheckMyself.png",
    active: "~@/static/img/drawable-xxxhdpi/checkMyself.png",
    name: '我的',
    path: '/main/myself'
  }]
// let routerPath = ref("/main/home");
const tabbarValue = ref();
// router.replace("/main/home");
// function addClassName(_index, path) {
//   routerPath.value = path
// }
function tabbarChange(){

}
</script>

<template>
  <view class="window-main-child-style" style="z-index: 900">
    <el-main>
<!--      <router-view></router-view>-->
    </el-main>
    <el-footer>
      <up-tabbar :value="tabbarValue" @change="tabbarChange">
        <up-tabbar-item v-for="(i,index) in footerItemList">
          <template #active-icon>
            <el-image :src="footerItemList[index].active"
                      fit="fill"
                      class="footer-item"></el-image>
          </template>
          <template #inactive-icon>
            <el-image :src="footerItemList[index].img"
                      fit="fill"
                      class="footer-item"></el-image>
          </template>
        </up-tabbar-item>
      </up-tabbar>
<!--      <up-row class="footer-item-row">-->
<!--        <up-col class="footer-item-col" :span="6"-->
<!--                v-for="(i,index) in footerItemList"-->
<!--        >-->
<!--          <router-link :to="i.path" @click="addClassName(index,i.path)">-->
<!--            <el-image :src="i.path===routerPath?footerItemList[index].active:footerItemList[index].img"-->
<!--                      fit="fill"-->
<!--                      class="footer-item"></el-image>-->
<!--          </router-link>-->
<!--        </up-col>-->
<!--      </up-row>-->
    </el-footer>
  </view>
</template>

<style scoped lang="scss">
.footer-item {
  left: 8.32rpx;
  top: 9.08rpx;
  width: 55.14rpx;
  height: 55.14rpx;
  opacity: 1;
}

.footer-item-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
