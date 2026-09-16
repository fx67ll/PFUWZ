<template>
	<view class="fx67ll-nav-box">
		<view class="fx67ll-title-box">fx67ll's uni-app 作品示例合集</view>
		<view class="fx67ll-link-box">
			<view class="fx67ll-nav-item" @click="handleToLife">
				<text class="fx67ll-link-text">fx67ll's 日常小工具</text>
			</view>
			<view class="fx67ll-nav-item" @click="handleToStatus">
				<text class="fx67ll-link-text">fx67ll's 服务状态监控</text>
			</view>
			<view class="fx67ll-nav-item" @click="handleToQR">
				<text class="fx67ll-link-text">浏览器 H5 二维码在线扫码</text>
			</view>
			<view class="fx67ll-nav-item" @click="handleToJTCEE">
				<text class="fx67ll-link-text">跨境速递 uni-app 演示项目</text>
			</view>
			<view class="fx67ll-nav-item" @click="handleToLTOFE">
				<text class="fx67ll-link-text">每日彩票号码生成工具</text>
			</view>
			<view class="fx67ll-nav-item" @click="handleToMahjongReservation">
				<text class="fx67ll-link-text">麻将室预约工具</text>
			</view>
			<view class="fx67ll-nav-item">
				<view class="fx67ll-devTip">持续开发更新中......</view>
			</view>
		</view>
		<web-view class="fx67ll-background" :style="{ '--clientheight': clientHeight }"
			src="https://test.fx67ll.com/fx67ll-background-collection/html/shootingStars/shootingStars.html"></web-view>
		<fx67ll-footer />
	</view>
</template>

<script>
import { openAdaptiveWindow, openExternalUrl } from '@/utils/browser.js';

export default {
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto'
		};
	},
	methods: {
		// fx67ll's 日常小工具（外链，独立站点）
		handleToLife() {
			openExternalUrl('https://life.fx67ll.com');
		},
		// fx67ll's 服务状态监控（外链，独立站点）
		handleToStatus() {
			openExternalUrl('https://life.fx67ll.com/#/pages/server/status/index');
		},
		// 浏览器 H5 二维码在线扫码（应用内页）
		handleToQR() {
			openAdaptiveWindow('/pages/JTCEE/index/scan_qr_for_index');
		},
		// 跨境速递 uni-app 演示项目（应用内页）
		handleToJTCEE() {
			openAdaptiveWindow('/pages/JTCEE/login/login');
		},
		// 每日彩票号码生成工具（应用内页）
		handleToLTOFE() {
			openAdaptiveWindow('/pages/LTOFE/index/index');
		},
		// 麻将室预约交互演示（应用内页）
		handleToMahjongReservation() {
			openAdaptiveWindow('/pages/mahjong/reservation/index');
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@textZindex: 2;
@paddingAside: 60rpx;

.fx67ll-nav-box {
	padding: 80rpx @paddingAside;

	.fx67ll-title-box {
		position: relative;
		z-index: @textZindex;
		text-align: center;
		font-size: 62rpx;
		color: #2ecc71;
	}

	.fx67ll-link-box {
		position: relative;
		z-index: @textZindex;
		padding-top: 100rpx;

		.fx67ll-nav-item {
			text-align: center;
			margin-bottom: 40rpx;

			.fx67ll-link-text {
				color: #fff;
				font-size: 44rpx;
			}

			.fx67ll-link-text:hover {
				color: #ef8e81;
			}
		}

		.fx67ll-nav-item:last-child {
			margin-bottom: 0;
		}
	}

	.fx67ll-background {
		position: absolute;
		top: 0;
		z-index: @textZindex - 1;
	}
}

.fx67ll-footer {
	left: 0;
}

@media screen and (max-width: 960px) {
	.fx67ll-footer {
		font-size: 12px;
	}
}

.fx67ll-devTip {
	color: #ef8e81;
	font-size: 14px;
}
</style>
