<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="goods-detail-box">
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
				<view class="top-nav-title">{{ $t('goods_detail.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="goods-swiper">
			<swiper
				circular
				class="swiper"
				:indicator-dots="indicatorDots"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
				indicator-color="#d6d6d6"
				indicator-active-color="#50B38C"
			>
				<swiper-item>
					<view class="swiper-item"><img src="./img/swtich-temp-1.png" /></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img src="./img/swtich-temp-2.png" /></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img src="./img/swtich-temp-1.png" /></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><img src="./img/swtich-temp-2.png" /></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="goods-info">
			<view class="goods-price">
				<text>￥</text>
				{{ Math.round(Math.random() * (1999 - 1599) + 1599) }}
			</view>
			<view class="goods-status">
				<text class="goods-status-text goods-status-orange" v-if="1 !== 1">{{ $t('goods_index.goods.status.no') }}</text>
				<text class="goods-status-text goods-status-green">{{ $t('goods_index.goods.status.yes') }}</text>
			</view>
			<view class="goods-title">任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有</view>
		</view>
		<view class="goods-content">
			<view class="goods-content-title">{{ $t('goods_detail.content.title') }}</view>
			<view class="goods-content-title-second">
				<uni-icons class="goods-content-title-icon" type="shop" size="16" color="#242424" @click="goBack"></uni-icons>
				{{ $t('goods_detail.content.info') }}
			</view>
			<view class="goods-content-info">
				<uni-table border emptyText="暂无更多数据">
					<uni-tr>
						<uni-td class="goods-content-info-td goods-content-info-th">{{ $t('goods_detail.content.brand') }}</uni-td>
						<uni-td class="goods-content-info-td goods-content-info-tr">任天堂 Nintendo</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="goods-content-info-td goods-content-info-th">{{ $t('goods_detail.content.address') }}</uni-td>
						<uni-td class="goods-content-info-td goods-content-info-tr">日本</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="goods-content-info-td goods-content-info-th">{{ $t('goods_detail.content.catagory') }}</uni-td>
						<uni-td class="goods-content-info-td goods-content-info-tr">游戏掌机</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view class="goods-content-title-second">
				<uni-icons class="goods-content-title-icon" type="map" size="16" color="#242424" @click="goBack"></uni-icons>
				{{ $t('goods_detail.content.desc') }}
			</view>
			<view class="goods-content-desc">
				任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有
				任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有
				任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import uniTable from '@/uni_modules/uni-table/components/uni-table/uni-table.vue';
export default {
	components: {
		uniIcons,
		uniTable
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 轮播组件参数
			indicatorDots: true,
			autoplay: false,
			interval: 5000,
			duration: 500
		};
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/goods/goods_index'
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

// 卡片内容两边边距
@goods-item-gap: 50rpx;

.goods-detail-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: calc(@base-bottom-gap - 40rpx);

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

	@swiper-height: 380rpx;
	.goods-swiper {
		width: 100%;
		height: 512rpx;
		background-color: #ffffff;
		overflow: hidden;
		.swiper {
			height: 100%;
		}
		.swiper-item {
			display: block;
			height: 100%;
			line-height: calc(@swiper-height - 50rpx);
			text-align: center;
			display: flex;
			align-items: center;
			img {
				width: 85%;
				margin: 0 auto;
			}
		}
	}

	.goods-info {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		padding: 30rpx 0 35rpx 0;
		.goods-price {
			width: calc(100% - @goods-item-gap);
			margin: 0 auto;
			color: #ff5147;
			font-size: 48rpx;
			text {
				font-size: 28rpx;
				margin-right: 5rpx;
			}
		}
		.goods-status {
			width: calc(100% - @goods-item-gap);
			margin: 25rpx auto 0 auto;
			.goods-status-text {
				width: 120rpx;
				height: 40rpx;
				display: inline-block;
				text-align: center;
				line-height: 40rpx;
				font-size: 24rpx;
				border-radius: 8rpx;
			}
			.goods-status-orange {
				background: rgba(248, 187, 50, 0.15);
				color: #f8bb32;
			}
			.goods-status-green {
				background: rgba(91, 199, 151, 0.15);
				color: @topic-green;
			}
		}
		.goods-title {
			width: calc(100% - @goods-item-gap - 10rpx);
			margin: 25rpx auto 0 auto;
			font-size: 30rpx;
			color: #313131;
		}
	}

	@goods-content-margin-top: 40rpx;
	.goods-content {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		padding: 40rpx 0 35rpx 0;
		.goods-content-title {
			width: calc(100% - @goods-item-gap - 10rpx);
			margin: 0 auto;
			font-size: 24rpx;
			color: #313131;
			border-left: 6rpx solid @topic-green;
			padding-left: 10rpx;
		}
		.goods-content-title-second {
			width: calc(100% - @goods-item-gap);
			margin: @goods-content-margin-top auto 0 auto;
			color: #000000;
			font-size: 24rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.goods-content-title-icon {
				margin-right: 10rpx;
			}
		}
		.goods-content-info {
			width: calc(100% - @goods-item-gap);
			margin: calc(@goods-content-margin-top - 15rpx) auto 0 auto;
			.goods-content-info-td {
				font-size: 24rpx;
				text-indent: 25rpx;
			}
			.goods-content-info-th {
				color: #a6a6a6;
			}
			.goods-content-info-tr {
				color: #838383;
			}
		}
		.goods-content-desc {
			width: calc(100% - @goods-item-gap - 20rpx);
			margin: calc(@goods-content-margin-top - 15rpx) auto 0 auto;
			font-size: 24rpx;
			color: #838383;
		}
	}
}
</style>
