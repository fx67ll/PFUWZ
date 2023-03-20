<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="goods-catagory-box">
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
				<view class="top-nav-title">{{ $t('goods_catagory.title') }}</view>
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


		<view class="goods-collapse">
			<uni-collapse ref="collapse" v-model="collapseValue" @change="collapseChange">
				<radio-group @change="goodsCatagoryRadioChange">
					<uni-collapse-item :title="'物品大类' + (index + 1)" v-for="(num, index) in goodsCatagoryListData" :key="index">
						<view class="goods-collapse-content">
							<view class="goods-collapse-item">
								<view class="goods-collapse-item-title">{{ '物品子类' + (index + 1) + '-1' }}</view>
								<label class="goods-collapse-item-label"><radio :value="'物品小类' + (index + 1)" :checked="index === 0" color="#5BC797" /></label>
							</view>
							<view class="goods-collapse-item">
								<view class="goods-collapse-item-title">{{ '物品子类' + (index + 1) + '-2' }}</view>
								<label class="goods-collapse-item-label"><radio :value="'物品小类' + (index + 1)" :checked="index === 0" color="#5BC797" /></label>
							</view>
							<view class="goods-collapse-item">
								<view class="goods-collapse-item-title">{{ '物品子类' + (index + 1) + '-3' }}</view>
								<label class="goods-collapse-item-label"><radio :value="'物品小类' + (index + 1)" :checked="index === 0" color="#5BC797" /></label>
							</view>
						</view>
					</uni-collapse-item>
				</radio-group>
			</uni-collapse>
		</view>

		<view class="drawer-button-box-gap goods-button-box-gap"></view>
		<view class="drawer-button-box goods-button-box">
			<view class="drawer-button">
				<view class="drawer-button-item drawer-button-reset" @click="goBack">{{ $t('goods_catagory.button.cancle') }}</view>
				<view class="drawer-button-item drawer-button-submit" @click="submitChoose">{{ $t('goods_catagory.button.check') }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import pxToRpx from '@/static/utils/px-to-rpx.js';
export default {
	components: {
		uniIcons
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
		this.topNavSearchTop = pxToRpx(uni.getWindowInfo().statusBarHeight) + 88 + 'rpx';
	},
	onLoad(option) {
		if (option.fromType) {
			this.fromType = option.fromType;
		}
		this.addType = option.addType;
		this.useType = option.useType;
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 适配微信的searchbox和tabbox
			topNavSearchTop: 0,
			// 商品添加页面用途，1.添加商品 2.修改商品
			useType: '1',
			// 商品添加上一个页面的返回类型，参考上一个页面说明
			fromType: '1',
			// 从什么地方进入的商品添加，1.寄件 2.包裹预报 3.商品管理
			addType: '1',
			// 打开状态的折叠面板
			collapseValue: [],
			// 折叠面板数据
			goodsCatagoryListData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
		};
	},
	methods: {
		goBack() {
			let self = this;
			uni.redirectTo({
				url: `/pages/JTCEE/goods/goods_add?fromType=${self.fromType}&addType=${self.addType}&useType=${self.useType}`
			});
		},
		collapseChange(e) {
			console.log('当前打开的折叠面板有：' + JSON.stringify(e));
		},
		goodsCatagoryRadioChange(e) {
			console.log('addressRadio 发生 change 事件，携带值为', e.detail.value);
		},
		submitChoose() {
			let self = this;
			uni.redirectTo({
				url: `/pages/JTCEE/goods/goods_add?fromType=${self.fromType}&addType=${self.addType}&useType=${self.useType}`
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

@search-box-padding-bottom: 26rpx;

.goods-catagory-box {
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
			padding-bottom: @search-box-padding-bottom;
		}
		
		.top-nav-search-wx {
			top: var(--topnavsearchtop);
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

	.goods-collapse {
		width: calc(100% - @base-gap * 2);
		margin: calc(@search-box-padding-bottom + 25rpx) auto 0 auto;
		border-radius: 20rpx;
		overflow: hidden;
		.goods-collapse-content {
			width: calc(100% - @base-gap * 2);
			margin: 0 auto 10rpx auto;
			.goods-collapse-item {
				padding: 15rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1rpx solid @topic-split;
				.goods-collapse-item-title {
					color: @topic-green;
					font-size: 28rpx;
				}
				.goods-collapse-item-label {
					position: relative;
					left: 20rpx;
				}
			}
		}
	}

	@drawer-button-height: 76rpx;
	@drawer-button-bottom: 50rpx;
	.goods-button-box-gap {
		height: calc(@drawer-button-height + @drawer-button-bottom - 25rpx);
	}
}
</style>
