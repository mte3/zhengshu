<template>

	<view class="fatherBox">
		<view v-if="!isLogin">
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

			<view class="contentBox" v-if="!isSelectBoxShow">
				<view class="itemBox" v-for="item in list" :key="item.id" @click="pushDetail(item.id)">
					<text style="margin-left: 10rpx;">{{item.name}}</text>
					<image :src=item.picture mode="widthFix"></image>
				</view>
			</view>
			<view v-if="isSelectBoxShow" class="isSelectBox">
				<view class="leftSelctBox">
					<view class="itemBox" v-for="(item,index) in selectList" @click="selectItem(item.id)"
						:class="{'isSelect':selectLeftId==index+1}">{{item.name}}</view>
				</view>
				<view class="rightSelectBox" v-if="selectLeftId==1">
					<view v-for="item in selectList[0].list" class="rightItemBox" @click="selectRightshenhe(item)">
						{{item.title}}
					</view>
				</view>
				<view class="rightSelectBox" v-if="selectLeftId==2">
					<view v-for="item in selectList[1].list" class="rightItemBox" @click="selectRight(item)">
						{{item.title}}
					</view>
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
			<view class="addZhengShu" @click="addCertificate">
				+添加证书
			</view>
			<view @click="outLogin" class="outLogin">退出</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllList,
		getSearch,
		getSelect
	} from '../../network/apiData.js'
	export default {
		data() {
			return {
				list: [],
				isLogin: false,
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
		onLoad() {
			this.getAllListFunc();
		},
		onShow() {
			this.checkisLogin();
		},
		methods: {
			//筛选框右边盒子点击事件
			selectRightshenhe(item) {
				this.selectRightId = item.id;
				this.selectValueshzt = item.status;
				this.isSelectBoxShow = false
				// getSelect(this.selectValueshzt, this.selectValuejfmk).then(res => {
				// 	this.list = res
				// 	console.log(res)
				// })
				console.log(this.selectValueshzt)
			},
			//筛选框左边盒子点击事件
			selectItem(id) {
				this.selectLeftId = id
				console.log(id)
			},
			//点击筛选按钮
			selectClick() {
				this.isSelectBoxShow = !this.isSelectBoxShow;
				console.log(this.isSelectBoxShow)
			},
			//跳转到证书详情页
			pushDetail(id) {
				console.log(id)
				uni.navigateTo({
					url: `./detail/detail?id=${id}`
				})
			},
			//监听搜索框失去焦点触发
			searchBlur(e) {
				this.searchValue = e.detail.value;
				this.getSearchFunc(this.searchValue)
				console.log(this.searchValue)
			},
			// 检查是否登录状态
			checkisLogin() {
				uni.getStorage({
					key: 'isLogin',
					success: (res) => {
						this.isLogin = true;
						console.log(this.isLogin)
					},
					fail: (err) => {
						this.isLogin = false
					}
				});
			},
			//搜索请求
			getSearchFunc(name) {
				getSearch(name).then(res => {
					this.list = res.data
					console.log(res)
					console.log(this.list)
				})
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
			//跳转到添加正证书页面
			addCertificate() {
				uni.navigateTo({
					url: '../addCertificate/addCertificate'
				})
			},
			// 跳转到模块管理页面
			pushModule() {
				uni.navigateTo({
					url: '../module/module'
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

	.isSelectBox {
		margin-top: 90rpx;
		display: flex;
		text-align: center;

		.leftSelctBox {
			width: 40%;
			height: 1106rpx;
			background-color: #F6F6F9;

		}

		.rightSelectBox {
			width: 60%;

			.rightItemBox {
				height: 87rpx;
				line-height: 87rpx;
				border-bottom: 1rpx solid #EAEBF2;
				border-left: 1rpx solid #EAEBF2;
			}
		}

		.itemBox {
			height: 87rpx;
			line-height: 87rpx;
		}
	}

	.isSelect {
		background-color: #FFFFFF;
	}
</style>
