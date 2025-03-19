<template>
	<view class="fx67ll-nav-box">
		<view class="fx67ll-title-box">fx67ll's uni-app 作品示例合集</view>
		<view class="fx67ll-link-box">
			<!-- <view class="fx67ll-nav-item"><uni-link href="https://fx67ll.vip" text="个人业务管理系统" showUnderLine="false"
					font-size="20"></uni-link></view> -->
			<view class="fx67ll-nav-item"><uni-link href="https://life.fx67ll.com" text="fx67ll 个人用的日常小工具" showUnderLine="false"
				font-size="20"></uni-link></view>
			<view class="fx67ll-nav-item"><uni-link :href="urlQR" text="浏览器 H5 二维码在线扫码" showUnderLine="false"
					font-size="20"></uni-link></view>
			<view class="fx67ll-nav-item"><uni-link :href="urlJTCEE" text="跨境速递 uni-app 演示项目" showUnderLine="false"
					font-size="20"></uni-link></view>
			<view class="fx67ll-nav-item"><uni-link :href="urlLTOFE" text="彩票随机号码生成辅助工具" showUnderLine="false"
					font-size="20"></uni-link></view>
			<!-- <view class="fx67ll-nav-item"><uni-link href="https://map.fx67ll.com/mapcanvas" text="大数据可视化地图（开发中，敬请期待）"
					showUnderLine="false" font-size="20"></uni-link></view> -->
			<view class="fx67ll-nav-item"><view class="fx67ll-devTip">持续开发更新中......</view></view>
		</view>
		<web-view class="fx67ll-background" :style="{ '--clientheight': clientHeight }"
			src="https://test.fx67ll.com/fx67ll-background-collection/html/shootingStars/shootingStars.html"></web-view>
		<fx67ll-footer />
	</view>
</template>

<script>
	export default {
		onShow() {
			this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		},
		data() {
			return {
				// 屏幕高度，用于自适应
				clientHeight: 'auto',
				// 二维码示例链接
				urlQR: window.location.href + 'pages/JTCEE/index/scan_qr_for_index',
				// 跨境速递示例链接
				urlJTCEE: window.location.href + 'pages/JTCEE/login/login',
				// 彩票辅助示例链接
				urlLTOFE: window.location.href + 'pages/LTOFE/index/index'
			};
		},
		methods: {}
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

				.uni-link {
					color: #fff !important;
					font-size: 44rpx !important;
				}

				.uni-link:hover {
					color: #ef8e81 !important;
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