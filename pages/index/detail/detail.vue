<template>
	<view class="fatherBox">
		<view style="margin-bottom: 20rpx;">
			<image :src="obj.picture" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="flex-box">
			<view class="leftBox">项目名称</view>
			<view class="rightBox">{{obj.name}}</view>
		</view>
		<view class="flex-box">
			<view class="leftBox">加分模块</view>
			<view class="rightBox">{{obj.name}}</view>
		</view>
		<view class="flex-box">
			<view class="leftBox">级别</view>
			<view class="rightBox">{{obj.awards}}</view>
		</view>
		<view class="flex-box">
			<view class="leftBox">奖项</view>
			<view class="rightBox">{{obj.name}}</view>
		</view>
		<view class="flex-box">
			<view class="leftBox">分值</view>
			<view class="rightBox">{{obj.fraction}}</view>
		</view>
		<view class="flex-box">
			<view class="leftBox">状态</view>
			<view class="rightBox" v-if="obj.status==0">驳回</view>
			<view class="rightBox" v-if="obj.status==1">通过</view>
		</view>
		<view v-if="obj.status==0" class="reasonBox">
			{{obj.reason}}
		</view>
	</view>
</template>

<script>
	import {
		getCertificateDetail
	} from '../../../network/apiData.js'
	export default {
		data() {
			return {
				id: '',
				obj: {}
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log(this.id)
			this.getCertificateDetailFunc(this.id)
		},
		methods: {
			getCertificateDetailFunc(id) {
				getCertificateDetail(id).then(res => {
					this.obj = res.data
					console.log(this.obj)
				})
			}
		}
	}
</script>

<style>
	.fatherBox {
		margin: 20rpx 30rpx 0 30rpx;
	}

	.flex-box {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #EAEBF2;
	}

	.leftBox {
		color: #0052A5;
	}

	.rightBox {
		color: #000000;
		font-size: 28rpx;
	}
	.reasonBox{
		min-height: 280rpx;
		padding: 20rpx;
		background-color: #F6F6F9;
		font-size: 28rpx;
	}
</style>
