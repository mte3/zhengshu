<template>
	<view>
		<!-- 没点击编辑显示 -->
		<view v-if="isDone" v-for="item in list" :key="item.id">
			<view class="moduleBox">{{item.name}}</view>
		</view>

		<!-- 点击了编辑显示 -->
		<view v-if="!isDone" v-for="item in list" :key="item.id" class="itemControll">
			<view class="moduleBox elseModule"><input class="addInput" :value='item.name' type="text"></view>
			<view class="elseButton" @click="delModule(item.id)">
				<view class="del"></view>
			</view>
		</view>

		<view v-if="!isDone" class="itemControll">
			<view class="moduleBox elseModule"><input class="addInput" v-model="name" type="text"></view>
			<view @click="add" class="elseButton add">
				+
			</view>
		</view>

		<!-- 编辑/完成 按钮 -->
		<view class="controll" :class="{'done':!isDone} " @click="handelControll">{{isDone?'编辑':'完成'}}</view>
	</view>
</template>

<script>
	import {
		getModuleList,
		addModule,
		deleteModule
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				isDone: true,
				list: [],
				name: ''
			}
		},
		onLoad() {
			this.getModuleListFunc();
		},
		methods: {
			delModule(e){
				console.log(e)
				deleteModule(e).then(res => {
					console.log(res)
				})
				this.getModuleListFunc();
			},
			add() {
				if (this.name) {
					console.log(this.name)
					addModule(this.name).then(res => {
						console.log(res)
					})
				}
			},
			handelControll() {
				this.isDone = !this.isDone;
				if (this.isDone) {
					this.getModuleListFunc();
				}
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
	.itemControll {
		display: flex;
	}

	.moduleBox {
		width: 90%;
		height: 98rpx;
		line-height: 98rpx;
		margin: 10rpx auto;
		background-color: #F6F6F9;
		border-radius: 10rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.elseModule {
		margin: 10rpx 0 0 20rpx;

		.addInput {
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 27rpx;
			font-size: 32rpx;
		}
	}

	.elseButton {
		position: relative;
		margin: 0 28rpx;
		background-color: #F6F6F9;
		width: 98rpx;
		height: 98rpx;
		border-radius: 49rpx;
	}

	.add {
		font-size: 45rpx;
		color: grey;
		text-align: center;
		line-height: 98rpx;
	}

	.del {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 49rpx;
		height: 5rpx;
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
