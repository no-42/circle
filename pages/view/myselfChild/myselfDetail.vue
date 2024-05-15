<script setup>
import {simpleNavigateBack, simpleNavigateTo} from "../../../utils/myRouter";
import {AppLogo, Shape} from "../../../utils/picture";
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
import {area} from '../../../utils/area.js'

const userNameRef = ref('');
const accountNameRef = ref('');
const introductionRef = ref('');
const {windowWidth, windowHeight} = uni.getSystemInfoSync();
const instance = getCurrentInstance();
const heardPicHeight = ref(238)
const sex = ref('unknown');
const sexPicker = ref(false)
const sexColumns = reactive([
  [
    {
      text: '不展示',
      id: 'unknown'
    },
    {
      text: '男',
      id: 'male'
    },
    {
      text: '女',
      id: 'female'
    }]
])
const birthdayPicker = ref(false)
const birthday = ref(Date.now())
const locationPicker = ref(false)
const locationColumns = ref([['不展示'], [''], ['']])
const location = ref([]);
let provinceCodes = []
let cityCodes = []

for (let provinceCode in area.province_list) {
  locationColumns.value[0].push(area.province_list[provinceCode])
  provinceCodes.push(provinceCode)
}

const uPickerRef = ref(null)

let query = uni.createSelectorQuery().in(instance);
onMounted(() => {
  setTimeout(() => {
    query.select('#heardPic').boundingClientRect(data => {
      console.log(data)
    })
    query.exec()
  }, 1000)
})

function sexFormat(sex) {
  switch (sex) {
    case 'unknown':
      return '不展示'
    case "male":
      return '男'
    case 'female':
      return '女'
  }
}

function timestampFormat(timestamp) {
  let date = new Date(timestamp);
  let Year = date.getFullYear();
  let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  return Year + '-' + Moth + '-' + Day
}

function locationFormat(loca) {
  if (loca[2] && loca[2] !== '') {
    return loca.join("-")
  } else {
    return '不展示'
  }
}

function confirmSex(e) {
  sex.value = e.value[0].id
  sexPicker.value = false
}

function confirmBirthday(e) {
  birthday.value = e.value
  birthdayPicker.value = false
}

function locationColumnsChange(e) {
  const {
    columnIndex,
    value,
    values,
    index,
    indexs,
  } = e;
  if (0 === columnIndex) {
    let provinceCode = provinceCodes[index - 1]
    let cities = ['']
    cityCodes = []
    for (let cityCode in area.city_list) {
      if (Number(cityCode) >= Number(provinceCode) && Number(cityCode) <= Number(provinceCode) + 9900) {
        cities.push(area.city_list[cityCode])
        cityCodes.push(cityCode)
      }
    }
    uPickerRef.value.setColumnValues(1, cities)
    uPickerRef.value.setColumnValues(2, [''])
  } else if (1 === columnIndex) {
    let cityCode = cityCodes[index - 1]
    let counties = ['']
    for (let countyCode in area.county_list) {
      if (Number(countyCode) >= Number(cityCode) && Number(countyCode) <= Number(cityCode) + 99) {
        counties.push(area.county_list[countyCode])
      }
    }
    uPickerRef.value.setColumnValues(2, counties)
  }
}

const locationPickerErrorToast = ref(null)

function locationConfirm(e) {
  if ((e.value[2] && e.value[2] !== '') || e.value[0] === '不展示') {
    location.value = e.value
    locationPicker.value = false
  } else {
    locationPickerErrorToast.value.show({
      type: 'error',
      message: '请选择省市区'
    })
  }
}

function toUpdate(updateId, type, navbarTitle, tip) {
  simpleNavigateTo(
      "/pages/view/myselfChild/updateDetail",
      {
        updateId,
        type,
        navbarTitle,
        tip
      }
  )
}

uni.$on('updateDetailSaveClick', msg => {
  switch (msg.updateId) {
    case 'userName':
      userNameRef.value = msg.msg
      return
    case 'accountName':
      accountNameRef.value = msg.msg
      return;
    case 'introduction':
      introductionRef.value = msg.msg
      return;
  }
})
</script>

