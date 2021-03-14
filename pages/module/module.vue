<template>
	<view>
		<view v-if="isDone" v-for="item in list" :key="item.id">
			<view class="moduleBox">{{item.name}}</view>
		</view> 
		<view v-if="!isDone" v-for="item in list" :key="item.id" class="itemControll">
			<view class="moduleBox elseModule">{{item.name}}</view>
			<view class="elseButton">
				<view class="del"></view>
			</view>
		</view>

		<view class="controll" :class="{'done':!isDone} " @click="handelControll">{{isDone?'编辑':'完成'}}</view>
	</view>
</template>

<script>
	import {
		getModuleList
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				isDone: true,
				list: []
			}
		},
		onLoad() {
			this.getModuleListFunc();
		},
		methods: {
			handelControll() {
				this.isDone = !this.isDone;
			},
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
	.itemControll{
		display: flex;
	}
	.elseModule{
		flex: 8;
	}
	.moduleBox {
		width: 90%;
		height: 98rpx;
		line-height: 98rpx;
		margin: 10rpx auto;
		background-color: #F6F6F9;
		border-radius: 10rpx;
		text-align: center;
	}
	.elseButton{
		flex: 1;
		justify-content: center;
		align-items: center;
		background-color: #F6F6F9;
		width: 98rpx;
		height: 98rpx;
		border-radius: 49rpx;
	}
	.del{
		width: 72rpx;
		height: 2rpx;
		background-color: grey;
	}

	.controll {
		position: absolute;
		bottom: 150rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 150rpx;
		height: 56rpx;
		border-radius: 28rpx;
		background-color: #707070;
		text-align: center;
		color: white;
		line-height: 56rpx;
		font-size: 28rpx;
	}

	.done {
		background-color: #FFD90D;
	}
</style>
