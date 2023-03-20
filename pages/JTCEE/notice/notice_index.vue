<template>
	<view class="notice-box">
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
				<view class="top-nav-title">{{ pageTitle }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="notice-index">
			<view class="notice-item" v-for="(num, index) in listData" :key="index">
				<view class="notice-item-title">签收成功通知 - {{ num }}</view>
				<view class="notice-item-content">您有来自南京市的快递已被签收，感谢您神鹰快递，后续快件问题可以联系客服查询</view>
				<view class="notice-item-info">
					<view class="notice-item-info-title">{{ $t('notice_index.express.id') }}</view>
					<view class="notice-item-info-text">ST{{ Math.round(Math.random() * (9999999999 - 1) + 1) }}</view>
				</view>
				<view class="notice-item-info">
					<view class="notice-item-info-title">{{ $t('notice_index.express.time') }}</view>
					<view class="notice-item-info-text">{{ nowDateTime }}</view>
				</view>
				<view class="notice-item-thanks">感谢您对神通速递的支持，期待下次见面吧！</view>
				<view class="notice-item-more" @click="getNoticeDetail">{{ $t('notice_index.more') }}</view>
			</view>
		</view>
		<view class="uni-loadmore common-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
	</view>
</template>
<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import moment from '@/node_modules/moment';
export default {
	components: {
		uniIcons
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 标题分类
			pageTitle: this.$t('notice_catagory.notice.express'),
			// 从首页或者我的进入
			fromType: '1',
			// 下拉刷新上拉加载相关数据
			listData: [],
			loadMoreText: this.$t('pull.refresh.loading'),
			showLoadMore: false,
			maxDataIndex: 0,
			// 当前日期时间
			nowDateTime: moment().format('YYYY-MM-DD HH:mm')
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	onLoad(option) {
		this.fromType = option.fromType;
		if (option.noticeType === '0') {
			this.pageTitle = this.$t('notice_catagory.notice.express');
		}
		if (option.noticeType === '1') {
			this.pageTitle = this.$t('notice_catagory.notice.public');
		}
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
			let fromType = this.fromType;
			uni.redirectTo({
				url: `/pages/JTCEE/notice/notice_catagory?fromType=${fromType}`
			});
		},
		getNoticeDetail() {
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/notice/notice_detail?fromType=${fromType}`
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
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.notice-box {
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
			position: absolute;
			top: 0;
			background-color: @topic-bgc;
			z-index: -1;
		}
	}

	.notice-index {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.notice-item {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 25rpx;
			.notice-item-title {
				width: calc(100% - 40rpx);
				height: 100rpx;
				margin: 0 auto;
				font-size: 30rpx;
				color: #303031;
				line-height: 100rpx;
				text-indent: 10rpx;
				border-bottom: 1rpx solid @topic-split;
			}
			.notice-item-content {
				width: calc(100% - 40rpx);
				margin: 15rpx auto 30rpx auto;
				font-size: 30rpx;
				color: #a6a6a6;
				line-height: 35rpx;
			}
			.notice-item-info {
				width: calc(100% - 40rpx);
				margin: 0 auto 39rpx auto;
				display: flex;
				justify-content: flex-start;
				.notice-item-info-title {
					width: 120rpx;
					font-size: 30rpx;
					color: #a6a6a6;
					margin-right: 30rpx;
				}
				.notice-item-info-text {
					width: calc(100% - 150rpx);
					font-size: 28rpx;
					color: #000000;
				}
			}
			.notice-item-thanks {
				width: calc(100% - 40rpx);
				margin: 0 auto 40rpx auto;
				font-size: 28rpx;
				color: #000000;
			}
			.notice-item-more {
				width: calc(100% - 40rpx);
				height: 90rpx;
				margin: 0 auto;
				font-size: 28rpx;
				color: @topic-green;
				line-height: 90rpx;
				text-align: center;
				border-top: 1rpx solid @topic-split;
			}
		}
	}
}
</style>
