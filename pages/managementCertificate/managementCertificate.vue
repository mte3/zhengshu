<template>
	<view>
		<view class="headBox">
			<view class="leftBox" @click="pushLogin">
				<image src="../../static/image/mine.png" mode="widthFix"></image>
			</view>
			<view class="middleBox">
				<image src="../../static/image/search.png" mode="widthFix"></image>
				<input type="text" placeholder="输入你想要搜索的证书名" @blur="searchBlur">
			</view>
			<view class="rightBox" @click="selectClick">
				<image src="../../static/image/shaixuan.png" mode="widthFix"></image>
			</view>
		</view>
		<div class="tabCtrl">
			<div @click="handelTab('T')" :class="[status?'Selected':'']" class="tabItem">通过</div>
			<div @click="handelTab('F')" :class="[!status?'Selected':'']" class="tabItem">驳回</div>
		</div>
		<view class="contentBox">
			<view class="contentItem" v-for="(item,index) in list" :key="index" @touchstart="touchStart" @touchend="touchEnd">
				<view style="position: relative;">
					<image :src="item.picture" mode="widthFix" class="img"/>
					<view v-if="isDelete" class="deleteBox">删除</view>
				</view>
				<view class="text">{{item.name}}</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		glCertificate,
		getManagerSearch,
		getSelect,
		getLoginZengShuList
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				status: true,
				list: [],
				searchValue: '', //搜索框内容
				isSelectBoxShow: false, //筛选是否展开 
				selectList: [{
					id: 1,
					name: '审核状态',
					list: [{
						id: 1,
						title: '驳回',
						status: false
					}, {
						id: 2,
						title: '通过',
						status: true
					}]
				}, {
					id: 2,
					name: '加分模块',
					list: [{
						id: 1,
						title: '思想政治'
					}, {
						id: 2,
						title: '技术技能'
					}, {
						id: 3,
						title: '身心健康'
					}, {
						id: 4,
						title: '创新创业'
					}, {
						id: 5,
						title: '人文艺术'
					}, {
						id: 6,
						title: '志愿服务'
					}, ]
				}],
				selectLeftId: 1,
				selectRightId: 1,
				selectValueshzt: '', //选择框右边选择的内容
				selectValuejfmk: '', //选择框右边选择的内容
				list: [], //列表数组
				startPosition: 0, //手指刚触碰的位置
				endPosition: 0, //手指离开屏幕的位置
				isDelete: false, //监听手势滑动
			}
		},
		onLoad() {
			//证书列表加载请求
			getLoginZengShuList(true).then(res => {
				this.list = res.data
				console.log(this.list)
			})
		},
		methods: {

			//监听手指按下
			touchStart(e) {
				this.startPosition = e.changedTouches[0].clientX
				// console.log(e)
				console.log(this.startPosition)
			},
			//监听手指抬起
			touchEnd(e) {
				this.endPosition = e.changedTouches[0].clientX
				if (this.startPosition - this.endPosition - 60 > 0) {
					this.isDelete = true;
					console.log(this.isDelete)
				} else if (this.endPosition - this.startPosition - 60 > 0) {
					this.isDelete = false;
				}
				console.log(this.endPosition)
			},
			handelTab(e) {
				e === 'T' ? this.status = true : this.status = false
				if (e == 'T') {
					this.status = true;
					getLoginZengShuList(true).then(res => {
						this.list = res.data;
						console.log(this.list)
					})
				} else {
					this.status = false;
					getLoginZengShuList(false).then(res => {
						this.list = res.data
						console.log(this.list)
					})
				}
				console.log(this.status)
			},
			//跳转到登录界面 √
			pushLogin() {
				if (this.isLogin === true) {} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			//筛选框右边盒子点击事件
			selectRightshenhe(item) {
				this.selectRightId = item.id;
				this.selectValueshzt = item.status;
				this.isSelectBoxShow = false
				console.log(this.selectValueshzt)
			},
			//筛选框左边盒子点击事件
			selectItem(id) {
				this.selectLeftId = id
				console.log(id)
			},
			//点击筛选按钮 √
			selectClick() {
				this.isSelectBoxShow = !this.isSelectBoxShow;
			},
			//跳转到证书详情页
			pushDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: `./detail/detail?id=${id}`
				})
			},
			//监听搜索框失去焦点触发 √
			searchBlur(e) {
				this.searchValue = e.detail.value;
				this.getManagerSearchFunc(this.searchValue)
				console.log(this.searchValue)
			},
			//搜索请求
			getManagerSearchFunc(name) {
				getManagerSearch(name).then(res => {
					this.list = res.data
					console.log(res)
					console.log(this.list)
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.tabCtrl {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-top: 88rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #999999;
		padding: 18rpx;

		div {
			width: 95rpx;
			line-height: 68rpx;
			text-align: center;
			font-size: 32rpx;
		}

		.Selected {
			color: #000000;
			border-bottom: 8rpx solid #FCD001;
		}
	}

	.headBox {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		align-items: center;
		display: flex;
		justify-content: space-around;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #FFFFFF;

		.leftBox {
			width: 10%;
			height: 56rpx;
			text-align: center;

			image {
				width: 56rpx;

			}
		}

		.middleBox {
			width: 70%;
			height: 56rpx;
			font-size: 24rpx;
			color: #90939C;
			background-color: #EAEBF2;
			border-radius: 34rpx;
			line-height: 56rpx;
			align-items: center;
			display: flex;

			image {
				margin-left: 24rpx;
				margin-right: 15rpx;
				width: 24rpx;
			}
		}

		.rightBox {
			width: 10%;
			text-align: center;
			height: 56rpx;

			image {
				width: 56rpx;
			}
		}
	}

	.contentBox {
		.contentItem {
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 30rpx;

			.img {
				width: 100%;
			}

			.text {
				margin: 10rpx 0;
			}

			.deleteBox {
				position: absolute;
				z-index: 999;
				top: 0;
				right: 0;
				bottom: 0;
				width: 50rpx;

				background-color: black;
				text-align: center;
				line-height: 50rpx;
				opacity: 0.4;
			}
		}
	}
</style>
