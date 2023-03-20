<template>
	<view class="goods-box">
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
				<view class="top-nav-title">{{ $t('goods_choose.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake top-nav-fake-middle"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>

			<!-- 搜索框 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-search">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-search top-nav-search-wx" :style="{ '--topnavsearchtop': topNavSearchTop }">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input class="uni-input nav-search-input" confirm-type="search" :placeholder="$t('top.nav.search.placeholder')" placeholder-class="nav-input-placeholder" />
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="goods-pull-index">
			<view class="goods-pull-item" v-for="(num, index) in listData" :key="index" @click="goBack">
				<view class="goods-pull-item-box">
					<view class="goods-pull-item-left"><img src="/static/img/JTCEE/user/user-head.png" /></view>
					<view class="goods-pull-item-right">
						<view class="goods-pull-item-title">任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有</view>
						<view class="goods-pull-item-type">
							<text class="goods-pull-item-type-text goods-pull-item-type-orange" v-if="index < 2 || index % 2 === 0">{{ $t('goods_index.goods.status.no') }}</text>
							<text class="goods-pull-item-type-text goods-pull-item-type-green" v-if="(index >= 2) & (index % 2 !== 0)">
								{{ $t('goods_index.goods.status.yes') }}
							</text>
						</view>
						<view class="goods-pull-item-money">￥ 1999.99</view>
					</view>
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
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
import pxToRpx from '@/static/utils/px-to-rpx.js';
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
			// 适配微信的searchbox和tabbox
			topNavSearchTop: 0,
			// 下拉刷新上拉加载相关数据
			listData: [],
			loadMoreText: this.$t('pull.refresh.loading'),
			showLoadMore: false,
			maxDataIndex: 0,
			// 上一个页面的返回类型，参考上一个页面说明
			fromType: '1',
			// 从什么地方进入的商品添加，1.寄件 2.包裹预报
			chooseType: '1'
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
		this.topNavSearchTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 88 + 'rpx';
	},
	onLoad(option) {
		this.initData();

		this.fromType = option.fromType;
		this.chooseType = option.chooseType;
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
			if (this.chooseType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/express/express_send'
				});
			} else if (this.chooseType === '2') {
				uni.redirectTo({
					url: `/pages/JTCEE/package/package_add?fromType=${fromType}`
				});
			} else {
				this.$refs.popup.open();
			}
		},
		initData() {
			setTimeout(() => {
				this.maxDataIndex = 0;
				this.listData = [];
				let data = [];
				this.maxDataIndex += 10;
				for (var i = this.maxDataIndex - 9; i < this.maxDataIndex + 1; i++) {
					data.push(i);
				}
				this.listData = this.listData.concat(data);
				uni.stopPullDownRefresh();
			}, 300);
		},
		setListData() {
			let data = [];
			this.maxDataIndex += 10;
			for (var i = this.maxDataIndex - 9; i < this.maxDataIndex + 1; i++) {
				data.push(i);
			}
			this.listData = this.listData.concat(data);
		},
		getGoodsAndBack() {
			// 这里的解析后续如果数据结构复杂，考虑使用vuex
			
			// #ifdef H5
			localStorage.setItem('key', 'value');
			console.log(localStorage.getItem('key'));
			// #endif
			
			// 微信端不支持localStorage
			// #ifdef MP-WEIXIN
			wx.setStorage({
				key: 'key',
				data: 'value'
			});
			wx.getStorage({
				key: 'key',
				success(res) {
					console.log(res.data);
				}
			});
			// #endif

			let fromType = this.fromType;
			if (this.chooseType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/express/express_send'
				});
			} else if (this.chooseType === '2') {
				uni.redirectTo({
					url: `/pages/JTCEE/package/package_add?fromType=${fromType}`
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

.goods-box {
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

		.top-nav-search {
			padding-bottom: 27rpx;
		}

		.top-nav-search-wx {
			top: var(--topnavsearchtop);
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

	.goods-pull-index {
		width: calc(100% - @base-gap * 2);
		margin: 50rpx auto 0 auto;
		.goods-pull-item {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 25rpx;
			.goods-pull-item-swiper-action {
				width: 100%;
				border-radius: 20rpx;
			}
			.goods-pull-item-box {
				// width: calc(100% - 40rpx);
				padding: 25rpx;
				border-radius: 20rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				@goods-img-size: 180rpx;
				.goods-pull-item-left {
					width: @goods-img-size;
					height: @goods-img-size;
					img {
						width: 100%;
						height: 100%;
					}
				}
				@goods-text-margin-top: 15rpx;
				.goods-pull-item-right {
					width: calc(100% - @goods-img-size - 60rpx);
					.goods-pull-item-title {
						font-size: 28rpx;
						color: #313131;
						.text-ellipsis-two();
					}
					.goods-pull-item-type {
						width: 120rpx;
						height: 40rpx;
						margin-top: @goods-text-margin-top;
						.goods-pull-item-type-text {
							width: 100%;
							height: 100%;
							display: inline-block;
							border-radius: 8rpx;
							font-size: 24rpx;
							text-align: center;
							line-height: 40rpx;
						}
						.goods-pull-item-type-orange {
							background: rgba(248, 187, 50, 0.15);
							color: #f8bb32;
						}
						.goods-pull-item-type-green {
							background: rgba(91, 199, 151, 0.15);
							color: @topic-green;
						}
					}
					.goods-pull-item-money {
						font-size: 38rpx;
						color: #ff5147;
						margin-top: @goods-text-margin-top;
					}
				}
			}
		}

		@goods-pull-item-check-width: 108rpx;
		.goods-pull-item-check {
			display: flex;
			justify-content: space-between;
			.goods-pull-item-checkbox {
				width: @goods-pull-item-check-width;
				display: flex;

				align-items: center;
				.goods-pull-item-label {
					margin: 0 auto;
				}
			}
			.goods-pull-item-box {
				width: calc(100% - @goods-pull-item-check-width);
				padding-left: 0;
				@goods-img-size: 180rpx;
				.goods-pull-item-left {
					width: @goods-img-size;
				}
				.goods-pull-item-right {
					width: calc(100% - @goods-img-size - 20rpx);
				}
			}
		}
	}
}
</style>
