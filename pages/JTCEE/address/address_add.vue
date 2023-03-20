<template>
	<view class="address-add-box">
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
				<view class="top-nav-title">{{ useType === '1' ? $t('address_add.title.add') : $t('address_add.title.edit') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>
		<view class="card-two" :class="{ 'card-two-long': !isCN }">
			<view class="card-two-head">
				<view class="card-two-head-item" :class="{ 'card-two-head-item-active': isCN, 'card-two-head-item-first': !isCN }" @click="isChinaAddress(true)">
					{{ $t('address_add.title.cn') }}
				</view>
				<view class="card-two-head-item" :class="{ 'card-two-head-item-active': !isCN, 'card-two-head-item-second': isCN }" @click="isChinaAddress(false)">
					{{ $t('address_add.title.jp') }}
				</view>
			</view>
			<view class="card-two-content">
				<view class="common-form-item">
					<view class="form-item-title">{{ $t('address_add.option.name.cn') }}</view>
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('address_add.option.name.placeholder.cn')"
						placeholder-class="form-input-placeholder"
					/>
				</view>
				<view class="common-form-item" v-if="isCN">
					<view class="form-item-title">{{ $t('address_add.option.phone.cn') }}</view>
					<input
						class="uni-input form-input-default"
						type="number"
						:placeholder="$t('address_add.option.phone.placeholder.cn')"
						placeholder-class="form-input-placeholder"
					/>
				</view>
				<view class="common-form-item" v-if="!isCN">
					<view class="form-item-title">{{ $t('address_add.option.phone.jp') }}</view>
					<input
						class="uni-input form-input-default"
						type="number"
						:placeholder="$t('address_add.option.phone.placeholder.jp')"
						placeholder-class="form-input-placeholder"
					/>
				</view>
				<view class="common-form-item" v-if="isCN">
					<view class="form-item-title">{{ $t('address_add.option.city.cn') }}</view>
					<input
						class="uni-input form-input-default"
						style="z-index: 9;"
						type="text"
						:placeholder="$t('address_add.option.city.placeholder.cn')"
						placeholder-class="form-input-placeholder"
						:disabled="false"
						:value="addressCityCN"
						@click="getAddressCityCN"
					/>
					<zb-drawer-JTCEE
						mode="bottom"
						:title="$t('address_add.option.city.drawer.title.cn')"
						:wrapperClosable="false"
						:visible.sync="isShowDrawerCN"
						:radius="true"
						:height="drawerHeightCN"
					>
						<t-index-address @select="selectCity"></t-index-address>
					</zb-drawer-JTCEE>
				</view>
				<view class="common-form-item" v-if="!isCN">
					<view class="form-item-title">{{ $t('address_add.option.city.jp') }}</view>
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('address_add.option.city.placeholder.jp')"
						placeholder-class="form-input-placeholder"
						:disabled="false"
						:value="addressCityJP"
						@click="getAddressCityJP"
					/>
					<!-- 日本地区数据待匹配 -->
					<!-- <zb-drawer-JTCEE mode="bottom" :title="$t('address_add.option.city.drawer.title.jp')" :wrapperClosable="false" :visible.sync="isShowDrawerJP" :radius="true" :height="drawerHeightJP">
						<t-index-address @select="selectCity"></t-index-address>
					</zb-drawer-JTCEE> -->
				</view>
				<view class="common-form-item">
					<view class="form-item-title">{{ $t('address_add.option.mail.cn') }}</view>
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('address_add.option.mail.placeholder.cn')"
						placeholder-class="form-input-placeholder"
					/>
				</view>
				<view class="common-form-item-big">
					<view class="common-form-item-big-title">{{ $t('address_add.option.address.cn') }}</view>
					<view class="common-form-item-big-textaera">
						<textarea class="form-textarea-default" :placeholder="$t('address_add.option.address.placeholder')" placeholder-class="form-input-placeholder" />
					</view>
				</view>
			</view>
		</view>
		<view class="address-id">
			<view class="common-form-item">
				<view class="form-item-title">{{ $t('address_add.option.id') }}</view>
				<!-- #ifdef H5 -->
				<input class="uni-input form-input-default" type="text" :placeholder="$t('address_add.option.id.placeholder')" placeholder-class="form-input-placeholder" />
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<input class="uni-input form-input-default" type="idcard" :placeholder="$t('address_add.option.id.placeholder')" placeholder-class="form-input-placeholder" />
				<!-- #endif -->
			</view>
			<view class="common-form-item-big">
				<view class="common-form-item-big-title">{{ $t('address_add.option.id.import') }}</view>
				<view class="common-form-item-big-import">
					<view class="common-form-item-big-import-box" @click="importIdImg(1)" v-if="idImgArrFront.length === 0">
						<img class="common-form-item-big-import-img" src="/static/img/JTCEE/address/address-import-id.png" />
						<text class="common-form-item-big-import-text">{{ $t('address_add.option.id.import.front') }}</text>
					</view>
					<view class="common-form-item-big-import-box" v-if="idImgArrFront.length > 0">
						<uni-icons class="common-form-item-big-result-icon" type="trash" size="24" color="#BFBFBF" @click="deleteImportImg(1)"></uni-icons>
						<img class="common-form-item-big-result-img" :src="idImgArrFront[0]" @click="previewImportImg(1)" />
					</view>
					<view class="common-form-item-big-import-box" @click="importIdImg(2)" v-if="idImgArrBack.length === 0">
						<img class="common-form-item-big-import-img" src="/static/img/JTCEE/address/address-import-id.png" />
						<text class="common-form-item-big-import-text">{{ $t('address_add.option.id.import.back') }}</text>
					</view>
					<view class="common-form-item-big-import-box" v-if="idImgArrBack.length > 0">
						<uni-icons class="common-form-item-big-result-icon" type="trash" size="24" color="#BFBFBF" @click="deleteImportImg(2)"></uni-icons>
						<img class="common-form-item-big-result-img" :src="idImgArrBack[0]" @click="previewImportImg(2)" />
					</view>
				</view>
			</view>
		</view>
		<view class="address-default">
			<view class="common-form-item">
				<text class="form-item-title">{{ $t('address_add.option.address.type') }}</text>
				<radio-group @change="addressRadioChange" class="form-radio-default">
					<label class="form-radio-default-label">
						<radio value="addressRadioTypeGet" checked="true" color="#5BC797" />
						{{ $t('address_add.option.address.type.get') }}
					</label>
					<label class="form-radio-default-label">
						<radio value="addressRadioTypeSend" checked="false" color="#5BC797" />
						{{ $t('address_add.option.address.type.send') }}
					</label>
				</radio-group>
			</view>
			<view class="address-default-box">
				<view class="address-default-left">
					<view class="address-default-title">{{ $t('address_add.option.default.address') }}</view>
					<view class="address-default-tip">{{ $t('address_add.option.default.address.tip') }}</view>
				</view>
				<switch class="form-switch-default address-default-switch" :checked="defaultSetting" color="#5BC797" @change="defaultSwitchChange" />
			</view>
		</view>
		<view class="bottom-gap bottom-gap-address bottom-gap-address-default"></view>
		<view class="bottom-menu bottom-menu-address">
			<view class="bottom-menu-btn" @click="saveAddresss">
				<text class="bottom-menu-btn-text bottom-menu-btn-text-save">{{ $t('address_add.button.save') }}</text>
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
			// 国内地址或者日本地址
			isCN: true,
			// 是否显示CN筛选框
			isShowDrawerCN: false,
			// CN筛选框高度
			drawerHeightCN: '80%',
			// 是否显示JP筛选框
			isShowDrawerJP: false,
			// JP筛选框高度
			drawerHeightJP: '80%',
			// 中日地区
			addressCityCN: '',
			addressCityJP: '',
			// 身份证照片数组
			idImgArrFront: [],
			idImgArrBack: [],
			// 是否设置默认地址
			defaultSetting: false
		};
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/address/address_index'
			});
		},
		isChinaAddress(val) {
			this.isCN = val;
		},
		getAddressCityCN() {
			this.isShowDrawerCN = true;
		},
		getAddressCityJP() {
			uni.showToast({
				title: '暂无日本地区数据！',
				icon: 'none',
				duration: 1998
			});
		},
		selectCity(data) {
			console.log('当前选中的城市数据：' + JSON.stringify(data));
			this.addressCityCN = data.name;
			this.isShowDrawerCN = false;
		},
		importIdImg(type) {
			let self = this;

			// #ifdef H5
			uni.chooseImage({
				/** 关于count参数的官方说明
				count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。
				并且，在实际的手机浏览器很少有能够支持多选的。 **/
				count: 1,
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有，仅支持App、微信小程序、支付宝小程序、百度小程序
				sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				// 成功则返回图片的本地文件路径列表 tempFilePaths
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths[0]));
					if (type === 1) {
						self.idImgArrFront = [];
						self.idImgArrFront.push(res.tempFilePaths[0]);
						console.log('正面上传：' + self.idImgArrFront);
					} else {
						self.idImgArrBack = [];
						self.idImgArrBack.push(res.tempFilePaths[0]);
						console.log('反面上传：' + self.idImgArrBack);
					}
				},
				// 接口调用失败的回调函数，小程序、App
				fail: function(res) {
					console.log('H5图片上传接口调用失败:' + JSON.stringify(res));

					if (type === 1) {
						uni.showToast({
							title: self.$t('address_add.option.id.import.front.tip.error'),
							icon: 'none',
							duration: 5000
						});
					} else {
						uni.showToast({
							title: self.$t('address_add.option.id.import.back.tip.error'),
							icon: 'none',
							duration: 5000
						});
					}
				},
				// 接口调用结束的回调函数（调用成功、失败都会执行），全平台
				complete: function(res) {
					console.log('H5图片上传接口调用结束:' + JSON.stringify(res));
				}
			});
			// #endif

			// 官方文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
			// #ifdef MP-WEIXIN
			wx.chooseMedia({
				count: 1,
				mediaType: ['image'],
				sourceType: ['album'],
				// sizeType	Array.<string>	['original', 'compressed']	否	仅对 mediaType 为 image 时有效，是否压缩所选文件
				sizeType: ['original'],
				maxDuration: 30,
				camera: 'back',
				success(res) {
					console.log(JSON.stringify(res.tempFiles[0]));
					if (type === 1) {
						self.idImgArrFront = [];
						self.idImgArrFront.push(res.tempFiles[0].tempFilePath);
						console.log('正面上传：' + self.idImgArrFront);
					} else {
						self.idImgArrBack = [];
						self.idImgArrBack.push(res.tempFiles[0].tempFilePath);
						console.log('反面上传：' + self.idImgArrBack);
					}
				},
				fail(res) {
					console.log('微信文件图片上传接口调用失败:' + JSON.stringify(res));

					if (type === 1) {
						uni.showToast({
							title: self.$t('address_add.option.id.import.front.tip.error'),
							icon: 'none',
							duration: 5000
						});
					} else {
						uni.showToast({
							title: self.$t('address_add.option.id.import.back.tip.error'),
							icon: 'none',
							duration: 5000
						});
					}
				},
				complete(res) {
					console.log('微信文件图片上传接口调用结束:' + JSON.stringify(res));
				}
			});
			// #endif
		},
		deleteImportImg(type) {
			let self = this;
			uni.showModal({
				title: self.$t('address_add.option.id.import.modal.title'),
				content: `${self.$t('address_add.option.id.import.modal.text.a')}${
					type === 1 ? self.$t('address_add.option.id.import.modal.text.b') : self.$t('address_add.option.id.import.modal.text.c')
				}${self.$t('address_add.option.id.import.modal.text.d')}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						if (type === 1) {
							self.idImgArrFront = [];
						} else {
							self.idImgArrBack = [];
						}
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		previewImportImg(type) {
			let self = this;
			if (type === 1) {
				uni.previewImage({
					urls: [self.idImgArrFront[0]],
					longPressActions: {
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			} else {
				uni.previewImage({
					urls: [self.idImgArrBack[0]],
					longPressActions: {
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		},
		addressRadioChange(e) {
			console.log('addressRadio 发生 change 事件，携带值为', e.detail.value);
		},
		defaultSwitchChange(e) {
			console.log('defaultSwitch 发生 change 事件，携带值为', e.detail.value);
		},
		saveAddresss() {
			console.log('正在保存新地址ing...');
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.address-add-box {
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

	.address-id {
		width: calc(100% - @base-gap * 2);
		margin: 20rpx auto 0 auto;
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	.address-default {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		.address-default-box {
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.address-default-left {
				margin-left: 30rpx;
				.address-default-title {
					font-size: 28rpx;
					color: #000000;
				}
				.address-default-tip {
					font-size: 24rpx;
					color: #888888;
					margin-top: 10rpx;
				}
			}
			.address-default-switch {
				margin-right: 30rpx;
			}
		}
	}
}
</style>
