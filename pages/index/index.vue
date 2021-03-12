<template>

	<view class="fatherBox">
		<view v-if="!isLogin">
			<view class="headBox">
				<view class="leftBox" @click="pushLogin">
					<image src="../../static/image/mine.png" mode="widthFix"></image>
				</view>
				<view class="middleBox">
					<image src="../../static/image/search.png" mode="widthFix"></image>
					<input type="text" value="输入你想要搜索的证书名">
				</view>
				<view class="rightBox">
					<image src="../../static/image/shaixuan.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="contentBox">
				<view class="itemBox" v-for="item in list" :key="item.id">
					<text style="margin-left: 10rpx;">{{item.name}}</text>
					<image :src=item.picture mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view v-if="isLogin">
			<view class="flexBox">
				<view @click="pushCertificate">
					<image src="../../static/image/zhengshu.png" mode="widthFix"></image>
					<view>证书管理</view>
				</view>
				<view @click="pushModule">
					<image src="../../static/image/mokuai.png" mode="widthFix"></image>
					<view>模块管理</view>
				</view>
			</view>
			<view class="addZhengShu">
				+添加证书
			</view>
			<view @click="outLogin" class="outLogin">退出</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllList
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				list: [],
				isLogin: false,
			}
		},
		onLoad() {
			this.getAllListFunc()
		},
		onShow() {
			this.checkisLogin();
		},
		methods: {
			// 检查是否登录状态
			checkisLogin() {
				uni.getStorage({
					key: 'isLogin',
					success: (res) => {
						this.isLogin = true;
						console.log(this.isLogin)
					},
					fail: (err)=> {
						this.isLogin = false
					}
				});
			},
			getAllListFunc() {
				getAllList().then(res => {
					this.list = res.data
					console.log(this.list)
				}).catch(err => {
					console.log(err)
				})
			},
			pushLogin() {
				if (this.isLogin === true) {} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			// 退出登录按钮
			outLogin() {
				uni.removeStorage({
					key: 'isLogin',
					success: (res) => {
						this.checkisLogin();
						uni.showToast({
							title: '退出登录'
						});
					}
				});
			},
			// 跳转到模块管理页面
			pushModule(){
				uni.navigateTo({
					url:'../module/module'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.fatherBox {
		position: relative;
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
		margin-top: 100rpx;

		.itemBox {
			font-weight: 700;
			padding: 20rpx 30rpx 40rpx 30rpx;
			border-bottom: 1rpx solid grey;
			font-size: 36rpx;

			image {
				margin-top: 10rpx;
				width: 100%;
			}
		}
	}

	.flexBox {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		text-align: center;

		image {
			width: 300rpx;
		}
	}

	.addZhengShu {
		width: 648rpx;
		height: 98rpx;
		background-color: #F6F6F9;
		border-radius: 10rpx;
		text-align: center;
		line-height: 98rpx;
		margin: 30rpx auto;
	}

	.outLogin {
		margin: 300rpx auto;
		width: 150rpx;
		height: 56rpx;
		border-radius: 28rpx;
		background-color: #707070;
		text-align: center;
		color: white;
		line-height: 56rpx;
		font-size: 28rpx;
	}
</style>
