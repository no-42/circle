<template>
	<view class="emoji-container" v-if="show" :style="`bottom:${bottom}`">
		<view class="con">
			<swiper :current="index" class="con" @change="change" :indicator-dots="true">
				<swiper-item v-for="(item, index) in emojiList" :key="index">
					<view class="list-box">
						<view class="list" v-for="(itemc, indexc) in item" :key="indexc" @click="select(itemc)">
							{{ itemc }}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				chunkSize: 60,
				data: [ //表情可以去这里复制https://geekerline.com/emoji/
					"😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰",
					"😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏",
					"😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡",
					"🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶",
					"😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢",
					"🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠",
					"👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
				]
			};
		},
		props: {
			bottom: {
				type: String,
				default: "0rpx",
			},
			show: {
				type: Boolean,
				default: false
			},
		},
		computed: {
			emojiList() {
				let result = [];
				for (let i = 0; i < this.data.length; i += this.chunkSize) {
					let chunk = this.data.slice(i, i + this.chunkSize);
					result.push(chunk);
				}
				return result;
			},
		},
		methods: {
			select(item) {
				this.$emit('change', item);
			},
			change(e) {
				this.index = e.detail.current;
			},
		}
	}
</script>

<style scoped lang="scss">
	.emoji-container {
		z-index: 12;
		position: fixed;
		left: 0rpx;
		width: 100%;
	}

	.con {
		height: 490rpx;
		background: #EDEDED;
		position: relative;
	}

	.list-box {
		display: flex;
		flex-wrap: wrap;
	}

	.list {
		height: 75rpx;
		width: 10%;
		text-align: center;
		line-height: 75rpx;
		font-size: 50rpx;
	}

	.del {
		width: 120rpx;
		height: 75rpx;
		background: #fff;
		position: absolute;
		right: 10rpx;
		bottom: 40rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.del-img {
		width: 60rpx;
	}
</style>