<template>
  <up-navbar title="编辑个人资料"
             @leftClick="simpleNavigateBack"></up-navbar>
  <up-row id="heardPic">
    <up-col span="4"></up-col>
    <view class="border-view-style">
      <up-image :src="AppLogo"
                shape="circle"
                mode="aspectFit"
                :width="(windowWidth / 3)"
                :height="(windowWidth / 3)"></up-image>
      <view
          :style="{position: 'absolute',width: (windowWidth / 3) + 'px',marginTop: '-15px',display: 'flex',justifyContent: 'center'}">
        <up-tag text="更改" icon="camera-fill"
                bg-color="rgba(229, 229, 229, 1)" border-color="rgba(175, 122, 237, 1)"
                color="black"
                shape="circle" size="mini"></up-tag>
      </view>
    </view>
  </up-row>
  <view :style="{
    height:(windowHeight - heardPicHeight + (windowWidth / 6)) + 'px',
    width:'100%',
    marginTop: -(windowWidth / 6) + 'px',
    backgroundColor: 'rgba(175, 122, 237, 1)',
    borderTopLeftRadius:'60rpx',
    borderTopRightRadius:'60rpx'
  }">
    <view :style="{paddingTop: (windowWidth / 5) + 'px',
    paddingLeft: '60rpx',
    paddingRight:'60rpx'}">
      <up-row @click="toUpdate('userName','input','用户名','用户名15天可修改4次，2024-04-23前还可修改4次')">
        <up-col span="4">
          <up-text text="用户名" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="userNameRef" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 40rpx"
              @click="toUpdate('accountName','input','Circle号','Circle ID每90天可修改1次，你近期已经修改过，2024-07-30后可修改')">
        <up-col span="4">
          <up-text text="Circle号" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="accountNameRef" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 40rpx" @click="sexPicker=true">
        <up-col span="4">
          <up-text text="性别" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="sexFormat(sex)" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 40rpx" @click="birthdayPicker=true">
        <up-col span="4">
          <up-text text="生日" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="timestampFormat(birthday)" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11" @click="birthdayPicker=true"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 40rpx" @click="locationPicker=true">
        <up-col span="4">
          <up-text text="所在地" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="locationFormat(location)" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11" @click="locationPicker=true"></up-icon>
        </up-col>
      </up-row>
      <up-row style="margin-top: 40rpx"
              @click="toUpdate('introduction','textArea','简介','简介7天可修改3次，2024-04-17前还可修改3次')">
        <up-col span="4">
          <up-text text="简介" color="white" size="16"></up-text>
        </up-col>
        <up-col span="7">
          <up-text :text="introductionRef" color="white" size="16"></up-text>
        </up-col>
        <up-col span="1">
          <up-icon :name="Shape" size="11" @click="locationPicker=true"></up-icon>
        </up-col>
      </up-row>
    </view>
  </view>
  <up-picker :show="sexPicker" :columns="sexColumns" :close-on-click-overlay="true"
             @close="sexPicker=false" @confirm="confirmSex" @cancel="sexPicker=false"></up-picker>
  <up-datetime-picker
      mode="date"
      :show="birthdayPicker"
      @close="birthdayPicker=false"
      @cancel="birthdayPicker=false"
      @confirm="confirmBirthday"
  >
  </up-datetime-picker>
  <up-picker ref="uPickerRef" :show="locationPicker" :columns="locationColumns" :default-index="[0,0,0]"
             @change="locationColumnsChange" @confirm="locationConfirm" @cancel="locationPicker=false"></up-picker>
  <up-toast ref="locationPickerErrorToast"></up-toast>
</template>

<style scoped lang="scss">
.border-view-style {
  margin-top: 200rpx;
  padding: 2px;
  border-radius: 1000px;
  background-color: rgba(175, 122, 237, 1);
}
</style>
