<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="package-add-box">
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
				<view class="top-nav-title">{{ $t('package_detail.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>

		<view class="package-form">
			<view class="common-form-item-note">
				<view class="common-form-item-note-title package-form-item-note-title-star">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.name') }}
				</view>
				<view class="common-form-item-note-textaera package-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('package_detail.option.placeholder')" placeholder-class="form-input-placeholder" disabled />
				</view>
			</view>

			<view class="common-form-item common-form-item-nosplit">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.goods') }}
				</view>
			</view>

			<view class="common-goods-box">
				<view class="common-goods-item" v-for="(num, index) in goodsListData" :key="index">
					<view class="common-goods-img"><img src="/static/img/JTCEE/user/user-head.png" /></view>
					<view class="common-goods-content">
						<view class="common-goods-title">任天堂switch收纳包switchlite保护套ns硬包switch盒switcholed硬壳便携lite袋oled硬卡带健身环配件壳全套大各种款式均有</view>
						<uni-number-box class="common-goods-number" :value="0"></uni-number-box>
					</view>
				</view>
			</view>

			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.express.company') }}
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('package_detail.option.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
				</view>
			</view>

			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.express.id') }}
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('package_detail.option.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
				</view>
			</view>

			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.shop') }}
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('package_detail.option.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
				</view>
			</view>

			<view class="common-form-item">
				<view class="form-item-title form-item-title-long">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.is.save.pack') }}
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('package_detail.option.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
				</view>
			</view>

			<view class="common-form-item-note">
				<view class="common-form-item-note-title package-form-item-note-title">{{ $t('package_add.option.note') }}</view>
				<view class="common-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('package_detail.option.placeholder')" placeholder-class="form-input-placeholder" disabled />
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
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 商品数据
			// goodsListData: [{}, {}, {}, {}, {}],
			goodsListData: [{}]
		};
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/package/package_index'
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.package-add-box {
	width: 100%;
	height: auto;
	background-color: @topic-bgc;
	padding-bottom: calc(@base-bottom-gap - 35rpx);

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

	.package-form {
		width: calc(100% - @base-gap * 2);
		border-radius: 20rpx;
		background-color: #ffffff;
		margin: 30rpx auto 0 auto;
	}

	.package-form-item-note-title {
		height: 100rpx;
		line-height: 110rpx;
		text-indent: 10rpx;
		font-size: 28rpx;
		color: #000000;
	}
	.package-form-item-note-title-star {
		height: 100rpx;
		line-height: 110rpx;
		font-size: 28rpx;
		color: #000000;
		.package-form-must-have {
			position: relative;
			top: 4rpx;
		}
	}
	.package-form-item-note-textaera {
		padding-bottom: 0;
	}
}
</style>
