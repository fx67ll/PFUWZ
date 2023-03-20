<template>
	<view class="package-box">
		<view class="common-box">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || H5 -->
			<view class="status-bar-wx" :style="{ '--statusbarheight': statusBarHeight }"><!-- 这里是状态栏，用于微信端的状态栏抵消 --></view>
			<view class="status-bar-wx-fake" :style="{ '--statusbarheight': statusBarHeight }"><!-- 这里是状态栏，用于微信端的状态栏占位 --></view>
			<!-- #endif -->
			<view class="top-nav" :style="{ '--statusbarheight': statusBarHeight }">
				<view class="top-nav-back"><uni-icons class="top-nav-back-icon" type="back" size="24" color="#242424" @click="goBack"></uni-icons></view>
				<view class="top-nav-title">{{ $t('package_index.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake top-nav-fake-high"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>

			<!-- 搜索栏 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-search">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-search top-nav-search-wx" :style="{ '--topnavsearchtop': topNavSearchTop }">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
				</view>
			</view>
			<!-- #endif -->

			<!-- tab栏 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-tab">
				<v-tabs class="nav-tab-box nav-tab-box-two" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.3" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-tab top-nav-tab-wx" :style="{ '--topnavtabtop': topNavTabTop }">
				<v-tabs class="nav-tab-box nav-tab-box-two" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.3" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
		</view>
		<view class="package-index">
			<view class="package-item" v-for="(num, index) in listData" :key="index">
				<view class="package-item-top">
					<view
						class="package-item-order-id"
						:class="{
							'package-item-order-green': index >= 4,
							'package-item-order-grey': index < 4
						}"
					>
						<text class="package-item-order-type">{{ $t('package_index.card.id') }}：</text>
						<text class="package-item-order-number">ST232354565</text>
						<img class="package-item-order-copy" src="/static/img/JTCEE/invoice/invoice-copy.png" @click="getOrderId('ST232354565')" />
					</view>
					<view class="package-item-order-detail" @click="getOrderDetail">
						{{ $t('package_index.card.detail') }}
						<uni-icons class="package-item-order-detail-icon" type="right" size="16" color="#ffffff"></uni-icons>
					</view>
				</view>

				<view class="package-item-content">
					<view class="package-item-content-title">任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有</view>
					<view class="package-item-content-shop">
						<view class="package-item-content-shop-item">
							<uni-icons class="package-item-content-shop-icon" type="shop" size="18" color="#4A4A4A"></uni-icons>
							<text>{{ $t('package_index.card.shop.name') }}：</text>
							<text>东京港区虎之门新城711</text>
						</view>
						<view class="package-item-content-shop-item">
							<uni-icons class="package-item-content-shop-icon" type="location" size="18" color="#4A4A4A"></uni-icons>
							<text>{{ $t('package_index.card.shop.address') }}：</text>
							<text>港区ホームページへようこそ，東京都港区ホームページです</text>
						</view>
						<view class="package-item-content-shop-item">
							<uni-icons class="package-item-content-shop-icon" type="phone" size="18" color="#4A4A4A"></uni-icons>
							<text>{{ $t('package_index.card.shop.phone') }}：</text>
							<text>
								18866661111
								<img class="package-item-content-shop-copy" src="/static/img/JTCEE/invoice/invoice-copy-qr.png" @click="getShopPhone('18866661111')" />
							</text>
						</view>
					</view>
				</view>

				<view class="package-item-btn">
					<view class="package-item-btn-order" @click="deleteOrder">{{ $t('package_index.card.button.delete') }}</view>
					<view class="package-item-btn-order" @click="editOrder" v-if="index < 4">{{ $t('package_index.card.button.edit') }}</view>
					<view class="package-item-btn-order package-item-btn-pay" @click="payOrderNow" v-if="index >= 4">{{ $t('package_index.card.button.express') }}</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore common-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
	</view>
</template>
<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import vTabs from '@/uni_modules/v-tabs/v-tabs.vue';
import { dataYears, dataMonths, pickerViewMonth } from '@/static/utils/uni-date-picker.js';
import pxToRpx from '@/static/utils/px-to-rpx.js';
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniIcons,
		vTabs,
		uniPopup
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 适配微信的searchbox和tabbox
			topNavSearchTop: 0,
			topNavTabTop: 0,
			// 下拉刷新上拉加载相关数据
			listData: [],
			loadMoreText: this.$t('pull.refresh.loading'),
			showLoadMore: false,
			maxDataIndex: 0,
			// tab索引
			tabCurrentIndex: 0,
			// tab数据
			tabDataList: [this.$t('package_index.tab.package.wait'), this.$t('package_index.tab.package.arrival')]
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
		this.topNavSearchTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 88 + 'rpx';
		this.topNavTabTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 166 + 'rpx';
	},
	onLoad(option) {
		this.initData();
	},
	onUnload() {
		(this.maxDataIndex = 0), (this.listData = []), (this.loadMoreText = this.$t('pull.refresh.loading.init')), (this.showLoadMore = false);
	},
	onReachBottom() {
		console.log('正在执行 `onReachBottom` 事件ing...');
		if (this.maxDataIndex > 19) {
			this.loadMoreText = this.$t('pull.refresh.nomore');
			return;
		}
		this.showLoadMore = true;
		setTimeout(() => {
			this.setListData();
		}, 300);
	},
	onPullDownRefresh() {
		console.log('正在执行 `onPullDownRefresh` 事件ing...');
		this.initData();
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/user/user_index'
			});
		},
		initData() {
			setTimeout(() => {
				this.maxDataIndex = 0;
				this.listData = [];
				let data = [];
				this.maxDataIndex += 5;
				for (var i = this.maxDataIndex - 4; i < this.maxDataIndex + 1; i++) {
					data.push(i);
				}
				this.listData = this.listData.concat(data);
				uni.stopPullDownRefresh();
			}, 300);
		},
		setListData() {
			let data = [];
			this.maxDataIndex += 5;
			for (var i = this.maxDataIndex - 4; i < this.maxDataIndex + 1; i++) {
				data.push(i);
			}
			this.listData = this.listData.concat(data);
		},
		changeTab(index) {
			console.log('当前选中的项：' + index);
		},
		getOrderDetail() {
			uni.navigateTo({
				url: '/pages/JTCEE/package/package_detail'
			});
		},
		getOrderId(id) {
			uni.setClipboardData({
				data: id,
				// 配置是否弹出提示，默认弹出提示	App (3.2.13+)、H5 (3.2.13+)
				showToast: true,
				// 接口调用成功的回调
				success: function() {
					console.log('设置系统剪贴板的内容 - success');
				},
				// 接口调用失败的回调函数
				fail: function() {
					console.log('设置系统剪贴板的内容 - fail');
				},
				// 接口调用结束的回调函数（调用成功、失败都会执行）
				complete: function() {
					console.log('设置系统剪贴板的内容 - complete');
				}
			});
		},
		getShopPhone(phone) {
			uni.setClipboardData({
				data: phone,
				// 配置是否弹出提示，默认弹出提示	App (3.2.13+)、H5 (3.2.13+)
				showToast: true,
				// 接口调用成功的回调
				success: function() {
					console.log('设置系统剪贴板的内容 - success');
				},
				// 接口调用失败的回调函数
				fail: function() {
					console.log('设置系统剪贴板的内容 - fail');
				},
				// 接口调用结束的回调函数（调用成功、失败都会执行）
				complete: function() {
					console.log('设置系统剪贴板的内容 - complete');
				}
			});
		},
		deleteOrder() {
			let self = this;
			uni.showModal({
				title: self.$t('package_index.modal.delete.title'),
				content: `${self.$t('package_index.modal.delete.content')}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						self.showTestToast(0);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		payOrderNow() {
			console.log('创建订单中ing...');
			this.showTestToast(0);
		},
		editOrder() {
			uni.navigateTo({
				url: '/pages/JTCEE/package/package_add?fromType=2&useType=2'
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.package-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: calc(@base-bottom-gap - 30rpx);

	.common-box {
		// 这里是状态栏，用于微信端的状态栏抵消
		.status-bar-wx {
			height: var(--statusbarheight);
			width: 100%;
			background-color: #ffffff;
			position: fixed;
			top: 0;
			z-index: 8;
		}
		.status-bar-wx-fake {
			height: var(--statusbarheight);
			width: 100%;
		}

		.top-nav {
			top: var(--statusbarheight);
		}

		.top-nav-search-wx {
			top: var(--topnavsearchtop);
		}
		.top-nav-tab-wx {
			top: var(--topnavtabtop);
		}

		// 这里是为了保证页面没有撑开也能有灰色的背景
		.page-bg {
			width: 100%;
			height: var(--clientheight);
			position: absolute;
			top: 0;
			background-color: @topic-bgc;
			z-index: -1;
		}
	}

	.package-item-top {
		width: 100%;
		height: 60rpx;
		display: flex;
		color: #ffffff;
		justify-content: space-between;
		background-color: #f8bb32;
		border-radius: 20rpx 20rpx 0 0;
		.package-item-order-id {
			width: 60%;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 26rpx;
			border-radius: 20rpx 0;
			.package-item-order-type {
				margin-left: 20rpx;
			}
			.package-item-order-number {
				margin-left: 3rpx;
			}
			.package-item-order-copy {
				width: 30rpx;
				height: 30rpx;
				margin-left: 12rpx;
			}
		}
		.package-item-order-green {
			background-color: @topic-green;
		}
		.package-item-order-red {
			background-color: #ff5147;
		}
		.package-item-order-grey {
			background-color: #a6a6a6;
		}
		.package-item-order-detail {
			width: 40%;
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background-color: #f8bb32;
			font-size: 28rpx;
			border-radius: 0 20rpx 0 0;
			.package-item-order-detail-icon {
				position: relative;
				top: 1rpx;
				margin: 0 15rpx 0 10rpx;
			}
		}
	}

	.package-item-info-address-status {
		width: 100rpx;
		img {
			width: 100%;
			height: 20rpx;
			margin: 0 auto;
		}
		text {
			width: 100%;
			display: block;
			text-align: center;
			font-size: 20rpx;
			color: #4a4a4a;
		}
	}
	.package-item-info-address {
		min-width: 110rpx;
		text {
			display: block;
			text-align: center;
		}
		text:nth-child(1) {
			font-size: 34rpx;
			color: #313131;
		}
		text:nth-child(2) {
			font-size: 28rpx;
			color: #888888;
			margin-top: 18rpx;
		}
	}

	.package-index {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.package-item {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 25rpx;
			padding-bottom: 10rpx;

			.package-item-content {
				width: 100%;
				.package-item-content-title {
					width: calc(100% - 40rpx);
					margin: 20rpx auto 0 auto;
					font-size: 28rpx;
					color: #313131;
					.text-ellipsis-two();
				}
				.package-item-content-shop {
					width: calc(100% - 70rpx);
					background-color: #f8f8f8;
					border-radius: 10rpx;
					margin: 20rpx auto 10rpx auto;
					padding: 10rpx 15rpx 25rpx 15rpx;
				}
				.package-item-content-shop-item {
					display: flex;
					justify-content: flex-start;
					margin-top: 10rpx;
					font-size: 28rpx;
					.package-item-content-shop-icon {
						position: relative;
						top: 2rpx;
						margin-right: 5rpx;
					}
					text {
						display: inline-block;
					}
					text:nth-child(2) {
						width: 150rpx;
						color: #838383;
					}
					text:nth-child(3) {
						width: calc(100% - 200rpx);
						color: #4a4a4a;
						display: flex;
						justify-content: flex-start;
						.package-item-content-shop-copy {
							display: inline-block;
							width: 25rpx;
							height: 25rpx;
							margin-left: 10rpx;
						}
					}
				}
			}

			.package-item-btn {
				width: calc(100% - 40rpx);
				height: 82rpx;
				margin: 0 auto;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.package-item-btn-order {
					width: 160rpx;
					height: 52rpx;
					background-color: #ffffff;
					border-radius: 40rpx;
					border: 1rpx solid #a6a6a6;
					color: #4a4a4a;
					font-size: 24rpx;
					text-align: center;
					line-height: 52rpx;
					margin-left: 21rpx;
				}
				.package-item-btn-pay {
					border: 1rpx solid @topic-green;
					color: @topic-green;
				}
			}
		}
	}
}
</style>
