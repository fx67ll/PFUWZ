<template>
	<view class="notice-box" :style="{ '--clientheight': clientHeight }">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || H5 -->
		<view class="status-bar-wx" :style="{ '--statusbarheight': statusBarHeight }"><!-- 这里是状态栏，用于微信端的状态栏抵消 --></view>
		<!-- #endif -->
		<view class="top-nav" :style="{ '--statusbarheight': statusBarHeight }">
			<view class="top-nav-back"><uni-icons class="top-nav-back-icon" type="back" size="24" color="#242424" @click="goBack"></uni-icons></view>
			<view class="top-nav-title">{{ $t('notice_catagory.title') }}</view>
			<view class="top-nav-btn" @click="readAll">{{ $t('notice_catagory.read') }}</view>
		</view>
		<view class="top-nav-fake"></view>
		<view class="notice-catagory">
			<view class="notice-item" @click="goNoticeList(0)">
				<view class="notice-item-left"><img src="/static/img/JTCEE/notice/notice_express.png" /></view>
				<view class="notice-item-right">
					<view class="notice-item-right-top">
						<view class="notice-item-right-title">{{ $t('notice_catagory.notice.express') }}</view>
						<view class="notice-item-right-date">{{ nowDateA }}</view>
					</view>
					<view class="notice-item-right-content">每周六寄件享免费领取100元寄件礼包，更有惊喜。您有来自南京市的快递已被签收，感谢您使用。</view>
				</view>
			</view>
			<view class="notice-item" @click="goNoticeList(1)">
				<view class="notice-item-left"><img src="/static/img/JTCEE/notice/notice_office.png" /></view>
				<view class="notice-item-right">
					<view class="notice-item-right-top">
						<view class="notice-item-right-title">{{ $t('notice_catagory.notice.public') }}</view>
						<view class="notice-item-right-date">{{ nowDateB }}</view>
					</view>
					<view class="notice-item-right-content">每周六寄件享免费领取100元寄件礼包，更有惊喜。您有来自南京市的快递已被签收，感谢您使用。</view>
				</view>
			</view>
		</view>
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
import moment from '@/node_modules/moment';
export default {
	components: {
		uniIcons,
		uniPopup
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 来自哪个位置按钮，1首页，2我的
			fromType: '1',
			// 当前日期
			nowDateA: moment()
				.subtract(3, 'days')
				.format('YYYY-MM-DD'),
			nowDateB: moment().format('YYYY-MM-DD')
		};
	},
	onLoad(option) {
		this.fromType = option.fromType;
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	methods: {
		goBack() {
			if (this.fromType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/index/index'
				});
			} else if (this.fromType === '2') {
				uni.redirectTo({
					url: '/pages/JTCEE/user/user_index'
				});
			} else {
				this.$refs.popup.open();
			}
		},
		confirmErrorDialog() {
			uni.reLaunch({
				url: '/pages/JTCEE/index/index'
			});
		},
		readAll() {
			console.log('全部已读ing...');
		},
		goNoticeList(type) {
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/notice/notice_index?noticeType=${type}&fromType=${fromType}`
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.notice-box {
	width: 100%;
	height: var(--clientheight);
	background-color: @topic-bgc;

	.status-bar-wx {
		height: var(--statusbarheight);
		width: 100%;
		background-color: #ffffff;
	}
	.top-nav {
		top: var(--statusbarheight);
	}

	.notice-catagory {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.notice-item {
			width: 100%;
			height: 150rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.notice-item-left {
				width: 88rpx;
				height: 88rpx;
				margin-left: 22rpx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.notice-item-right {
				width: calc(100% - 164rpx);
				height: 88rpx;
				margin-right: 24rpx;
				.notice-item-right-top {
					width: 100%;
					height: 50%;
					display: flex;
					justify-content: space-between;
					.notice-item-right-title {
						font-size: 32rpx;
						color: #313131;
						line-height: 44rpx;
					}
					.notice-item-right-date {
						font-size: 24rpx;
						color: #838383;
						line-height: 48rpx;
					}
				}
				.notice-item-right-content {
					width: 100%;
					height: 50%;
					font-size: 26rpx;
					color: #bfbfbf;
					line-height: 54rpx;
					.text-ellipsis();
				}
			}
		}
	}
}
</style>
