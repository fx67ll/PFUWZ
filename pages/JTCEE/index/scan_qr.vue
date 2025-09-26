<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="scan-box">
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
				<view class="top-nav-title">{{ $t('scan_qr.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>

		<!-- 暂不开放演示 -->
		<web-view class="html5-qr-code" :style="{ '--clientheight': clientHeight }" src="https://test.fx67ll.com/fx67ll-html5-qrcode/scan.html" allow="camera"></web-view>

		<!-- 页面警告消息 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog
				type="error"
				mode="base"
				:title="this.$t('popup.warning.title')"
				:content="this.$t('popup.warning.content')"
				:confirmText="this.$t('popup.warning.confirmText')"
				:cancelText="this.$t('popup.warning.cancelText')"
				@confirm="confirmErrorDialog"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniIcons,
		uniPopup
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	onLoad(option) {
		this.scanType = option.scanType;
		if (option.scanType === '2') {
			if (option.fromType) {
				this.fromType = option.fromType;
			}
			this.addType = option.addType;
			this.useType = option.useType;
		}

		// 之前不会部署多个https应用的提示，不需要了
		// uni.showToast({
		// 	title:
		// 		'uni-app 网页H5端不支持嵌入小程序自带扫码功能，这里使用嵌入个人开发扫码sdk的方式，因为sdk暂时不支持非安全加密的http访问，所以如果需要查看可以访问 fx67ll.com/scan.html 来查看展示效果~',
		// 	icon: 'none',
		// 	duration: 8888
		// });
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 从何处进入扫码页面，1.首页 2.商品添加
			scanType: '1',
			// 当前页面用途，1.添加商品 2.修改商品
			useType: '1',
			// 上一个页面的返回类型，参考上一个页面说明
			fromType: '1',
			// 从什么地方进入的商品添加，1.寄件 2.包裹预报 3.商品管理
			addType: '1'
		};
	},
	methods: {
		goBack() {
			let useType = this.useType;
			let fromType = this.fromType;
			let addType = this.addType;
			if (this.scanType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/index/index'
				});
			} else if (this.scanType === '2') {
				uni.redirectTo({
					url: `/pages/JTCEE/goods/goods_add?useType=${useType}&fromType=${fromType}&addType=${addType}`
				});
			} else {
				this.$refs.popup.open();
			}
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.scan-box {
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

	.html5-qr-code {
		width: 100%;
		height: var(--clientheight);
		position: fixed;
		top: 0;
	}
}
</style>
