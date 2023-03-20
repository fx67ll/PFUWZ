<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="invoice-qr-box">
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
				<view class="top-nav-title">{{ $t('invoice_qr.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="invoice-qr-card">
			<view class="invoice-qr-card-top">
				<text>{{ $t('invoice_qr.id') }}：</text>
				<text>ST{{ Math.round(Math.random() * (9999999999 - 1) + 1) }}</text>
				<img class="invoice-qr-copy" src="/static/img/JTCEE/invoice/invoice-copy-qr.png" @click="getOrderId('ST232354565')" />
			</view>
			<view class="invoice-qr-card-bottom">
				<view class="invoice-qr-img"><img src="./img/invoice-qr-temp.png" /></view>
				<view class="invoice-qr-shop">
					<view class="invoice-qr-shop-item">
						<text>{{ $t('invoice_qr.shop.name') }}：</text>
						<text>东京港区虎之门新城711</text>
					</view>
					<view class="invoice-qr-shop-item">
						<text>{{ $t('invoice_qr.shop.address') }}：</text>
						<text>港区ホームページへようこそ，東京都港区ホームページです</text>
					</view>
					<view class="invoice-qr-shop-item">
						<text>{{ $t('invoice_qr.shop.phone') }}：</text>
						<text>18866661111</text>
					</view>
				</view>
			</view>
		</view>
		<view class="invoice-qr-package">
			<view class="invoice-qr-package-title">{{ $t('invoice_qr.package.info') }}</view>
			<view class="invoice-qr-package-goods">
				<view class="invoice-qr-goods-item" v-for="(num, index) in listData" :key="index">
					<img src="/static/img/JTCEE/user/user-head.png" />
					<text>任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有</text>
				</view>
			</view>
			<view class="invoice-qr-package-info">
				<view class="invoice-qr-package-item">
					<text>{{ $t('invoice_qr.package.weight') }}</text>
					<text>10kg</text>
				</view>
				<view class="invoice-qr-package-item">
					<text>{{ $t('invoice_qr.package.volume') }}</text>
					<text>0m³</text>
				</view>
				<view class="invoice-qr-package-item">
					<text>{{ $t('invoice_qr.package.insure') }}</text>
					<text>500円</text>
				</view>
				<view class="invoice-qr-package-item">
					<text>{{ $t('invoice_qr.package.service') }}</text>
					<text>补税12000円、打包费1000円</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
export default {
	components: {
		uniIcons
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	onLoad(option) {
		this.fromType = option.fromType;
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 从首页或者我的进入
			fromType: '1',
			// 商品数据
			listData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
		};
	},
	methods: {
		goBack() {
			let fromType = this.fromType;
			uni.redirectTo({
				url: `/pages/JTCEE/invoice/invoice_detail?fromType=${fromType}`
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
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.invoice-qr-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: @base-bottom-gap;

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

		// 这里是为了保证页面没有撑开也能有灰色的背景
		.page-bg {
			width: 100%;
			height: var(--clientheight);
			position: fixed;
			top: 0;
			background-color: @topic-bgc;
			z-index: -1;
		}
	}

	.invoice-qr-card {
		width: calc(100% - @base-gap * 2);
		margin: 20rpx auto 0 auto;
		background-color: #ffffff;
		border-radius: 20rpx;
		.invoice-qr-card-top {
			width: calc(100% - 40rpx);
			height: 60rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e9e9e9;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			text {
				font-size: 26rpx;
				color: #313131;
			}
			.invoice-qr-copy {
				width: 24rpx;
				height: 24rpx;
				margin-left: 12rpx;
			}
		}
		.invoice-qr-card-bottom {
			width: calc(100% - 40rpx);
			padding: 20rpx 0;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.invoice-qr-img {
				width: 170rpx;
				height: 170rpx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.invoice-qr-shop {
				width: calc(100% - 190rpx);
				background: #f6f6f6;
				border-radius: 10rpx;
				padding: 25rpx 0;
				
				@text-title-width: 125rpx;
				.invoice-qr-shop-item {
					width: calc(100% - 20rpx);
					margin: 0 auto 0 auto;
					font-size: 20rpx;
					display: flex;
					justify-content: flex-start;
					text:nth-child(1) {
						width: @text-title-width;
						color: #838383;
					}
					text:nth-child(2) {
						width: calc(100% - @text-title-width);
						color: #707070;
					}
				}
				.invoice-qr-shop-item:nth-child(2) {
					margin-top: 20rpx;
				}
				.invoice-qr-shop-item:nth-child(3) {
					margin-top: 20rpx;
				}
			}
		}
	}

	.invoice-qr-package {
		width: calc(100% - @base-gap * 2);
		margin: 20rpx auto 0 auto;
		background-color: #ffffff;
		border-radius: 20rpx;
		.invoice-qr-package-title {
			width: calc(100% - 40rpx);
			height: 96rpx;
			line-height: 96rpx;
			margin: 0 auto;
			font-size: 30rpx;
			color: #303031;
		}
		.invoice-qr-package-goods {
			width: calc(100% - 40rpx);
			margin: 0 auto;
			.invoice-qr-goods-item {
				background-color: #f8f8f8;
				border-radius: 10rpx;
				padding: 15rpx;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				@invoice-qr-img-size: 128rpx;
				img {
					width: @invoice-qr-img-size;
					height: @invoice-qr-img-size;
				}
				text {
					width: calc(100% - @invoice-qr-img-size - 15rpx);
					font-size: 26rpx;
					color: #313131;
					line-height: 32rpx;
				}
			}
		}
		.invoice-qr-package-info {
			width: calc(100% - 40rpx);
			margin: 40rpx auto 0 auto;
			.invoice-qr-package-item {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-content: center;
				text:nth-child(1) {
					font-size: 30rpx;
					color: #313131;
				}
				text:nth-child(2) {
					font-size: 28rpx;
					color: #838383;
				}
			}
		}
	}
}
</style>
