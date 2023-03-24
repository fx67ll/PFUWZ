<template>
	<view class="fx67ll-nav-box">
		<view class="fx67ll-title-box">fx67ll's uni-app 个人作品示例</view>
		<view class="fx67ll-link-box">
			<view class="fx67ll-nav-item">H5二维码在线扫码示例</view>
			<view class="fx67ll-nav-item"><uni-link :href="urlJTCEE" text="跨境速递演示项目示例" showUnderLine="false" font-size="20"></uni-link></view>
			<view class="fx67ll-nav-item"><uni-link :href="urlLTOFE" text="彩票选号辅助工具示例" showUnderLine="false" font-size="20"></uni-link></view>
			<view class="fx67ll-nav-item"><uni-link href="https://fx67ll.com" text="地图示例开发中，敬请期待" showUnderLine="false" font-size="20"></uni-link></view>
		</view>
		<fx67ll-footer />
	</view>
</template>

<script>
export default {
	data() {
		return {
			urlQR: window.location.href + 'pages/JTCEE/index/scan_qr_for_index',
			urlJTCEE: window.location.href + 'pages/JTCEE/login/login',
			urlLTOFE: window.location.href + 'pages/LTOFE/index/index'
		};
	},
	methods: {}
};
</script>

<style lang="less">
.fx67ll-nav-box {
	padding: 80rpx 50rpx;
	.fx67ll-title-box {
		text-align: center;
		font-size: 60rpx;
		color: #2ecc71;
	}
	.fx67ll-link-box {
		padding-top: 80rpx;
		.fx67ll-nav-item {
			text-align: center;
			margin-bottom: 40rpx;
			// 仿uni-link样式
			color: rgb(153, 153, 153);
			font-size: 20px;
		}
		.fx67ll-nav-item:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
