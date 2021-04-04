<template>
	<view class="detail">
		<!-- 图片 -->
		<view class="Picture" @click="Picture">
			<image mode="aspectFit" :src="certificate.picture"></image>
		</view>


		<view class="show" v-if="isDone" v-for="(title,i) in showList[0]" :key='i'>
			<view class="title showItem">
				{{title}}
			</view>
			<view class="value ">{{showList[1][i]}}</view>

		</view>

		<!-- <view v-if="i==0"><input type="text" v-model="name" style="direction: rtl;" placeholder="请输入"></view> -->

		<!-- <view v-if="i>0" class="choice">
			<picker @change="bindPickerChange(i,$event)" :value="choiceIndex[i-1]" :range="choice[i-1]" :range-key="i<3?'name':'' ">
				<view class="picker">
					{{choice[i-1][choiceIndex[i-1]].name?choice[i-1][choiceIndex[i-1]].name:choice[i-1][choiceIndex[i-1]]}}
				</view>
			</picker>
		</view> -->

		<view v-if="!certificate.status" class="reason">
			<textarea class="textarea" type="text" v-model="certificate.reason" maxlength="-1" placeholder="请输入原因......" />
			</view>
			
		<!-- 编辑/完成 按钮 -->
		<view class="controll" :class="{'done':!isDone} " @click="handelControll">{{isDone?'编辑':'完成'}}</view>
	</view>
</template>

<script>
	import {
		getAdminCertificateDetail
	} from '../../../network/apiData.js'
	export default {
		data() {
			return {
				id:null,
				certificate:{},
				isDone:true,
			    showList :[['名称','模块', '级别','奖项','分值','状态',]],
				reason:''
				// showList:[],
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getCertificateDetail(this.id)
			console.log(this.id)
		},
		methods: {
			getCertificateDetail(id){
				getAdminCertificateDetail(id).then(res =>{
					this.certificate = res.data
					this.reason = this.certificate.reason,//
					this.showList.push( [
							this.certificate.name,//
							this.certificate.module.name,//
							this.certificate.level.name,//
							this.certificate.awards,
							this.certificate.fraction,
							this.certificate.status,//
						])
				})
			}
		}
	}
</script>

<style lang="less">
	.Picture {
		position: relative;
		text-align: center;
		width: calc(100%-48rpx);
		height: 420rpx;
		line-height: 420rpx;
		margin: 24rpx;
		background-color: #EDEEF2;
		border: 2rpx dashed #707070;
		border-radius: 12rpx;

	}

	image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 420rpx;
	}

	.show {
		display: flex;
		justify-content: space-between;
		width: calc(100%-48rpx);
		font-size: 28rpx;
		color: grey;
		height: 72rpx;
		line-height: 72rpx;
		margin: 16rpx 24rpx;
		border-bottom: 2rpx solid #EAEBF2;
		
	}

	.title {
		color: #007AFF;
		font-size: 32rpx;
	}

	.controll {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 150rpx;
		height: 56rpx;
		margin: 120rpx 0;
		border-radius: 28rpx;
		background-color: #707070;
		text-align: center;
		color: white;
		line-height: 56rpx;
		font-size: 28rpx;
	}
   .reason{
	width: calc(100%-72rpx);
	height: 320rpx;
	margin: 24rpx;
	padding: 12rpx;
	font-size: 32rpx;
	background-color: #EDEEF2;
}
.textarea{
	width: 100%;
}
	.done {
		background-color: #FFD90D;
	}
</style>
