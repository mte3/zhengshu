<template>
	<view>
		<view class="addPicture" @click="addPicture">
			<view v-if="!image" class="icon">+</view>
			<image v-if="image&&image!=''" mode="aspectFit" :src="image"></image>
		</view>
		<view v-for="(item,i) in certificate" :key='i' class="list">

			<view class="title">{{item.title}}</view>
			<view v-if="i==0"><input type="text" v-model="name" style="direction: rtl;" placeholder="请输入"></view>

			<view v-if="i==1">
				<picker @change="bindPickerChange(i,$event)" :value="moduleIndex" :range="list" range-key="name">
					<view class="picker">
						{{list[moduleIndex].name}}
					</view>
				</picker>
			</view>

			<view v-if="i==2">
				<picker @change="bindPickerChange(i,$event)" :value="levIndex" :range="level" range-key="text">
					<view class="picker">
						{{level[levIndex].text}}
					</view>
				</picker>
			</view>

			<view v-if="i==3">
				<picker @change="bindPickerChange(i,$event)" :value="priIndex" :range="prize">
					<view class="picker">
						{{prize[priIndex]}}
					</view>
				</picker>
			</view>

			<view v-if="i==4">
				<picker @change="bindPickerChange(i,$event)" :value="scoIndex" :range="score">
					<view class="picker">
						{{score[scoIndex]}}
					</view>
				</picker>
			</view>

			<view v-if="i==5">
				<picker @change="bindPickerChange(i,$event)" :value="staIndex" :range="state">
					<view class="picker">
						{{state[staIndex]}}
					</view>
				</picker>
			</view>
		</view>
		<view v-if="!sta" class="reason">
			<textarea class="textarea" type="text" v-model="reason" maxlength="-1" placeholder="请输入原因......" />
			</view>
		<!-- 编辑/完成 按钮 -->
		<view class="controll" :class="{'done':!isDone} " @click="handelControll">{{isDone?'编辑':'完成'}}</view>
	</view>
</template>

<script>
	import {
		getModuleList,
		addCertificate
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				isDone: true,
				certificate: [{
						title: '名称',
						text: '请输入'
					},
					{
						title: '模块',
						text: '请选择'
					},
					{
						title: '级别',
						text: '请选择'
					},
					{
						title: '奖项',
						text: '请选择'
					},
					{
						title: '分值',
						text: '请选择'
					},
					{
						title: '状态',
						text: '请选择'
					},
				],

				image: null, //第一个参数
				name: null, //第二个参数 名称
				module: null, //第三个参数 模块
				lev: null, //第四个参数 级别
				pri: null, //第五个参数 奖项
				sco: null, //第六个参数 分值
				sta: true, //第七个参数 状态/默认true 

				moduleIndex: 0,
				levIndex: 0, //级别id
				priIndex: 0,
				scoIndex: 0, //分值
				staIndex: 0, //状态 1通过/2驳回

				list: [],

				moduleList: [], //模块列表
				//级别列表
				level: [{
					id: 0,
					text: '请选择'
				}, {
					id: 1,
					text: '国家级'
				}, {
					id: 2,
					text: '省级'
				}, {
					id: 3,
					text: '市厅级'
				}, {
					id: 4,
					text: '校级'
				}, {
					id: 5,
					text: '学院级'
				}],
				//奖项列表
				prize: [
					'请选择',
					'一等奖',
					'二等奖',
					'三等奖',
					'其他奖项',
					'第一名',
					'二，三名',
					'四至六名',
					'七至十名',
				],
				//分值列表
				score: ['请选择', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ],
				state: ['通过', '驳回'], //状态列表
				reason: ''
			}
		},
		onLoad() {
			this.getModuleListFunc()
		},
		methods: {
			handelControll() {
				if (!this.isDone) {
					let datas = {
					    awards:this.pri,
						fraction: this.sco,
						levelId: this.lev,
						moduleId:this.module, 
						name: this.name, 
						picture:this.image, 
						reason:this.reason,
						status: this.sta,
						图片:this.image}
					addCertificate(datas)
						.then(res => {
							console.log(res)
						})
				}
				
				console.log("图片" + this.image + "===========名称：" + this.name + "============模块：" + this.module + "============级别：" +
					this.lev + "============奖项：" + this.pri + "============分数："+ this.sco +"================原因"+this.reason + "============状态：" + this.sta)
			},

			//调用相机/从本地选择图片
			addPicture() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.image = res.tempFilePaths[0]
						console.log(this.image)
					}
				})
			},
			//获取模块列表
			getModuleListFunc() {
				getModuleList().then(res => {
					this.list = res.data
				})
			},

			//选择器
			bindPickerChange(i, e) {
				if (this.image && this.name && this.module && this.lev && this.pri && this.sco) {
					this.isDone = false
				}
				console.log(i)
				console.log('picker发送选择改变，携带值为', e.detail.value)
				if (i == 1) {
					//模块参数
					this.moduleIndex = e.detail.value
					// this.module = this.list[this.moduleIndex].name
					this.module = this.list[this.moduleIndex].id
				} else if (i == 2) {
					//级别参数
					this.levIndex = e.detail.value
					// this.lev = this.level[this.levIndex].text
					this.lev = this.level[this.levIndex].id
				} else if (i == 3) {
					//奖项参数
					this.priIndex = e.detail.value
					this.pri = this.prize[this.priIndex]
				} else if (i == 4) {
					//分数参数
					this.scoIndex = e.detail.value
					this.sco = e.detail.value
				} else if (i == 5) {
					//状态参数
					this.staIndex = e.detail.value
					if (e.detail.value == 1) {
						this.sta = false
					}else{
						this.sta = true
					}
				}
			},
		}
	}
</script>

<style>
	.addPicture {
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

	.icon {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #707070;
		font-size: 120rpx;
	}

	.list {
		width: calc(100%-48rpx);
		height: 72rpx;
		margin: 16rpx 24rpx;
		border-bottom: 2rpx solid #EAEBF2;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: grey;
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
