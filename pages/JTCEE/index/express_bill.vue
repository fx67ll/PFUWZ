<template>
	<view class="bill-box">
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
				<view class="top-nav-title">{{ $t('express_bill.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="bill-address">
			<view class="bill-address-item">
				<view class="bill-address-item-left">
					<view class="bill-address-item-img"><img src="/static/img/JTCEE/index/bill-shop.png" /></view>
					<view class="bill-address-item-title">{{ $t('express_bill.form.shop') }}</view>
				</view>
				<view class="bill-address-item-right">
					<picker @change="bindShopPickerChange" :value="billShopIndex" :range="billShopData">
						<view :class="billShopIndex === -1 ? 'bill-address-item-text-placeholder' : 'bill-address-item-text'">
							{{ billShopIndex === -1 ? $t('express_bill.picker.placeholder') : billShopData[billShopIndex] }}
						</view>
					</picker>
					<uni-icons class="bill-address-item-icon" type="right" size="18" color="#BFBFBF"></uni-icons>
				</view>
			</view>
			<view class="bill-address-item">
				<view class="bill-address-item-left">
					<view class="bill-address-item-img"><img src="/static/img/JTCEE/index/bill-express.png" /></view>
					<view class="bill-address-item-title">{{ $t('express_bill.form.express') }}</view>
				</view>
				<view class="bill-address-item-right">
					<picker @change="bindExpressPickerChange" :value="billExpressIndex" :range="billExpressData">
						<view :class="billExpressIndex === -1 ? 'bill-address-item-text-placeholder' : 'bill-address-item-text'">
							{{ billExpressIndex === -1 ? $t('express_bill.picker.placeholder') : billExpressData[billExpressIndex] }}
						</view>
					</picker>
					<uni-icons class="bill-address-item-icon" type="right" size="18" color="#BFBFBF"></uni-icons>
				</view>
			</view>
		</view>
		<view class="bill-count">
			<view class="form-picker">
				<view class="form-picker-title">{{ $t('express_bill.form.time') }}</view>
				<view class="form-picker-choose">
					<!-- #ifdef MP-WEIXIN -->
					<picker mode="date" :value="expressDate" :start="expressStartDate" :end="expressEndDate" @change="bindExpressDateChange">
						<view :class="expressDate === 1 ? 'form-picker-text-placeholder' : 'form-picker-text'">
							{{ expressDate === 1 ? $t('express_bill.picker.placeholder') : expressDate }}
						</view>
					</picker>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<!-- uni-datetime-picker貌似不支持日语国际化，如果有要求可以重新启用上面那个选择 -->
					<uni-datetime-picker class="form-picker-date" type="date" :clear-icon="false" :border="false" v-model="expressDateWx" @change="bindExpressDateChangeWx" />
					<!-- #endif -->
					<uni-icons class="form-picker-icon" type="right" size="18" color="#BFBFBF"></uni-icons>
				</view>
			</view>
			<view class="form-number">
				<view class="form-number-title">{{ $t('express_bill.form.weight') }}（kg）</view>
				<uni-number-box :value="billExpressWeight"></uni-number-box>
			</view>
			<view class="form-volume">
				<view class="form-volume-top">
					<view class="form-volume-title">{{ $t('express_bill.form.volume') }}（m³）</view>
					<!-- <view class="form-volume-count">0</view> -->
					<uni-number-box :disabled="true" :value="billExpressVolume"></uni-number-box>
				</view>
				<view class="form-volume-bottom">
					<view class="form-volume-item">
						<input class="uni-input form-volume-item-input" type="number" :placeholder="$t('express_bill.form.volume.long')" />
						<text class="form-volume-item-text">
							CM
							<uni-icons class="form-volume-item-icon" type="closeempty" size="16" color="#313131"></uni-icons>
						</text>
					</view>
					<view class="form-volume-item">
						<input class="uni-input form-volume-item-input" type="number" :placeholder="$t('express_bill.form.volume.wide')" />
						<text class="form-volume-item-text">
							CM
							<uni-icons class="form-volume-item-icon" type="closeempty" size="16" color="#313131"></uni-icons>
						</text>
					</view>
					<view class="form-volume-item">
						<input class="uni-input form-volume-item-input" type="number" :placeholder="$t('express_bill.form.volume.high')" />
						<text class="form-volume-item-text">CM</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bill-submit" @click="getForecastPrice">{{ $t('express_bill.form.search') }}</view>
		<view class="bill-catagory">
			<view class="bill-catagory-tips">{{ $t('express_bill.catagory.tip') }}</view>
			<view class="bill-catagory-card">
				<v-tabs v-model="tabCurrentIndex" :tabs="tabDataList" :itemWidth="tabItemWidth" @change="changeTab"></v-tabs>
				<view class="bill-catagory-content">
					<swiper :current="tabCurrentIndex" circular :disable-touch="true" :indicator-dots="false" :duration="300">
						<swiper-item v-for="(num, index) in tabDataList" :key="index">
							<view class="bill-catagory-info">
								<view class="bill-catagory-info-type">{{ $t('express_bill.catagory.type') }}</view>
								<view class="bill-catagory-info-bottom">
									<view class="bill-catagory-info-left">
										<view class="bill-catagory-info-time">{{ nowDateTime }}</view>
										<view class="bill-catagory-info-text">{{ $t('express_bill.catagory.info') }}</view>
									</view>
									<view class="bill-catagory-info-right">
										<view class="bill-catagory-info-money">
											{{ Math.round(Math.random() * (999999 - 1) + 1) }}
											<text class="bill-catagory-info-unit">{{ $t('express_bill.catagory.unit') }}</text>
										</view>
										<view class="bill-catagory-info-money-text">{{ $t('express_bill.catagory.unit.text') }}</view>
									</view>
								</view>
							</view>
							<view class="bill-catagory-info-more" @click="getMoreInfo(index)">
								{{ $t('express_bill.catagory.more') }}
								<uni-icons class="bill-catagory-info-more-icon" type="info" size="18" color="#BFBFBF"></uni-icons>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import uniNumberBox from '@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue';
import vTabs from '@/uni_modules/v-tabs/v-tabs-fx67ll.vue';
import { getDate, currentDate } from '@/static/utils/uni-date-picker.js';
import uniDatetimePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue';
import moment from '@/node_modules/moment';
import pxToRpx from '@/static/utils/px-to-rpx.js';
export default {
	components: {
		uniIcons,
		uniNumberBox,
		vTabs,
		uniDatetimePicker
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';

		// 计算tab栏的宽度rpx值
		let windowWidthRpx = pxToRpx(uni.getWindowInfo().windowWidth);
		this.tabItemWidth = Math.floor((windowWidthRpx - 100) / 3) + 'rpx';
		// console.log(this.tabItemWidth);
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 代理店数据
			billShopData: ['代理店一', '代理店二', '代理店三'],
			// 代理店索引
			billShopIndex: -1,
			// 落地配数据
			billExpressData: ['落地配一', '落地配二', '落地配三'],
			// 落地配索引
			billExpressIndex: -1,
			// 寄件时间
			// expressDate: 1,  // 如果客户要先显示请选择就放开这里，目前是自动显示当天日期
			expressDate: currentDate,
			expressDateWx: moment().format('YYYY-MM-DD'),
			// 寄件重量
			billExpressWeight: 0,
			// 寄件体积
			billExpressVolume: 0,
			// tab索引
			tabCurrentIndex: 0,
			// tab数据
			tabDataList: [this.$t('express_bill.catagory.sundry.goods'), this.$t('express_bill.catagory.special.line'), this.$t('express_bill.catagory.high.weight')],
			// tab宽度，根据需要自行计算
			tabItemWidth: '216rpx',
			// tab说明图片地址
			tabImgUrlList: ['/static/img/JTCEE/page/bill-sundry-goods.jpg', '/static/img/JTCEE/page/bill-special-line.png', '/static/img/JTCEE/page/bill-high-weight.png'],
			// tab说明图片地址，微信必须使用http或者https的图片网络地址
			tabImgUrlListWx: ['/static/img/JTCEE/page/bill-sundry-goods.jpg', '/static/img/JTCEE/page/bill-special-line.png', '/static/img/JTCEE/page/bill-high-weight.png'],
			// 当前日期时间
			nowDateTime: moment().format('YYYY-MM-DD HH:mm')
		};
	},
	computed: {
		expressStartDate() {
			return getDate('start');
		},
		expressEndDate() {
			return getDate('end');
		}
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/index/index'
			});
		},
		bindShopPickerChange: function(e) {
			console.log('代理店picker发送选择改变，携带值为', e.detail.value);
			this.billShopIndex = e.detail.value;
		},
		bindExpressPickerChange: function(e) {
			console.log('落地配picker发送选择改变，携带值为', e.detail.value);
			this.billExpressIndex = e.detail.value;
		},
		// 微信小程序特供
		bindExpressDateChange: function(e) {
			console.log('寄件时间picker发送选择改变，携带值为', e.detail.value);
			this.expressDate = e.detail.value;
		},
		// h5特供
		bindExpressDateChangeWx(e) {
			console.log('寄件时间picker发送选择改变，携带值为', e);
			this.expressDateWx = e;
		},
		getForecastPrice() {
			console.log('正在查询预测价格ing...');
		},
		changeTab(index) {
			console.log('当前选中的项：' + index);
		},
		getMoreInfo(index) {
			// #ifdef H5
			let imgurl = this.tabImgUrlList[index];
			uni.previewImage({
				urls: [imgurl],
				longPressActions: {
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
			// #endif

			// 微信仅支持https或http网络请求的图片预览
			// #ifdef MP-WEIXIN
			let imgurlwx = this.tabImgUrlListWx[index];
			uni.previewImage({
				urls: [imgurlwx],
				longPressActions: {
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
			// #endif

			console.log('正在获取运费计费说明ing...');
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.bill-box {
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
			position: fixed;
			top: 0;
			background-color: @topic-bgc;
			z-index: -1;
		}
	}

	.bill-address {
		width: calc(100% - @base-gap * 2);
		height: 250rpx;
		background-color: #ffffff;
		margin: 25rpx auto 0 auto;
		border-radius: 20rpx;
		.bill-address-item {
			width: calc(100% - 40rpx);
			height: 50%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bill-address-item-left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.bill-address-item-img {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.bill-address-item-title {
					font-size: 32rpx;
					color: #000000;
				}
			}
			.bill-address-item-right {
				width: calc(100% - 360rpx);
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.bill-address-item-text-placeholder {
					font-size: 28rpx;
					color: #bfbfbf;
					margin-right: 20rpx;
				}
				.bill-address-item-text {
					font-size: 28rpx;
					color: #000000;
					margin-right: 20rpx;
				}
				.bill-address-item-icon {
					margin-right: 20rpx;
				}
			}
		}
		.bill-address-item:nth-child(1) {
			border-bottom: 1rpx solid @topic-split;
		}
	}

	.bill-count {
		width: calc(100% - @base-gap * 2);
		// height: 490rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		margin: 25rpx auto 0 auto;
	}

	.bill-submit {
		width: calc(100% - @base-gap * 2);
		height: 100rpx;
		margin: 50rpx auto 70rpx auto;
		border-radius: 70px;
		background: #5bc797;
		color: #ffffff;
		text-align: center;
		font-size: 34rpx;
		line-height: 100rpx;
		letter-spacing: 12rpx;
		text-indent: 12rpx;
	}

	.bill-catagory {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.bill-catagory-tips {
			font-size: 24rpx;
			color: #bfbfbf;
			margin-bottom: 15rpx;
			text-indent: 6rpx;
		}
		.bill-catagory-card {
			width: 100%;
			min-height: 350rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			.bill-catagory-content {
				width: 100%;
				height: calc(100% - 80rpx);
				.bill-catagory-info {
					width: calc(100% - 40rpx);
					background: #ffffff;
					box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1);
					border-radius: 10rpx;
					border: 1px solid rgba(0, 0, 0, 0.05);
					margin: 20rpx auto 28rpx auto;
					.bill-catagory-info-type {
						width: 148rpx;
						height: 40rpx;
						background: rgba(248, 187, 50, 0.15);
						border-radius: 0 0 10rpx 0;
						font-size: 24rpx;
						color: #f8bb32;
						text-align: center;
						line-height: 40rpx;
					}
					.bill-catagory-info-bottom {
						width: calc(100% - 40rpx);
						margin: 18rpx auto 22rpx auto;
						display: flex;
						justify-content: space-between;
						.bill-catagory-info-left {
							width: 60%;
							.bill-catagory-info-time {
								font-size: 28rpx;
								color: #303031;
							}
							.bill-catagory-info-text {
								font-size: 24rpx;
								color: #bfbfbf;
								margin-top: 8rpx;
							}
						}
						@money-font-size: 45rpx;
						.bill-catagory-info-right {
							width: 40%;
							display: flex;
							justify-content: flex-end;
							.bill-catagory-info-money {
								font-size: @money-font-size;
								color: #ed4740;
								line-height: 55rpx;
								.bill-catagory-info-unit {
									font-size: calc(@money-font-size / 2);
									display: inline-block;
									margin-left: 2rpx;
								}
							}
							.bill-catagory-info-money-text {
								font-size: 26rpx;
								color: #4a4a4a;
								line-height: 70rpx;
								margin-left: 10rpx;
							}
						}
					}
				}
				.bill-catagory-info-more {
					width: calc(100% - 40rpx);
					margin: 0 auto;
					font-size: 26rpx;
					color: #bfbfbf;
					display: flex;
					align-items: center;
					.bill-catagory-info-more-icon {
						margin-left: 8rpx;
					}
				}
			}
		}
	}
}
</style>
