<template>
	<view class="address-box">
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
				<view class="top-nav-title">{{ $t('address_index.tilte') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake top-nav-fake-high"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
			
			<!-- 搜索框 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-search">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input
						class="uni-input nav-search-input"
						confirm-type="search"
						:placeholder="$t('top.nav.search.placeholder')"
						placeholder-class="nav-input-placeholder"
					/>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-search top-nav-search-wx" :style="{ '--topnavsearchtop': topNavSearchTop }">
				<view class="nav-search-box">
					<uni-icons class="nav-search-icon" type="search" size="23" color="#A0A0A0"></uni-icons>
					<input
						class="uni-input nav-search-input"
						confirm-type="search"
						:placeholder="$t('top.nav.search.placeholder')"
						placeholder-class="nav-input-placeholder"
					/>
				</view>
			</view>
			<!-- #endif -->
			
			<!-- tab栏 -->
			<!-- #ifdef H5 -->
			<view class="top-nav-tab">
				<v-tabs class="nav-tab-box nav-tab-box-two" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.2" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="top-nav-tab top-nav-tab-wx" :style="{ '--topnavtabtop': topNavTabTop }">
				<v-tabs class="nav-tab-box nav-tab-box-two" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.2" @change="changeTab"></v-tabs>
			</view>
			<!-- #endif -->
		</view>
		<view class="address-pull-index">
			<uni-swipe-action>
				<view class="address-pull-item" v-for="(num, index) in listData" :key="index">
					<uni-swipe-action-item
						class="address-pull-item-swiper-action"
						:right-options="index === 1 ? swiperActionOptionsDefault : swiperActionOptions"
						:auto-close="true"
						@click="bindSwiperActionClick"
					>
						<view class="address-pull-item-box">
							<view class="address-pull-item-top">
								<view class="address-pull-item-top-left">
									<img class="address-pull-item-top-icon" src="/static/img/JTCEE/address/address-user-send.png" v-if="tabCurrentIndex === 0" />
									<img class="address-pull-item-top-icon" src="/static/img/JTCEE/address/address-user-get.png" v-if="tabCurrentIndex === 1" />
									<text class="address-pull-item-top-name">张三</text>
									<text class="address-pull-item-top-phone">139 9932 3245</text>
								</view>
								<view class="address-pull-item-top-default" v-if="index === 1">{{ $t('address_index.card.default.address') }}</view>
							</view>
							<view class="address-pull-item-bottom">
								<view class="address-pull-item-address" v-if="tabCurrentIndex === 0">上海市上海市青浦区朱家镇康耶鲁180号半山国际2单元309室上海市上海市青浦区朱家镇康耶鲁180号半山国际2单元309室</view>
								<view class="address-pull-item-address" v-if="tabCurrentIndex === 1">日本東京都台東区浅草橋2丁目29番11号マルケービル9階</view>
								<view class="address-pull-item-edit" @click="editAddress"><img src="/static/img/JTCEE/address/address-edit.png" /></view>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<view class="uni-loadmore common-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
		<view class="bottom-gap bottom-gap-address"></view>
		<view class="bottom-menu bottom-menu-address">
			<view class="bottom-menu-btn" @click="addAddresss">
				<uni-icons type="plusempty" size="14" color="#ffffff"></uni-icons>
				<text class="bottom-menu-btn-text">{{ $t('address_index.button.add.address') }}</text>
			</view>
		</view>
	</view>
</template>
<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import vTabs from '@/uni_modules/v-tabs/v-tabs.vue';
import uniSwipeAction from '@/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue';
import pxToRpx from '@/static/utils/px-to-rpx.js';
export default {
	components: {
		uniIcons,
		vTabs,
		uniSwipeAction
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
			// 下拉刷新上拉加载相关数据
			listData: [],
			loadMoreText: this.$t('pull.refresh.loading'),
			showLoadMore: false,
			maxDataIndex: 0,
			// tab索引
			tabCurrentIndex: 0,
			// tab数据
			tabDataList: [this.$t('address_index.tab.user.send'), this.$t('address_index.tab.user.get')],
			// 滑动卡片按钮数据
			swiperActionOptions: [
				{
					text: this.$t('address_index.setting.default.address'),
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: this.$t('address_index.setting.default.delete'),
					style: {
						backgroundColor: '#FF5147'
					}
				}
			],
			swiperActionOptionsDefault: [
				{
					text: this.$t('address_index.setting.default.delete'),
					style: {
						backgroundColor: '#FF5147'
					}
				}
			],
			// 是否滑动打开
			isSwiperActionOpened: false
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
		this.topNavSearchTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 88 + 'rpx';
		this.topNavTabTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 166 + 'rpx';
	},
	onLoad() {
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
			uni.redirectTo({
				url: '/pages/JTCEE/user/user_index'
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
			// uni.startPullDownRefresh();
			this.initData();
		},
		bindSwiperActionClick(e) {
			console.log(e);
			uni.showToast({
				title: `点击了${e.content.text}按钮，功能开发中，敬请期待！`,
				icon: 'none',
				duration: 1998
			});
		},
		editAddress() {
			uni.navigateTo({
				url: '/pages/JTCEE/address/address_add?useType=2'
			});
		},
		addAddresss() {
			uni.navigateTo({
				url: '/pages/JTCEE/address/address_add?useType=1'
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.address-box {
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
		
		.top-nav-search-wx {
			top: var(--topnavsearchtop);
		}
		.top-nav-tab-wx {
			top: var(--topnavtabtop)
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

	.address-pull-index {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto;
		.address-pull-item {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 25rpx;
			.address-pull-item-swiper-action {
				width: 100%;
				border-radius: 20rpx;
			}
			.address-pull-item-box {
				width: calc(100% - 60rpx);
				padding-bottom: 40rpx;
				border-radius: 20rpx;
				margin: 0 auto;
				.address-pull-item-top {
					width: 100%;
					padding: 33rpx 0 29rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.address-pull-item-top-left {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						color: #313131;
						.address-pull-item-top-icon {
							width: 36rpx;
							height: 36rpx;
							margin-right: 27rpx;
						}
						.address-pull-item-top-name {
							width: 110rpx;
							font-size: 32rpx;
						}
						.address-pull-item-top-phone {
							font-size: 28rpx;
						}
					}
					.address-pull-item-top-default {
						font-size: 24rpx;
						color: @topic-green;
						position: relative;
						top: -10rpx;
					}
				}
				.address-pull-item-bottom {
					width: calc(100% - 59rpx);
					padding-left: 59rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.address-pull-item-address {
						width: calc(100% - 105rpx);
						font-size: 24rpx;
						color: #2e3031;
						line-height: 32rpx;
					}
					.address-pull-item-edit {
						width: 58rpx;
						height: 58rpx;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
