<template>
	<view class="detail">
		<!-- 图片 -->
		<view class="Picture" @click="Picture">
			<image mode="aspectFit" :src="certificate.picture"></image>
		</view>


		<view class="show" v-for="(title,i) in showList[0]" :key='i'>
			<view class="title showItem">
				{{title}}
			</view>
			<view v-if="isDone" class="value ">{{i===showList[1].length-1?(showList[1][i]?'通过':'驳回'):showList[1][i]}}</view>


			<view v-if="!isDone&&i===0"><input type="text" v-model="parameter.name" style="direction: rtl;" placeholder="请输入"></view>

			<view v-if="!isDone&&i>0" class="choice">
				<picker @change="bindPickerChange(i,$event)" :value="choiceIndex[i-1]" :range="choice[i-1]" :range-key="i<3?'name':'' ">
					<view class="picker">
						{{choice[i-1][choiceIndex[i-1]].name?choice[i-1][choiceIndex[i-1]].name:choice[i-1][choiceIndex[i-1]]}}
					</view>
				</picker>
			</view>


		</view>


		<view v-if="!parameter.status" class="reason">
			<textarea class="textarea" type="text" v-model="parameter.reason" maxlength="-1" placeholder="请输入原因......" />
			</view>
			
		<!-- 编辑/完成 按钮 -->
		<view class="controll" :class="{'done':!isDone} " @click="handelControll">{{isDone?'编辑':'完成'}}</view>
	</view>
</template>

<script>
	import {
		getAdminCertificateDetail,
		getModuleList,
		updCertificate
	} from '../../../network/apiData.js'
	export default {
		data() {
			return {
				parameter:{},
				id:null,
				certificate:{},
				isDone:true,
			    showList :[['名称','模块', '级别','奖项','分值','状态',]],
				reason:'',
				choiceIndex:null,
				choice:[
					[], //choice模块列表
					[{
						id: 0,
						name: '请选择'
					}, {
						id: 1,
						name: '国家级'
					}, {
						id: 2,
						name: '省级'
					}, {
						id: 3,
						name: '市厅级'
					}, {
						id: 4,
						name: '校级'
					}, {
						id: 5,
						name: '学院级'
					}],//choice级别列表
					[
						'请选择',
						'一等奖',
						'二等奖',
						'三等奖',
						'其他奖项',
						'第一名',
						'二，三名',
						'四至六名',
						'七至十名',
					],//choice奖项列表
					['请选择', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ],//choice分值列表
					['通过', '驳回'], //choice//状态列表	
				],//选择列表
			}
		},
		onLoad(options) {
			this.getModuleListFunc()
			//获取证书详细
			this.id = options.id
			this.getCertificateDetail(this.id)
			console.log(this.id)
				
		},
		methods: {
			//点击选择图片
			Picture(){
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.parameter.picture = res.tempFilePaths[0]
					}
				})
			},
			//获取模块列表
			getModuleListFunc() {
				getModuleList().then(res => {
					this.list = res.data
					this.choice[0]=res.data
				})
			},
			getIndex(list,id){
				return list.findIndex(e => {
					return e.id==id
				})
			},
			//获取证书信息
			getCertificateDetail(id){
				getAdminCertificateDetail(id).then(res =>{
					this.certificate = res.data
					this.reason = this.certificate.reason//
					this.certificate.fraction>15?this.certificate.fraction = 15:''
						//初始化参数
						this.parameter.awards = this.certificate.awards
						this.parameter.file = this.certificate.picture
						this.parameter.fraction = this.certificate.fraction
						this.parameter.id = this.id
						this.parameter.levelId = this.certificate.level.id
						this.parameter.moduleId = this.certificate.module.id 
						this.parameter.name = this.certificate.name
						 this.parameter.picture = this.certificate.picture
						 this.parameter.reason = this.certificate.reason
						 this.parameter.status = this.certificate.status
						 this.parameter.updatePicture = true
						 
						 let moduleIndex = this.getIndex(this.choice[0],this.parameter.moduleId)
						 let levelIndex =  this.getIndex(this.choice[1],this.parameter.levelId)
						 //默认显示的数据
						 this.showList.push( [
						 		this.parameter.name,//
						 		this.choice[0][moduleIndex].name,//
						 		this.choice[1][levelIndex].name,//
						 		this.parameter.awards,
						 		this.parameter.fraction,
						 		this.parameter.status,//
						 	])
						// 奖项的index
						let awardsIndex = this.choice[2].findIndex(e => {
							return e===this.certificate.awards
						})
						// 状态
						 let statusIndex
					 this.certificate.status?statusIndex = 0 : statusIndex = 1
						
						// 选择的index
						this.choiceIndex=[moduleIndex,levelIndex,awardsIndex,this.certificate.fraction,statusIndex]
						console.log(this.choiceIndex)
				})
			},
			//点击完成/编辑按钮
			handelControll(){
				this.showList[1][0] = this.parameter.name
				if(!this.isDone){
					updCertificate(this.parameter).then(res => {
						console.log(res)
					})
				}
				this.isDone = !this.isDone
				console.log(this.parameter)
			},
			//选择器
			bindPickerChange(i, e) {
				console.log(i)
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.choiceIndex[i-1] = e.detail.value*1
				if (i == 1) {
					//模块参数
					this.parameter.moduleId = this.choice[i-1][this.choiceIndex[i-1]].id
					this.showList[1][i] = this.choice[i-1][this.choiceIndex[i-1]].name
					
				} else if (i == 2) {
					//级别参数
					this.parameter.levelId = this.choice[i-1][this.choiceIndex[i-1]].id
					this.showList[1][i] = this.choice[i-1][this.choiceIndex[i-1]].name
					// this.lev = this.level[this.levIndex].id
				} else if (i == 3) {
					//奖项参数
					this.parameter.awards = this.choice[i-1][this.choiceIndex[i-1]]
					this.showList[1][i] = this.choice[i-1][this.choiceIndex[i-1]]
				} else if (i == 4) {
					//分数参数
					this.parameter.fraction = e.detail.value
					this.showList[1][i] = this.choice[i-1][this.choiceIndex[i-1]]
				} else if (i == 5) {
					//状态参数
					if (e.detail.value == 1) {
						this.parameter.status = false
					this.showList[1][i] = false
						
					}else{
						this.parameter.status = true
					this.showList[1][i] = true
					}
				}
				console.log(this.choiceIndex)
			},
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
	input{
		height: 72rpx;
		line-height: 72rpx;
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
