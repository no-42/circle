<template>
	<view class="window-main-child-style">
		<view style="height: 80%;display: flex;align-items: center;flex-direction: column;justify-content: center;">
			<up-row justify="center">
				<up-col span="12">
					<up-image src="../static/img/drawable-xxxhdpi/appLogo.png" width="280rpx" mode="aspectFit"
						height="260rpx"></up-image>
				</up-col>
			</up-row>
			<up-row justify="center">
				<up-col span="12">
					<up-image src="../static/img/drawable-xxxhdpi/circle.png" mode="aspectFit" width="200rpx"
						height="90rpx"></up-image>
				</up-col>
			</up-row>
		</view>
		<view style="height: 20%;display: flex;align-items: center;flex-direction: column;justify-content: center;">
			<up-row justify="center">
				<up-col span="12">from</up-col>
			</up-row>
			<up-row justify="center">
				<up-col span="12">
					<up-image src="../static/img/drawable-xxxhdpi/logo-black.png" mode="aspectFit" width="200rpx"
						height="60rpx"></up-image>
				</up-col>
			</up-row>
		</view>
	</view>
</template>

<script setup>
	setTimeout(() => {
	  uni.reLaunch({
	    url:"/pages/view/loginAndRegister"
	  })
	},3000)
</script>

<style>
</style>
