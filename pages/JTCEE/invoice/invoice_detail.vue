<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="invoice-detail-box">
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
				<view class="top-nav-title">{{ $t('invoice_detail.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="invoice-detail-card">
			<view class="invoice-item-top">
				<view class="invoice-item-order-id invoice-item-order-green">
					<text class="invoice-item-order-type">{{ $t('invoice_detail.id') }}：</text>
					<text class="invoice-item-order-number">ST232354565</text>
					<img class="invoice-item-order-copy" src="/static/img/JTCEE/invoice/invoice-copy.png" @click="getOrderId('ST232354565')" />
				</view>
				<view class="invoice-item-order-detail" @click="getOrderQr">
					{{ $t('invoice_detail.detail') }}
					<uni-icons class="invoice-item-order-detail-icon" type="right" size="16" color="#ffffff"></uni-icons>
				</view>
			</view>
			<view class="invoice-detail-content">
				<view class="invoice-detail-status">
					<view class="invoice-detail-status-text">已签收</view>
					<view class="invoice-detail-status-time">
						<text>{{ $t('invoice_detail.time') }}：</text>
						<text>2022-06-18 16:16</text>
					</view>
				</view>
				<view class="invoice-detail-line"></view>
				<view class="invoice-detail-address">
					<view class="invoice-item-info-address">
						<text>南京市</text>
						<text>何瑞</text>
					</view>
					<view class="invoice-item-info-address-status"><img src="/static/img/JTCEE/invoice/invoice-arrow-grey.png" /></view>
					<view class="invoice-item-info-address">
						<text>南京市</text>
						<text>何瑞</text>
					</view>
				</view>
			</view>
		</view>
		<view class="invoice-detail-info">
			<view class="invoice-detail-info-card" v-for="(item, index) in expressListData" :key="index">
				<view class="invoice-detail-info-card-left">
					<view
						class="invoice-detail-info-card-icon"
						:class="{
							'invoice-detail-info-card-icon-green': index < 1,
							'invoice-detail-info-card-icon-orange': (index > 1) & (index < 5),
							'invoice-detail-info-card-icon-red': index === 1,
							'invoice-detail-info-card-icon-grey': index >= 5
						}"
					>
						<img src="/static/img/JTCEE/invoice/invoice_yqs.png" v-if="item.status === 1" />
						<img src="/static/img/JTCEE/invoice/invoice_yn.png" v-if="item.status === 2"/>
						<img src="/static/img/JTCEE/invoice/invoice_zl.png" v-if="item.status === 3"/>
						<img src="/static/img/JTCEE/invoice/invoice_cswqs.png" v-if="item.status === 4"/>
						<img src="/static/img/JTCEE/invoice/invoice_jq.png" v-if="item.status === 5"/>
						<img src="/static/img/JTCEE/invoice/invoice_th.png" v-if="item.status === 6"/>
						<img src="/static/img/JTCEE/invoice/invoice_dqj.png" v-if="item.status === 7"/>
						<img src="/static/img/JTCEE/invoice/invoice_psz.png" v-if="item.status === 8"/>
						<img src="/static/img/JTCEE/invoice/invoice_ysz.png" v-if="item.status === 9"/>
						<img src="/static/img/JTCEE/invoice/invoice_qgz.png" v-if="item.status === 10"/>
						<img src="/static/img/JTCEE/invoice/invoice_yqs.png" v-if="item.status === 11"/>
						<img src="/static/img/JTCEE/invoice/invoice_yck.png" v-if="item.status === 12"/>
						<img src="/static/img/JTCEE/invoice/invoice_yls.png" v-if="item.status === 13"/>
						<img src="/static/img/JTCEE/invoice/invoice_lsz.png" v-if="item.status === 14"/>
						<img src="/static/img/JTCEE/invoice/invoice_yld.png" v-if="item.status === 15"/>
						<img src="/static/img/JTCEE/invoice/invoice_ldz.png" v-if="item.status === 16"/>
					</view>
					<view class="invoice-detail-info-card-line"></view>
				</view>
				<view class="invoice-detail-info-card-right">
					<text>{{ item.title }}</text>
					<text>{{ item.create_time }}</text>
					<text>{{ item.content }}</text>
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
			// 运单详情数据
			expressListData: [
				{
					title: '已签收',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已签收，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 1
				},
				{
					title: '疑难',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件发生疑难，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 2
				},
				{
					title: '滞留',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件发生滞留，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 3
				},
				{
					title: '超时未签收',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件超时未签收，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 4
				},
				{
					title: '拒签',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已拒签，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 5
				},
				{
					title: '退回',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已退回，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 6
				},
				{
					title: '待取件',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件待取件，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 7
				},
				{
					title: '派送中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件派送中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 8
				},
				{
					title: '运输中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件运输中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 9
				},
				{
					title: '清关中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件清关中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 10
				},
				{
					title: '已出库',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已出库，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 11
				},
				{
					title: '出库中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件出库中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 12
				},
				{
					title: '已揽收',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已揽收，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 13
				},
				{
					title: '揽收中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件揽收中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 14
				},
				{
					title: '已录单',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件已录单，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 15
				},
				{
					title: '录单中',
					create_time: '2022-06-18 18:06:57',
					content: '您的快件录单中，如有疑问请电联快递员[何瑞瑞， 电话18866661111]。感谢您使用神鹰快递，期待再次为您服务。',
					status: 16
				}
			]
		};
	},
	methods: {
		goBack() {
			let fromType = this.fromType;
			uni.redirectTo({
				url: `/pages/JTCEE/invoice/invoice_index?fromType=${fromType}`
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
		getOrderQr() {
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/invoice/invoice_qr?fromType=${fromType}`
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');
@import url('@/pages/JTCEE/invoice/style/invoice-common.less');

.invoice-detail-box {
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

	.invoice-detail-card {
		width: calc(100% - @base-gap * 2);
		height: 220rpx;
		background: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		.invoice-detail-content {
			width: 100%;
			height: calc(100% - 60rpx);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.invoice-detail-status {
				width: calc(50% - @invoice-detail-line-width);
				height: 100%;
				.invoice-detail-status-text {
					font-size: 34rpx;
					color: #000000;
					text-align: center;
					margin-top: 35rpx;
				}
				.invoice-detail-status-time {
					font-size: 24rpx;
					color: #888888;
					text-align: center;
					margin: 15rpx 0 0 0;
				}
			}
			@invoice-detail-line-width: 1px;
			.invoice-detail-line {
				width: @invoice-detail-line-width;
				height: 120rpx;
				background-color: @topic-split;
			}
			@invoice-detail-address-padding: 15rpx;
			.invoice-detail-address {
				width: calc(50% - @invoice-detail-address-padding * 2 - @invoice-detail-line-width);
				height: 100%;
				padding: 0 @invoice-detail-address-padding;
				margin-top: 70rpx;
				display: flex;
				justify-content: space-between;
				.invoice-item-info-address-status {
					width: 60rpx;
					margin-top: 30rpx;
					img {
						height: 15rpx;
					}
				}
				.invoice-item-info-address {
					text:nth-child(2) {
						margin-top: 12rpx;
					}
				}
			}
		}
	}

	.invoice-detail-info {
		width: calc(100% - @base-gap * 2);
		padding: 30rpx 0;
		background: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		.invoice-detail-info-card {
			width: calc(100% - 50rpx);
			margin: 0 auto 50rpx auto;
			display: flex;
			justify-content: space-between;
			.invoice-detail-info-card-left {
				width: 50rpx;
				margin: 0 20rpx 0 0;
				.invoice-detail-info-card-icon {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 45rpx;
						height: 45rpx;
					}
				}
				.invoice-detail-info-card-icon-green {
					background-color: @topic-green;
				}
				.invoice-detail-info-card-icon-orange {
					background-color: #f8bb32;
				}
				.invoice-detail-info-card-icon-red {
					background-color: #ff5147;
				}
				.invoice-detail-info-card-icon-grey {
					background-color: #e9e9e9;
				}
				.invoice-detail-info-card-line {
					width: 8rpx;
					height: calc(100% - 50rpx);
					margin: 20rpx auto 0 auto;
					background: linear-gradient(to bottom, #e9e9e9 0%, #e9e9e9 50%, transparent 50%);
					background-size: 10rpx 20rpx;
					background-repeat: repeat-y;
				}
			}
			.invoice-detail-info-card-right {
				text {
					display: block;
					width: 100%;
				}
				text:nth-child(1) {
					color: #313131;
					font-size: 30rpx;
				}
				text:nth-child(2) {
					color: #000000;
					font-size: 28rpx;
					margin-top: 20rpx;
				}
				text:nth-child(3) {
					color: #000000;
					font-size: 26rpx;
					margin-top: 15rpx;
				}
			}
		}
	}
}
</style>
