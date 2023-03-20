<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="goods-add-box">
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
				<view class="top-nav-title">{{ useType === '1' ? $t('goods_add.title.add') : $t('goods_add.title.edit') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>

		<view class="goods-image">
			<uni-file-picker
				fileMediatype="image"
				mode="grid"
				limit="9"
				:title="$t('goods_add.option.image')"
				@select="imgUploadSelect"
				@progress="imgUploadProgress"
				@success="imgUploadsSuccess"
				@fail="imgUploadFail"
				@delete="imgUploadDelete"
				:auto-upload="false"
			></uni-file-picker>
		</view>

		<view class="goods-card">
			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('goods_add.option.value') }}
				</view>
				<view class="form-item-arrow">
					<input class="uni-input form-input-default" type="number" :placeholder="$t('goods_add.option.value.placeholder')" placeholder-class="form-input-placeholder" />
					<uni-icons class="form-item-arrow-icon" type="vip" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item-note">
				<view class="common-form-item-note-title-high">
					<text class="form-must-have">*</text>
					{{ $t('goods_add.option.title') }}
				</view>
				<view class="common-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('goods_add.option.title.placeholder')" placeholder-class="form-input-placeholder" />
				</view>
			</view>
		</view>

		<view class="goods-card">
			<view class="common-form-item">
				<view class="form-item-title">{{ $t('goods_add.option.brand') }}</view>
				<view class="form-item-arrow">
					<input class="uni-input form-input-default" type="text" :placeholder="$t('goods_add.option.brand.placeholder')" placeholder-class="form-input-placeholder" />
					<uni-icons class="form-item-arrow-icon" type="medal" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item">
				<view class="form-item-title">{{ $t('goods_add.option.address') }}</view>
				<view class="form-item-arrow">
					<input class="uni-input form-input-default" type="text" :placeholder="$t('goods_add.option.address.placeholder')" placeholder-class="form-input-placeholder" />
					<uni-icons class="form-item-arrow-icon" type="location" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item" @click="getGoodsType">
				<view class="form-item-title">{{ $t('goods_add.option.catagory') }}</view>
				<view class="form-item-arrow">
					<input class="uni-input form-input-default" type="text" :placeholder="$t('goods_add.option.catagory.placeholder')" placeholder-class="form-input-placeholder" />
					<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item-note">
				<view class="common-form-item-note-title-high">{{ $t('goods_add.option.desc') }}</view>
				<view class="common-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('goods_add.option.desc.placeholder')" placeholder-class="form-input-placeholder" />
				</view>
			</view>
		</view>

		<view class="goods-card">
			<view class="common-form-item">
				<text class="form-item-title">{{ $t('goods_add.option.is.save.my.goods') }}</text>
				<switch class="form-switch-default" :checked="saveMyGoodsSetting" color="#5BC797" @change="saveMyGoodsSwitchChange" />
			</view>
		</view>

		<view class="drawer-button-box-gap goods-button-box-gap"></view>
		<view class="drawer-button-box goods-button-box">
			<view class="drawer-add">
				<view class="drawer-add-scan" @click="scanGoods">
					<uni-icons class="drawer-add-scan-icon" type="scan" size="24" color="#BFBFBF"></uni-icons>
					<text>{{ $t('goods_add.button.scan') }}</text>
				</view>
				<view class="drawer-add-submit" @click="submitAdd">{{ $t('goods_add.button.add') }}</view>
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
import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue';
export default {
	components: {
		uniIcons,
		uniPopup,
		uniFilePicker
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
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
			// 当前页面用途，1.添加商品 2.修改商品
			useType: '1',
			// 上一个页面的返回类型，参考上一个页面说明
			fromType: '1',
			// 从什么地方进入的商品添加，1.寄件 2.包裹预报 3.商品管理
			addType: '1',
			// 是否保存到我的商品
			saveMyGoodsSetting: true
		};
	},
	methods: {
		goBack() {
			let fromType = this.fromType;
			if (this.addType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/express/express_send'
				});
			} else if (this.addType === '2') {
				uni.redirectTo({
					url: `/pages/JTCEE/package/package_add?fromType=${fromType}`
				});
			} else if (this.addType === '3') {
				uni.redirectTo({
					url: '/pages/JTCEE/goods/goods_index'
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
		imgUploadSelect(e) {
			console.log('选择文件：', e);
		},
		imgUploadProgress(e) {
			console.log('上传进度：', e);
		},
		imgUploadsSuccess(e) {
			console.log('上传成功');
		},
		imgUploadFail(e) {
			console.log('上传失败：', e);
		},
		imgUploadDelete(e) {
			console.log('删除成功：', e);
		},
		getGoodsType() {
			let self = this;
			uni.navigateTo({
				url: `/pages/JTCEE/goods/goods_catagory?fromType=${self.fromType}&addType=${self.addType}&useType=${self.useType}`
			});
		},
		saveMyGoodsSwitchChange(e) {
			console.log('saveMyGoodsSwitch 发生 change 事件，携带值为', e.detail.value);
		},
		scanGoods() {
			let useType = this.useType;
			let fromType = this.fromType;
			let addType = this.addType;
			uni.navigateTo({
				url: `/pages/JTCEE/index/scan_qr?scanType=2&useType=${useType}&fromType=${fromType}&addType=${addType}`
			});
		},
		submitAdd() {
			this.showTestToast(0);
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

@goods-card-margin-top: 20rpx;

.goods-add-box {
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

	@goods-image-padding-side: 40rpx;
	.goods-image {
		width: calc(100% - @base-gap * 2 - @goods-image-padding-side * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: @goods-card-margin-top auto 0 auto;
		padding: 20rpx @goods-image-padding-side 35rpx @goods-image-padding-side;
	}

	.goods-card {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: @goods-card-margin-top auto 0 auto;
	}

	@drawer-button-height: 76rpx;
	@drawer-button-bottom: 50rpx;
	.goods-button-box-gap {
		height: calc(@drawer-button-height + @drawer-button-bottom - 25rpx);
	}
}
</style>
