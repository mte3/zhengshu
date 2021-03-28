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
	</view>
</template>

<script>
	import {
		glCertificate,
		getManagerSearch,
		getSelect
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
			}
		},
		methods: {
			handelTab(e) {
				e === 'T' ? this.status = true :this.status = false
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
		
		.Selected{
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
</style>
