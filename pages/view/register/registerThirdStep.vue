<script setup lang="ts">
	import { toLogin } from "@/api/api.js"
	import MyInput from "@/pages/component/MyInput.vue"
	import { ref } from "vue";
	import Circle from "@/pages/component/Circle.vue"
	import message from "@/utils/message.js"
	import { register } from "@/api/login.js"
  import {simpleSwitchTab} from "@/utils/myRouter";

	defineProps(['registerType', 'userPhoneOrEmail', 'userName'])
	const userPassword = ref()
	const checkPassword = ref()

	interface registerValue {
		registerType : string,
		userName : string,
		userPhoneOrEmail : string,
		userPassword : string
	}

	function registerMember(registerValue : registerValue) {
		console.log(registerValue)
		register(registerValue.registerType, registerValue.userName, registerValue.userPhoneOrEmail, registerValue.userPassword)
			.then(res => {
				message.success("注册成功")
        simpleSwitchTab("/pages/view/home")
			}).catch(err => {
				message.error("注册失败: " + err.message);
				// console.error(err)
			})
	}
</script>

<template>
	<view style="padding: 60rpx 40rpx 30rpx 40rpx">
		<up-row>
			<button @click="toLogin" class="button-1-style">帮助</button>
		</up-row>
		<up-row class="h1-title-style" style="margin-top: 100rpx;margin-bottom: 20rpx">
			<Circle prefix-title="创建你的" suffix-title="账户"></Circle>
		</up-row>
		<view style="font-size: 20px;font-weight: bold">
			第 3 步，共 3 步
		</view>
		<up-row style="margin-top: 40rpx;">
			<MyInput top-title="用户名" disabled :placeholder="userName"></MyInput>
		</up-row>
		<up-row style="margin-top: 40rpx;">
			<MyInput :top-title="registerType === 'phone'?'手机号':'邮箱'" disabled :placeholder="userPhoneOrEmail">
			</MyInput>
		</up-row>
		<up-row style="margin-top: 40rpx;">
			<MyInput top-title="密码" type="password" clearable password v-model="userPassword"></MyInput>
		</up-row>
		<up-row style="margin-top: 40rpx;">
			<MyInput top-title="确认密码" type="password" clearable password v-model="checkPassword"></MyInput>
		</up-row>
		<up-row style="margin-top: 40rpx;">
			<up-text style="color: black" size="small">
				注册即表示同意
				<up-text type="primary" size="small">服务条款</up-text>
				及
				<up-text type="primary" size="small">隐私政策</up-text>
				,其中包括
				<up-text type="primary" size="small">Cookie 使用条款</up-text>
				。
			</up-text>
		</up-row>
		<button class="common-button-style" style="margin-top: 80rpx"
			@click="registerMember({registerType,userName,userPhoneOrEmail,userPassword})">
			注册
		</button>
	</view>
</template>

<style scoped lang="scss">

</style>
