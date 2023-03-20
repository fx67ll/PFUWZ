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
				<view class="top-nav-title">{{ useType === '1' ? $t('package_add.title.add') : $t('package_add.title.edit') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>

		<view class="package-form">
			<view class="common-form-item-note">
				<view class="common-form-item-note-title-high">
					<text class="form-must-have form-textaera-must-have">*</text>
					{{ $t('package_add.option.name') }}
				</view>
				<view class="common-form-item-note-textaera package-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('package_add.option.name.placeholder')" placeholder-class="form-input-placeholder" />
				</view>
			</view>

			<view class="common-form-item common-form-item-nosplit">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.goods') }}
				</view>
				<view class="form-item-arrow" @click="addGoods">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('package_add.option.goods.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
					<uni-icons class="form-item-arrow-icon form-item-common-icon" type="shop-filled" size="18" color="#A6A6A6"></uni-icons>
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
				<picker @change="bindDeliverPickerChange" :value="deliverIndex" :range="deliverData">
					<view class="form-item-arrow">
						<input
							class="uni-input form-input-default"
							type="text"
							:placeholder="$t('package_add.option.express.company.placeholder')"
							placeholder-class="form-input-placeholder"
							disabled
							v-model="deliverData[deliverIndex]"
						/>
						<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
					</view>
				</picker>
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
						:placeholder="$t('package_add.option.express.id.placeholder')"
						placeholder-class="form-input-placeholder"
					/>
					<uni-icons class="form-item-arrow-icon" type="scan" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>

			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.shop') }}
				</view>
				<picker @change="bindDeliverShopPickerChange" :value="deliverShopIndex" :range="deliverShopData">
					<view class="form-item-arrow">
						<input
							class="uni-input form-input-default"
							type="text"
							:placeholder="$t('package_add.option.shop.placeholder')"
							placeholder-class="form-input-placeholder"
							disabled
							v-model="deliverShopData[deliverShopIndex]"
						/>
						<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
					</view>
				</picker>
			</view>

			<view class="common-form-item">
				<view class="form-item-title form-item-title-long">
					<text class="form-must-have">*</text>
					{{ $t('package_add.option.is.save.pack') }}
				</view>
				<view class="form-item-arrow">
					<checkbox-group @change="packCheckChange" class="form-radio-default">
						<label class="form-radio-default-label">
							<!-- #ifdef H5 -->
							<checkbox value="packRadio" checked="true" color="#ffffff" />
							<!-- #endif -->
							<!-- 微信暂不支持修改样式，所以暂时单独独立出 -->
							<!-- #ifdef MP-WEIXIN -->
							<checkbox value="packRadio" checked="true" />
							<!-- #endif -->
						</label>
					</checkbox-group>
				</view>
			</view>

			<view class="common-form-item-note">
				<view class="common-form-item-note-title package-form-item-note-title">{{ $t('package_add.option.note') }}</view>
				<view class="common-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('package_add.option.note.placeholder')" placeholder-class="form-input-placeholder" />
				</view>
			</view>
		</view>

		<view class="package-tip">
			<view class="package-tip-title">{{ $t('package_add.tip.title') }}：</view>
			<view class="package-tip-content">
				<text>{{ $t('package_add.tip.a') }}</text>
				<text>{{ $t('package_add.tip.b') }}</text>
				<text>{{ $t('package_add.tip.c') }}</text>
				<text>{{ $t('package_add.tip.d') }}</text>
			</view>
		</view>

		<view class="drawer-button-box-gap package-button-box-gap"></view>
		<view class="drawer-button-box package-button-box">
			<view class="drawer-button">
				<view class="drawer-button-item drawer-button-reset" @click="savePackage">{{ $t('package_add.button.save') }}</view>
				<view class="drawer-button-item drawer-button-submit" @click="submitpackage">{{ $t('package_add.button.submit') }}</view>
			</view>
		</view>

		<zb-drawer-JTCEE
			mode="bottom"
			:title="$t('express_send.drawer.a.title')"
			:wrapperClosable="false"
			:visible.sync="isShowDrawerAddGoods"
			:radius="true"
			:height="addGoodsDrawerHeight"
		>
			<view class="package-goods-add" @click="chooseRelativeGoods">{{ $t('express_send.drawer.a.add.old') }}</view>
			<view class="package-goods-add" @click="chooseNewGoods">{{ $t('express_send.drawer.a.add.new') }}</view>
		</zb-drawer-JTCEE>

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
export default {
	components: {
		uniIcons,
		uniPopup
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	onLoad(option) {
		this.fromType = option.fromType;
		this.useType = option.useType;
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 当前页面用途
			useType: '1',
			// 从首页还是包裹管理
			fromType: '1',
			// 商品数据
			// goodsListData: [{}, {}, {}, {}, {}],
			goodsListData: [{}],
			// 商品弹窗
			isShowDrawerAddGoods: false,
			addGoodsDrawerHeight: '450rpx',
			// 快递公司
			deliverData: ['快递公司一', '快递公司二', '快递公司三'],
			deliverIndex: -1,
			// 交付门店
			deliverShopData: ['交付门店一', '交付门店二', '交付门店三'],
			deliverShopIndex: -1
		};
	},
	methods: {
		goBack() {
			if (this.fromType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/index/index'
				});
			} else if (this.fromType === '2') {
				uni.redirectTo({
					url: '/pages/JTCEE/package/package_index'
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
		addGoods() {
			this.isShowDrawerAddGoods = true;
		},
		chooseRelativeGoods() {
			this.isShowDrawerAddGoods = false;
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/goods/goods_choose?chooseType=2&fromType=${fromType}`
			});
		},
		chooseNewGoods() {
			this.isShowDrawerAddGoods = false;
			let fromType = this.fromType;
			uni.navigateTo({
				url: `/pages/JTCEE/goods/goods_add?addType=2&fromType=${fromType}&useType=1`
			});
		},
		bindDeliverPickerChange(e) {
			console.log('快递公司 picker发送选择改变，携带值为', e.detail.value);
			this.deliverIndex = e.detail.value;
		},
		bindDeliverShopPickerChange(e) {
			console.log('交付门店 picker发送选择改变，携带值为', e.detail.value);
			this.deliverShopIndex = e.detail.value;
		},
		packCheckChange(e) {
			console.log('packRadio 发生 change 事件，携带值为', e.detail.value);
		},
		savePackage() {
			let self = this;
			uni.showLoading({
				title: '正在保存中',
				mask: true
			});
			setTimeout(function() {
				uni.hideLoading();
				uni.showToast({
					title: '已保存当前包裹！',
					icon: 'none',
					duration: 1998
				});
			}, 300);
		},
		submitpackage() {
			console.log('正在提交包裹预报中ing...');
			this.showTestToast(0);
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
	.package-form-item-note-textaera {
		padding-bottom: 0;
	}

	.package-tip {
		width: calc(100% - @base-gap * 3);
		margin: 40rpx auto 0 auto;
		.package-tip-title {
			font-size: 32rpx;
			color: #ff5147;
		}
		.package-tip-content {
			margin: 20rpx 0 0 0;
			font-size: 28rpx;
			color: #888888;
			text {
				display: block;
				margin-top: 10rpx;
			}
		}
	}

	.package-goods-add {
		width: calc(100% - @base-gap * 4);
		height: 120rpx;
		margin: 0 auto;
		line-height: 120rpx;
		border-bottom: 1rpx solid @topic-split;
		color: #303031;
		font-size: 30rpx;
		text-indent: 10rpx;
	}
	.package-goods-add:nth-child(1) {
		margin-top: 20rpx;
	}
	.package-goods-add:nth-child(2) {
		border-bottom: 1rpx solid transparent;
	}

	@drawer-button-height: 76rpx;
	@drawer-button-bottom: 50rpx;
	.package-button-box {
		position: fixed;
	}
	.package-button-box-gap {
		width: 100%;
		height: calc(@drawer-button-height + @drawer-button-bottom);
	}
}
</style>
