<template>
	<view class="invoice-box">
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
				<view class="top-nav-title">{{ $t('invoice_index.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake top-nav-fake-high"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>

			<!-- 搜索栏 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-search">
				<view class="nav-search-box-invoice">
					<view class="nav-search-box">
						<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
						<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
					</view>
					<view class="nav-search-filter" @click="showFilter">
						<text class="nav-search-filter-text">{{ $t('invoice_index.drawer.button.show') }}</text>
						<uni-icons class="nav-search-filter-icon" type="vip" size="16" color="#313131"></uni-icons>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-search top-nav-search-wx" :style="{ '--topnavsearchtop': topNavSearchTop }">
				<view class="nav-search-box-invoice">
					<view class="nav-search-box">
						<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
						<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
					</view>
					<view class="nav-search-filter" @click="showFilter">
						<text class="nav-search-filter-text">{{ $t('invoice_index.drawer.button.show') }}</text>
						<uni-icons class="nav-search-filter-icon" type="vip" size="16" color="#313131"></uni-icons>
					</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- tab栏 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-tab">
				<v-tabs class="nav-tab-box nav-tab-box-four" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.3" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-tab top-nav-tab-wx" :style="{ '--topnavtabtop': topNavTabTop }">
				<v-tabs class="nav-tab-box nav-tab-box-four" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.3" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
		</view>
		<zb-drawer-JTCEE mode="bottom" :title="$t('invoice_index.drawer.title')" :wrapperClosable="false" :visible.sync="isShowDrawer" :radius="true" :height="drawerHeight">
			<view class="drawer-item-box">
				<view class="drawer-item">
					<view class="drawer-item-title">{{ $t('invoice_index.drawer.status') }}</view>
					<view class="drawer-item-btn">
						<view class="drawer-item-btn-type" :class="{ 'drawer-item-btn-type-active': btnType === 0 }" @click="setBtnType(0)">
							{{ $t('invoice_index.drawer.status.all') }}
						</view>
						<view class="drawer-item-btn-type" :class="{ 'drawer-item-btn-type-active': btnType === 1 }" @click="setBtnType(1)">
							{{ $t('invoice_index.drawer.status.a') }}
						</view>
						<view class="drawer-item-btn-type" :class="{ 'drawer-item-btn-type-active': btnType === 2 }" @click="setBtnType(2)">
							{{ $t('invoice_index.drawer.status.b') }}
						</view>
						<view class="drawer-item-btn-type" :class="{ 'drawer-item-btn-type-active': btnType === 3 }" @click="setBtnType(3)">
							{{ $t('invoice_index.drawer.status.c') }}
						</view>
						<view class="drawer-item-btn-type" :class="{ 'drawer-item-btn-type-active': btnType === 4 }" @click="setBtnType(4)">
							{{ $t('invoice_index.drawer.status.d') }}
						</view>
					</view>
				</view>
				<view class="drawer-item">
					<view class="drawer-item-title">{{ $t('invoice_index.drawer.date') }}</view>
					<view class="drawer-item-btn">
						<view class="drawer-item-btn-date">
							<uni-icons class="drawer-item-btn-date-icon" type="calendar" size="20" color="#5BC797"></uni-icons>
							<text class="drawer-item-btn-date-text">{{ drawerDate }}</text>
						</view>
						<picker-view :indicator-style="pickerViewIndicatorStyle" :value="pickerViewValue" @change="chooseInvoiceDateChange">
							<picker-view-column>
								<view class="picker-view-item" v-for="(item, index) in pickerViewYears" :key="index">{{ item }}{{ $t('invoice_index.drawer.date.year') }}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="picker-view-item" v-for="(item, index) in pickerViewMonths" :key="index">{{ item }}{{ $t('invoice_index.drawer.date.month') }}</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
			<view class="drawer-button-box-gap"></view>
			<view class="drawer-button-box">
				<view class="drawer-button">
					<view class="drawer-button-item drawer-button-reset" @click="resetFilter">{{ $t('invoice_index.drawer.button.reset') }}</view>
					<view class="drawer-button-item drawer-button-submit" @click="submitFilter">{{ $t('invoice_index.drawer.button.submit') }}</view>
				</view>
			</view>
		</zb-drawer-JTCEE>
		<view class="invoice-index">
			<view class="invoice-item" v-for="(num, index) in listData" :key="index">
				<view class="invoice-item-top">
					<view
						class="invoice-item-order-id"
						:class="{
							'invoice-item-order-green': (index < 3) | (index > 4),
							'invoice-item-order-red': (index === 3) | ((index > 4) & (index % 3 === 1)),
							'invoice-item-order-grey': (index === 4) | ((index > 4) & (index % 3 === 0))
						}"
					>
						<text class="invoice-item-order-type" v-if="index < 1">{{ $t('invoice_index.card.id.a') }}：</text>
						<text class="invoice-item-order-type" v-if="index >= 1">{{ $t('invoice_index.card.id.b') }}：</text>
						<text class="invoice-item-order-number">ST{{ Math.round(Math.random() * (9999999999 - 1) + 1) }}</text>
						<img class="invoice-item-order-copy" src="/static/img/JTCEE/invoice/invoice-copy.png" @click="getOrderId('ST232354565')" />
					</view>
					<view class="invoice-item-order-detail" @click="getOrderDetail">
						{{ $t('invoice_index.card.detail') }}
						<uni-icons class="invoice-item-order-detail-icon" type="right" size="16" color="#ffffff"></uni-icons>
					</view>
				</view>

				<view class="invoice-item-content">
					<view class="invoice-item-address">
						<view class="invoice-item-info-address">
							<text>日本东京</text>
							<text>何瑞</text>
						</view>
						<view class="invoice-item-info-address-status">
							<img src="/static/img/JTCEE/invoice/invoice-arrow-green.png" v-if="(index < 3) | ((index > 4) & ((index + 1) % 3 === 0))" />
							<img src="/static/img/JTCEE/invoice/invoice-arrow-red.png" v-if="(index === 3) | ((index > 4) & (index % 3 === 1))" />
							<img src="/static/img/JTCEE/invoice/invoice-arrow-grey.png" v-if="(index === 4) | ((index > 4) & (index % 3 === 0))" />
							<text v-if="index < 1">{{ $t('invoice_index.card.status.a') }}</text>
							<text v-if="index === 1">{{ $t('invoice_index.card.status.b') }}</text>
							<text v-if="(index + 1) % 3 === 0">{{ $t('invoice_index.card.status.c') }}</text>
							<text v-if="(index === 3) | ((index > 4) & (index % 3 === 1))">{{ $t('invoice_index.card.status.d') }}</text>
							<text v-if="(index === 4) | ((index > 4) & (index % 3 === 0))">{{ $t('invoice_index.card.status.e') }}</text>
						</view>
						<view class="invoice-item-info-address">
							<text>南京市</text>
							<text>何瑞</text>
						</view>
					</view>
					<view class="invoice-item-text">
						<text class="invoice-item-text-black" v-if="(index === 1) | ((index + 1) % 3 === 0)">物流：</text>
						<text class="invoice-item-text-grey" v-if="index < 1">请及时支付您的订单，防止寄件失败。</text>
						<text class="invoice-item-text-grey" v-if="index === 1">包裹已出库</text>
						<text class="invoice-item-text-grey" v-if="(index + 1) % 3 === 0">您的包裹已到达菜鸟驿站，请及时处理</text>
						<text class="invoice-item-text-grey" v-if="(index === 3) | ((index > 4) & (index % 3 === 1))">
							您的快递物流状态存在问题，请及时联系门店人员或拨打客服电话进行处理！
						</text>
						<text class="invoice-item-text-grey" v-if="(index === 4) | ((index > 4) & (index % 3 === 0))">订单已取消</text>
					</view>
					<view class="invoice-item-time">
						<text>{{ $t('invoice_index.card.time') }}：</text>
						<text>{{ nowDateTime }}</text>
					</view>
				</view>

				<view class="invoice-item-btn" v-if="index !== 1">
					<view class="invoice-item-btn-order" @click="reOrder" v-if="(index === 4) | ((index > 4) & (index % 3 === 0))">{{ $t('invoice_index.card.button.a') }}</view>
					<view class="invoice-item-btn-order" @click="deleteOrder" v-if="index > 1">{{ $t('invoice_index.card.button.b') }}</view>
					<view class="invoice-item-btn-order" @click="cancleOrder" v-if="index < 1">{{ $t('invoice_index.card.button.c') }}</view>
					<view class="invoice-item-btn-order invoice-item-btn-pay" @click="payOrderNow" v-if="index < 1">{{ $t('invoice_index.card.button.d') }}</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore common-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
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
import vTabs from '@/uni_modules/v-tabs/v-tabs.vue';
import { dataYears, dataMonths, pickerViewMonth } from '@/static/utils/uni-date-picker.js';
import pxToRpx from '@/static/utils/px-to-rpx.js';
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
import moment from '@/node_modules/moment';
export default {
	components: {
		uniIcons,
		vTabs,
		uniPopup
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 适配微信的searchbox和tabbox
			topNavSearchTop: 0,
			topNavTabTop: 0,
			// 首页或者我的进入
			fromType: '1',
			// 下拉刷新上拉加载相关数据
			listData: [],
			loadMoreText: this.$t('pull.refresh.loading'),
			showLoadMore: false,
			maxDataIndex: 0,
			// tab索引
			tabCurrentIndex: 0,
			// tab数据
			tabDataList: ['待支付', '进行中', '已完成', '问题件'],
			// 是否显示筛选框
			isShowDrawer: false,
			// 筛选框高度
			drawerHeight: '81%',
			// 筛选框日期数据
			drawerDate: '',
			// 运单状态筛选按钮激活类型
			btnType: 0,
			// 运单日期筛选picker-view数据
			pickerViewYears: dataYears,
			pickerViewMonths: dataMonths,
			pickerViewValue: [9999, pickerViewMonth - 1],
			pickerViewIndicatorStyle: 'height: 100rpx;',
			// 当前日期时间
			nowDateTime: moment().format('YYYY-MM-DD HH:mm')
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
		this.topNavSearchTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 88 + 'rpx';
		this.topNavTabTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 166 + 'rpx';
	},
	onLoad(option) {
		this.fromType = option.fromType;
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
		},
		changeTab(index) {
			console.log('当前选中的项：' + index);
		},
		showFilter() {
			this.isShowDrawer = true;
		},
		setBtnType(val) {
			if (this.btnType === val) {
				this.btnType = -1;
			} else {
				this.btnType = val;
			}
		},
		chooseInvoiceDateChange(e) {
			let pickerVal = e.detail.value;
			this.drawerDate = this.pickerViewYears[pickerVal[0]] + '-' + this.pickerViewMonths[pickerVal[1]];
		},
		resetFilter() {
			this.btnType = 0;
			this.pickerViewValue = [9999, pickerViewMonth - 1];
		},
		submitFilter() {
			this.isShowDrawer = false;
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
		getOrderDetail() {
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/invoice/invoice_detail?fromType=${fromType}`
			});
		},
		reOrder() {
			console.log('重新寄件中ing...');
			this.showTestToast(0);
		},
		deleteOrder() {
			let self = this;
			uni.showModal({
				title: self.$t('invoice_index.modal.delete.title'),
				content: `${self.$t('invoice_index.modal.delete.content')}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						self.showTestToast(0);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		cancleOrder() {
			let self = this;
			uni.showModal({
				title: self.$t('invoice_index.modal.cancle.title'),
				content: `${self.$t('invoice_index.modal.cancle.content')}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						self.showTestToast(0);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		payOrderNow() {
			console.log('支付寄件订单ing...');
			this.showTestToast(0);
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');
@import url('@/pages/JTCEE/invoice/style/invoice-common.less');

.invoice-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: calc(@base-bottom-gap - 30rpx);

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

		.top-nav-search-wx {
			top: var(--topnavsearchtop);
		}
		.top-nav-tab-wx {
			top: var(--topnavtabtop);
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

	.invoice-index {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.invoice-item {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 25rpx;

			.invoice-item-content {
				width: 100%;
				min-height: 237rpx;
				padding-bottom: 30rpx;
				.invoice-item-address {
					width: 72%;
					margin: 50rpx auto 0 auto;
					display: flex;
					justify-content: space-between;
				}
				.invoice-item-text {
					width: calc(100% - 80rpx);
					margin: 45rpx auto 0 auto;
					font-size: 28rpx;
					.invoice-item-text-grey {
						color: #888888;
					}
					.invoice-item-text-black {
						color: #313131;
					}
				}
				.invoice-item-time {
					width: calc(100% - 80rpx);
					margin: 20rpx auto 0 auto;
					font-size: 28rpx;
					color: #313131;
				}
			}

			.invoice-item-btn {
				width: calc(100% - 40rpx);
				height: 92rpx;
				margin: 0 auto;
				border-top: 1rpx solid @topic-split;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.invoice-item-btn-order {
					width: 160rpx;
					height: 52rpx;
					background-color: #ffffff;
					border-radius: 40rpx;
					border: 1rpx solid #a6a6a6;
					color: #4a4a4a;
					font-size: 24rpx;
					text-align: center;
					line-height: 52rpx;
					margin-left: 21rpx;
				}
				.invoice-item-btn-pay {
					border: 1rpx solid @topic-green;
					color: @topic-green;
				}
			}
		}
	}
}
</style>
