<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="help-box">
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
				<view class="top-nav-title">{{ $t('help_service.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="help-collapse">
			<uni-collapse ref="collapse" v-model="collapseValue" @change="collapseChange">
				<uni-collapse-item
					:title="index < 6 ? '服务问题 - ' + (index + 1) : '包裹问题 - ' + (index + 1)"
					:thumb="index < 6 ? '/static/img/JTCEE/index/get-service.png' : '/static/img/JTCEE/address/address-user-send.png'"
					:disabled="index === 5"
					:show-animation="index === 6 ? false : true"
					v-for="(num, index) in helpListData"
					:key="index"
				>
					<view class="help-collapse-content">
						常见问题的解决办法有以下几点：通常是需要您联系门店的管理人员，处理包裹相关的问题，希望您不要着急，门店人员会尽一切可能帮助您!
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import uniCollapse from '@/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue';
export default {
	components: {
		uniIcons,
		uniCollapse
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';

		// this.showTestToast(1);
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 打开状态的折叠面板
			collapseValue: ['0', '1', '2'],
			// 折叠面板数据
			helpListData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
		};
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/index/index'
			});
		},
		collapseChange(e) {
			console.log('当前打开的折叠面板有：' + JSON.stringify(e));
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.help-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: @base-gap;

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

	.help-collapse {
		width: calc(100% - @base-gap * 2);
		margin: 30rpx auto 0 auto;
		border-radius: 20rpx;
		overflow: hidden;
		.help-collapse-content {
			width: calc(100% - @base-gap * 2);
			margin: 0 auto 30rpx auto;
			color: @topic-green;
		}
	}
}
</style>
