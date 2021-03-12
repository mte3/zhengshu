<template>
	<view>
		<view v-for="item in list" :key="item.id">
			<view class="moduleBox">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	import {
		getModuleList
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getModuleListFunc();
		},
		methods: {
			getModuleListFunc() {
				getModuleList().then(res => {
					this.list = res.data
					console.log(this.list)
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.moduleBox {
		width: 90%;
		height: 98rpx;
		margin: 10rpx auto;
		background-color: #F6F6F9;
		border-radius: 10rpx;
		text-align: center;
	}
</style>
