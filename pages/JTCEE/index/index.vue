<template>
	<view class="index-box">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || H5 -->
		<view class="status-bar-wx" :style="{ '--statusbarheight': statusBarHeight }"><!-- 这里是状态栏，用于微信端的状态栏抵消 --></view>
		<!-- #endif -->
		<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		<view class="index-search">
			
			<!-- 临时不用的方案 -->
			<!-- <view class="index-search-logo">
				<img src="/static/img/JTCEE/logo/logo2-3.png">
			</view> -->
			
			<!-- 微信小程序特供搜索框，避开关闭按钮 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="index-search-box index-search-box-wx">
				<uni-icons class="index-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
				<input class="uni-input index-search-input" confirm-type="search" :placeholder="$t('index.search.goods')" placeholder-class="login-input-placeholder" />
			</view>
			<!-- #endif -->
			
			<!-- H5平台使用的搜索框 -->
			<!-- #ifdef H5 -->
			<view class="index-search-box">
				<uni-icons class="index-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
				<input class="uni-input index-search-input" confirm-type="search" :placeholder="$t('index.search.goods')" placeholder-class="login-input-placeholder" />
			</view>
			<!-- #endif -->
			
		</view>
		<view class="index-swiper">
			<swiper
				circular
				class="swiper"
				:indicator-dots="indicatorDots"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
				indicator-color="#B0B0B0"
				indicator-active-color="#50B38C"
			>
				<swiper-item>
					<view class="swiper-item"><img src="/static/img/JTCEE/index/index-banner.png" /></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						B
						<!-- <img src=""> -->
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						C
						<!-- <img src=""> -->
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- H5增加一点高度适配全屏 -->
		<!-- #ifdef H5 -->
		<view class="index-swiper-gap"></view>
		<!-- #endif -->
		<view class="index-function-alpha">
			<view class="index-alpha-item">
				<view class="index-alpha-item-img" @click="countExpressBill"><img src="/static/img/JTCEE/index/bill-count.png" /></view>
				<view class="index-alpha-item-text">{{ $t('index.alpha.count') }}</view>
			</view>
			<view class="index-alpha-item" @click="openDialogTest">
				<view class="index-alpha-item-img"><img src="/static/img/JTCEE/index/bill-explain.png" /></view>
				<view class="index-alpha-item-text">{{ $t('index.alpha.explain') }}</view>
			</view>
			<view class="index-alpha-item" @click="openDialogTest">
				<view class="index-alpha-item-img"><img src="/static/img/JTCEE/index/shop-search.png" /></view>
				<view class="index-alpha-item-text">{{ $t('index.alpha.site') }}</view>
			</view>
			<view class="index-alpha-item" @click="getHelpService">
				<view class="index-alpha-item-img"><img src="/static/img/JTCEE/index/get-service.png" /></view>
				<view class="index-alpha-item-text">{{ $t('index.alpha.help') }}</view>
			</view>
		</view>
		<!-- H5增加一点高度适配全屏 -->
		<!-- #ifdef H5 -->
		<view class="index-function-alpha-gap"></view>
		<!-- #endif -->
		<!-- 临时使用的提示弹窗 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" mode="base" title="系统提示" content="该功能正在开发中，敬请期待..." confirmText="确认" cancelText="取消"></uni-popup-dialog>
		</uni-popup>
		<view class="index-notice">
			<view class="index-notice-head">
				<view class="index-notice-title">{{ $t('index.notice.title') }}</view>
				<view class="index-notice-more" @click="getMoreNotice">{{ $t('index.notice.more') }}</view>
			</view>
			<view class="index-notice-item">
				<view class="index-notice-catagory index-notice-yellow">{{ $t('index.notice.public') }}</view>
				<view class="index-notice-content">每周六寄件享免费领取100元寄件礼包，更有惊喜。您有来自南京市的快递已被签收，感谢您使用。</view>
			</view>
			<view class="index-notice-item">
				<view class="index-notice-catagory index-notice-red">{{ $t('index.notice.express') }}</view>
				<view class="index-notice-content">每周六寄件享免费领取100元寄件礼包，更有惊喜。您有来自南京市的快递已被签收，感谢您使用。</view>
			</view>
		</view>
		<view class="index-function-beta">
			<view class="index-beta-item" @click="goUseExpress">
				<view class="index-beta-item-img"><img src="/static/img/JTCEE/index/express-use.png" /></view>
				<view class="index-beta-item-text">{{ $t('index.beta.use') }}</view>
			</view>
			<view class="index-beta-item" @click="goGetExpress">
				<view class="index-beta-item-img"><img src="/static/img/JTCEE/index/express-search.png" /></view>
				<view class="index-beta-item-text">{{ $t('index.beta.search') }}</view>
			</view>
			<view class="index-beta-item" @click="goPackageAdd">
				<view class="index-beta-item-img"><img src="/static/img/JTCEE/index/express-get.png" /></view>
				<view class="index-beta-item-text">{{ $t('index.beta.get') }}</view>
			</view>
			<view class="index-beta-item" @click="goScanQR">
				<view class="index-beta-item-img"><img src="/static/img/JTCEE/index/express-scan.png" /></view>
				<view class="index-beta-item-text">{{ $t('index.beta.scan') }}</view>
			</view>
		</view>
		<view class="bottom-gap"></view>
		<view class="bottom-menu">
			<view class="bottom-menu-box">
				<view class="bottom-menu-item">
					<view class="bottom-menu-icon"><img src="/static/img/JTCEE/bottom/bottom-home-active.png" /></view>
					<view class="bottom-menu-text">{{ $t('bottom_menu.home') }}</view>
				</view>
				<view class="bottom-menu-logo">
					<img src="/static/img/JTCEE/logo/logo2-1.png" />
				</view>
				<view class="bottom-menu-item" @click="goUserIndex">
					<view class="bottom-menu-icon"><img src="/static/img/JTCEE/bottom/bottom-user.png" /></view>
					<view class="bottom-menu-text">{{ $t('bottom_menu.user') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 轮播组件参数
			indicatorDots: true,
			autoplay: false,
			interval: 5000,
			duration: 500
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	methods: {
		goUserIndex() {
			uni.reLaunch({
				url: '/pages/JTCEE/user/user_index'
			});
		},
		getMoreNotice() {
			uni.navigateTo({
				url: '/pages/JTCEE/notice/notice_catagory?fromType=1'
			});
		},
		countExpressBill() {
			uni.navigateTo({
				url: '/pages/JTCEE/index/express_bill'
			});
		},
		getHelpService() {
			uni.navigateTo({
				url: '/pages/JTCEE/index/help_service'
			});
		},
		openDialogTest() {
			this.$refs.popup.open();
		},
		goUseExpress() {
			uni.navigateTo({
				url: '/pages/JTCEE/express/express_send'
			});
		},
		goGetExpress() {
			uni.navigateTo({
				url: '/pages/JTCEE/invoice/invoice_index?fromType=1'
			});
		},
		goPackageAdd() {
			uni.navigateTo({
				url: '/pages/JTCEE/package/package_add?fromType=1&useType=1'
			});
		},
		goScanQR() {
			uni.navigateTo({
				url: '/pages/JTCEE/index/scan_qr?scanType=1'
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

// 卡片空隙
@card-gap: 36rpx;

.index-box {
	width: 100%;
	background-color: @topic-bgc;

	.status-bar-wx {
		height: var(--statusbarheight);
		width: 100%;
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

	.index-search {
		width: 100%;
		height: 88rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: flex-start;
		.index-search-logo {
			width: 80rpx;
			height: 68rpx;
			// border: @test-line-width solid @topic-green;
			margin-left: 40rpx;
			position: relative;
			top: 10rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.index-search-box {
			
			// 临时不用的方案
			// width: calc(100% - 190rpx);
			
			// 临时方案
			width: calc(100% - 70rpx);
			
			height: calc(100% - 30rpx);
			border: 1rpx solid #e9e9e9;
			border-radius: 34rpx;
			margin-top: 14rpx;
			margin-left: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.index-search-icon {
				position: relative;
				left: 26rpx;
			}
			.index-search-input {
				width: calc(100% - 80rpx);
				height: 100%;
				font-size: 24rpx;
				position: relative;
				top: 2rpx;
			}
			.login-input-placeholder {
				font-size: 28rpx;
				color: #c8c8c8;
			}
		}
		.index-search-box-wx {
			width: calc(100% - 385rpx);
		}
	}

	@swiper-height: 380rpx;
	.index-swiper {
		width: calc(100% - @base-gap * 2);
		height: @swiper-height;
		// border: @test-line-width solid @topic-green;
		margin: 30rpx auto 20rpx auto;
		.swiper {
			height: 100%;
		}
		.swiper-item {
			display: block;
			height: 100%;
			line-height: calc(@swiper-height - 50rpx);
			text-align: center;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.index-swiper-gap {
		width: 100%;
		height: 20rpx;
	}

	.index-function-alpha {
		width: calc(100% - (@base-gap * 2 * 2));
		height: 140rpx;
		margin: 0 auto calc(@card-gap + 4rpx) auto;
		display: flex;
		justify-content: space-between;
		.index-alpha-item {
			width: 96rpx;
			height: 100%;
			.index-alpha-item-img {
				width: 100%;
				height: calc(100% - 45rpx);
				// border: @test-line-width solid @topic-green;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.index-alpha-item-text {
				width: 100%;
				height: 30rpx;
				margin-top: 15rpx;
				font-size: @base-font-size;
				line-height: 30rpx;
				text-align: center;
				color: @topic-text;
			}
		}
	}
	.index-function-alpha-gap {
		width: 100%;
		height: 10rpx;
	}

	.index-notice {
		width: calc(100% - @base-gap * 2);
		height: 230rpx;
		margin: 0 auto @card-gap auto;
		background-color: #ffffff;
		border-radius: 20rpx;
		.index-notice-head {
			width: calc(100% - 40rpx);
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid @topic-split;
			display: flex;
			justify-content: space-between;
			line-height: 70rpx;
			.index-notice-title {
				font-size: 30rpx;
				color: @topic-text;
			}
			.index-notice-more {
				font-size: @base-font-size;
				color: @topic-green;
			}
		}
		.index-notice-item {
			width: calc(100% - 40rpx);
			height: 40rpx;
			margin: 25rpx auto 0 auto;
			display: flex;
			justify-content: space-between;
			line-height: 40rpx;
			font-size: @base-font-size;
			.index-notice-catagory {
				width: 80rpx;
				height: 100%;
				border-radius: 6rpx;
				text-align: center;
			}
			.index-notice-yellow {
				background-color: rgba(248, 187, 50, 0.14);
				color: #f8bb32;
			}
			.index-notice-red {
				background-color: rgba(255, 81, 71, 0.12);
				color: #ff5147;
			}
			.index-notice-content {
				width: calc(100% - 105rpx);
				.text-ellipsis();
			}
		}
	}

	.index-function-beta {
		width: calc(100% - @base-gap * 2);
		height: 410rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.index-beta-item {
			width: calc(50% - 20rpx);
			height: 190rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-bottom: @card-gap;
			line-height: 190rpx;
			display: flex;
			align-items: center;
			.index-beta-item-img {
				width: 80rpx;
				height: 80rpx;
				margin: 0 38rpx 0 50rpx;
				img {
					width: 100%;
					height: 100%;
					position: relative;
					top: -28rpx;
				}
			}
			.index-beta-item-text {
				font-size: 36rpx;
				color: #313131;
			}
		}
	}
}
</style>
