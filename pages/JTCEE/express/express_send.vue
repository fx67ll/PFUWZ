<!-- 标准自定义标题加基础灰色背景页面结构 -->
<template>
	<view class="express-box">
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
				<view class="top-nav-title">{{ $t('express_send.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		</view>

		<view class="express-address">
			<view class="express-address-item">
				<view class="express-address-item-left">
					<view class="express-address-item-font express-address-item-font-green">{{ $t('express_send.address.get.icon') }}</view>
					<view class="express-address-item-info">
						<view class="express-address-item-person">
							<text class="express-address-item-person-name" v-if="isGotAddressSend">何瑞</text>
							<text class="express-address-item-person-phone" v-if="isGotAddressSend">18095640133</text>
							<text class="express-address-item-person-unselected" v-if="!isGotAddressSend">{{ $t('express_send.address.get.info') }}</text>
						</view>
						<view class="express-address-item-address">
							<text class="express-address-item-address-selected" v-if="isGotAddressSend">江苏南京市建邺区城区莲花新城2号半山国际2单元309室</text>
							<text class="express-address-item-address-unselected" v-if="!isGotAddressSend">{{ $t('express_send.address.get.address') }}</text>
						</view>
					</view>
				</view>
				<view class="express-address-item-right" @click="getExpressAddress(1)">
					<img class="express-address-item-icon" src="/static/img/JTCEE/express/express-get-address.png" />
					<text class="express-address-item-text">{{ $t('express_send.address.book') }}</text>
				</view>
			</view>
			<view class="express-address-item">
				<view class="express-address-item-left">
					<view class="express-address-item-font express-address-item-font-red">{{ $t('express_send.address.send.icon') }}</view>
					<view class="express-address-item-info">
						<view class="express-address-item-person">
							<text class="express-address-item-person-name" v-if="isGotAddressReceive">何瑞</text>
							<text class="express-address-item-person-phone" v-if="isGotAddressReceive">18095640133</text>
							<text class="express-address-item-person-unselected" v-if="!isGotAddressReceive">{{ $t('express_send.address.send.info') }}</text>
						</view>
						<view class="express-address-item-address">
							<text class="express-address-item-address-selected" v-if="isGotAddressReceive">江苏南京市建邺区城区莲花新城2号半山国际2单元309室</text>
							<text class="express-address-item-address-unselected" v-if="!isGotAddressReceive">{{ $t('express_send.address.send.address') }}</text>
						</view>
					</view>
				</view>
				<view class="express-address-item-right" @click="getExpressAddress(2)">
					<img class="express-address-item-icon" src="/static/img/JTCEE/express/express-get-address.png" />
					<text class="express-address-item-text">{{ $t('express_send.address.book') }}</text>
				</view>
			</view>
		</view>

		<view class="card-two card-two-express" :class="{ 'card-two-long': !isSingle }">
			<view class="card-two-head">
				<view class="card-two-head-item" :class="{ 'card-two-head-item-active': isSingle, 'card-two-head-item-first': !isSingle }" @click="isExpressSendSingle(true)">
					{{ $t('express_send.express.type.single') }}
				</view>
				<view class="card-two-head-item" :class="{ 'card-two-head-item-active': !isSingle, 'card-two-head-item-second': isSingle }" @click="isExpressSendSingle(false)">
					{{ $t('express_send.express.type.multiple') }}
				</view>
			</view>

			<view class="card-two-content card-two-content-express" v-if="isSingle">
				<v-tabs class="express-tab" v-model="tabCurrentIndex" :tabs="tabDataList" :scroll="false" :lineScale="0.15" @change="changeTab"></v-tabs>

				<view class="common-form-item common-form-item-nosplit">
					<view class="form-item-title">
						<text class="form-must-have">*</text>
						{{ $t('express_send.option.goods') }}
					</view>
					<view class="form-item-arrow" @click="addGoods">
						<input
							class="uni-input form-input-default"
							type="text"
							:placeholder="$t('express_send.option.goods.placeholder')"
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

				<view class="form-number">
					<view class="form-number-title">
						<text class="form-must-have">*</text>
						{{ $t('express_bill.form.weight') }}（kg）
					</view>
					<uni-number-box :value="billExpressWeight"></uni-number-box>
				</view>

				<view class="form-volume">
					<view class="form-volume-top">
						<view class="form-volume-title">
							<text class="form-must-have">*</text>
							{{ $t('express_bill.form.volume') }}（m³）
						</view>
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

			<view class="card-two-content card-two-content-express" v-if="!isSingle">
				<view class="express-upload">
					<view class="express-upload-top">
						<view class="express-upload-title">{{ $t('express_send.express.multiple.title') }}</view>
						<view class="express-upload-model" @click="getMultipleImportModel">
							<uni-icons class="express-upload-model-icon" type="download-filled" size="16" color="#F8BB32"></uni-icons>
							<text class="express-upload-model-text">{{ $t('express_send.express.multiple.download') }}</text>
						</view>
					</view>
					<view class="express-upload-content">
						<view class="express-upload-btn" @click="multipleImportFile">{{ $t('express_send.express.multiple.import') }}</view>
						<view class="express-upload-tip">{{ $t('express_send.express.multiple.tip') }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="express-note">
			<view class="common-form-item-note">
				<view class="common-form-item-note-title">{{ $t('express_send.option.note') }}</view>
				<view class="common-form-item-note-textaera">
					<textarea class="form-textarea-default" :placeholder="$t('express_send.option.note.placeholder')" placeholder-class="form-input-placeholder" />
				</view>
			</view>
		</view>

		<view class="express-service">
			<view class="express-service-tip">{{ $t('express_send.option.insure.tip') }}</view>
			<view class="common-form-item">
				<view class="form-item-title">
					{{ $t('express_send.option.insure') }}
					<uni-icons class="form-item-title-icon" type="help" size="18" color="#A6A6A6" @click="showInsureTip"></uni-icons>
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="number"
						:placeholder="$t('express_send.option.insure.placeholder')"
						placeholder-class="form-input-placeholder"
					/>
					<uni-icons class="form-item-arrow-icon form-item-common-icon" type="vip-filled" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item">
				<view class="form-item-title">{{ $t('express_send.option.service') }}</view>
				<view class="form-item-arrow" @click="getExpressService">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('express_send.option.service.placeholder')"
						placeholder-class="form-input-placeholder"
						disabled
					/>
					<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
		</view>

		<view class="express-deliver">
			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('express_send.option.deliver') }}
					<uni-icons class="form-item-title-icon" type="help" size="18" color="#A6A6A6" @click="showDeliverTip"></uni-icons>
				</view>
				<picker @change="bindDeliverPickerChange" :value="deliverIndex" :range="deliverData">
					<view class="form-item-arrow">
						<input
							class="uni-input form-input-default"
							type="text"
							:placeholder="$t('express_send.option.deliver.placeholder')"
							placeholder-class="form-input-placeholder"
							disabled
							v-model="deliverData[deliverIndex]"
						/>
						<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="common-form-item" v-if="deliverIndex === 1">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('express_send.option.express') }}
				</view>
				<view class="form-item-arrow">
					<input
						class="uni-input form-input-default"
						type="text"
						:placeholder="$t('express_send.option.express.placeholder')"
						placeholder-class="form-input-placeholder"
					/>
					<uni-icons class="form-item-arrow-icon" type="scan" size="18" color="#A6A6A6"></uni-icons>
				</view>
			</view>
			<view class="common-form-item">
				<view class="form-item-title">
					<text class="form-must-have">*</text>
					{{ $t('express_send.option.shop') }}
				</view>
				<picker @change="bindDeliverShopPickerChange" :value="deliverShopIndex" :range="deliverShopData">
					<view class="form-item-arrow">
						<input
							class="uni-input form-input-default"
							type="text"
							:placeholder="$t('express_send.option.shop.placeholder')"
							placeholder-class="form-input-placeholder"
							disabled
							v-model="deliverShopData[deliverShopIndex]"
						/>
						<uni-icons class="form-item-arrow-icon" type="right" size="18" color="#A6A6A6"></uni-icons>
					</view>
				</picker>
			</view>
		</view>

		<view class="express-send-bottom-gap"></view>
		<view class="express-send-bottom">
			<view class="express-send-bottom-box">
				<view class="express-send-bottom-bill">
					<view class="express-send-bottom-bill-info">
						<view class="express-send-bottom-bill-info-left">
							<text class="express-send-bottom-bill-title">{{ $t('express_send.bottom.title') }}</text>
							<text class="express-send-bottom-bill-unit">￥</text>
							<text class="express-send-bottom-bill-money">999999</text>
							<text class="express-send-bottom-bill-money-plus">+</text>
						</view>
						<view class="express-send-bottom-bill-info-right" @click="getExpressOrderDetail">
							<text class="express-send-bottom-bill-more">{{ $t('express_send.bottom.detail') }}</text>
							<uni-icons class="express-send-bottom-bill-icon" type="info" size="15" color="#313131"></uni-icons>
						</view>
					</view>
					<view class="express-send-bottom-bill-tip">{{ $t('express_send.bottom.tip') }}</view>
				</view>
				<view class="express-send-bottom-button">
					<view class="express-send-bottom-button-item express-send-bottom-button-reset" @click="saveExpressOrder">{{ $t('express_send.bottom.button.save') }}</view>
					<view class="express-send-bottom-button-item express-send-bottom-button-submit" @click="payExpressOrder">{{ $t('express_send.bottom.button.submit') }}</view>
				</view>
			</view>
		</view>

		<!-- 商品弹窗 -->
		<zb-drawer-JTCEE
			mode="bottom"
			:title="$t('express_send.drawer.a.title')"
			:wrapperClosable="false"
			:visible.sync="isShowDrawerAddGoods"
			:radius="true"
			:height="addGoodsDrawerHeight"
		>
			<view class="express-goods-add" @click="chooseRelativeGoods">{{ $t('express_send.drawer.a.add.old') }}</view>
			<view class="express-goods-add" @click="chooseNewGoods">{{ $t('express_send.drawer.a.add.new') }}</view>
		</zb-drawer-JTCEE>

		<!-- 服务弹窗 -->
		<zb-drawer-JTCEE
			mode="bottom"
			:title="$t('express_send.drawer.b.title')"
			:wrapperClosable="false"
			:visible.sync="isShowDrawerService"
			:radius="true"
			:height="serviceDrawerHeight"
		>
			<checkbox-group @change="serviceCheckChange" class="form-radio-default">
				<view class="express-service-radio">
					<label class="form-radio-default-label">
						<checkbox value="serviceRadioBS" checked="true" color="#ffffff" />
						补税：2000円
					</label>
					<label class="form-radio-default-label">
						<checkbox value="serviceRadioDB" checked="false" color="#ffffff" />
						打包费：800円
					</label>
					<label class="form-radio-default-label">
						<checkbox value="serviceRadioZX" checked="false" color="#ffffff" />
						纸箱：500円
					</label>
				</view>
			</checkbox-group>
		</zb-drawer-JTCEE>

		<!-- 明细弹窗 -->
		<zb-drawer-JTCEE
			mode="bottom"
			:title="$t('express_send.drawer.c.title')"
			:wrapperClosable="false"
			:visible.sync="isShowDrawerBillDetail"
			:radius="true"
			:height="billDetailDrawerHeight"
		>
			<view class="express-detail-pay express-detail-pay-red">
				<text>{{ $t('express_send.drawer.c.price.base') }}</text>
				<text>1238953210円</text>
			</view>
			<view class="express-detail-pay express-detail-pay-grey">
				<text>{{ $t('express_send.drawer.c.price.more') }}</text>
				<text>10kg</text>
			</view>
			<view class="express-detail-pay express-detail-pay-grey express-detail-pay-split">
				<text>{{ $t('express_send.drawer.c.price.rule') }}</text>
				<text>{{ $t('express_send.drawer.c.price.rule.content') }}</text>
			</view>
			<view class="express-detail-pay express-detail-pay-more">
				<text>{{ $t('express_send.drawer.c.insure') }}</text>
				<text>100円</text>
			</view>
			<view class="express-detail-pay express-detail-pay-more">
				<text>{{ $t('express_send.drawer.c.service') }}</text>
				<text>补税1000円、打包费500円、打包费500円</text>
			</view>
		</zb-drawer-JTCEE>
	</view>
</template>

<script>
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import vTabs from '@/uni_modules/v-tabs/v-tabs.vue';
export default {
	components: {
		uniIcons,
		vTabs
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	onLoad(option) {
		if (option.addressType) {
			this.addressType = option.addressType;
		}

		// #ifdef H5
		this.isGotAddressSend = JSON.parse(localStorage.getItem('isGotAddressSend'));
		this.isGotAddressReceive = JSON.parse(localStorage.getItem('isGotAddressReceive'));
		// #endif

		// 微信端不支持localStorage
		// #ifdef MP-WEIXIN
		let self = this;
		wx.getStorage({
			key: 'isGotAddressSend',
			success(res) {
				self.isGotAddressSend = JSON.parse(res.data);
			}
		});
		wx.getStorage({
			key: 'isGotAddressReceive',
			success(res) {
				self.isGotAddressReceive = JSON.parse(res.data);
			}
		});
		// #endif
	},
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 单个寄件或批量寄件
			isSingle: true,
			// tab索引
			tabCurrentIndex: 0,
			// tab数据
			tabDataList: [this.$t('express_bill.catagory.sundry.goods'), this.$t('express_bill.catagory.special.line'), this.$t('express_bill.catagory.high.weight')],
			// 选取地址后的返回信息
			addressType: '',
			isGotAddressReceive: false,
			isGotAddressSend: false,
			// 商品数据
			goodsListData: [{}, {}, {}],
			// 包裹重量
			billExpressWeight: 0,
			// 包裹体积
			billExpressVolume: 0,
			// 交付方式
			deliverData: ['上门交付', '快递交付'],
			deliverIndex: -1,
			// 交付门店
			deliverShopData: ['交付门店一', '交付门店二', '交付门店三'],
			deliverShopIndex: -1,
			// 商品弹窗
			isShowDrawerAddGoods: false,
			addGoodsDrawerHeight: '450rpx',
			// 服务弹窗
			isShowDrawerService: false,
			serviceDrawerHeight: '350rpx',
			// 明细弹窗
			isShowDrawerBillDetail: false,
			billDetailDrawerHeight: '650rpx'
		};
	},
	methods: {
		goBack() {
			// #ifdef H5
			localStorage.setItem('isGotAddressSend', 'false');
			localStorage.setItem('isGotAddressReceive', 'false');
			// #endif

			// 微信端不支持localStorage
			// #ifdef MP-WEIXIN
			wx.setStorage({
				key: 'isGotAddressSend',
				data: 'false'
			});
			wx.setStorage({
				key: 'isGotAddressReceive',
				data: 'false'
			});
			// #endif

			uni.redirectTo({
				url: '/pages/JTCEE/index/index'
			});
		},
		getExpressAddress(type) {
			uni.navigateTo({
				url: `/pages/JTCEE/express/express_address?addressType=${type}`
			});
		},
		isExpressSendSingle(val) {
			this.isSingle = val;
		},
		changeTab(index) {
			console.log('当前选中的项：' + index);
			if (index === 0) {
				uni.showToast({
					title: '您选择了杂货！',
					icon: 'none',
					duration: 1998
				});
			}
			if (index === 1) {
				uni.showToast({
					title: '您选择了重货！',
					icon: 'none',
					duration: 1998
				});
			}
			if (index === 2) {
				uni.showToast({
					title: '您选择了专线！',
					icon: 'none',
					duration: 1998
				});
			}
		},
		addGoods() {
			this.isShowDrawerAddGoods = true;
		},
		chooseRelativeGoods() {
			this.isShowDrawerAddGoods = false;
			uni.navigateTo({
				url: `/pages/JTCEE/goods/goods_choose?chooseType=1`
			});
		},
		chooseNewGoods() {
			this.isShowDrawerAddGoods = false;
			uni.navigateTo({
				url: '/pages/goods/goods_add?addType=1&useType=1'
			});
		},
		getMultipleImportModel() {
			uni.showToast({
				title: '暂无模板文件提供下载，敬请期待！',
				icon: 'none',
				duration: 1998
			});
		},
		multipleImportFile() {
			// #ifdef H5
			uni.chooseFile({
				count: 1,
				// 在微信环境中，如果type="all"，则extension属性失效
				type: 'all',
				extension: ['.doc', '.xls', 'docx', 'xlsx'],
				success: function(res) {
					// tempFilePaths
					// Array<String>
					// 文件的本地文件路径列表
					console.log(JSON.stringify(res.tempFilePaths));
					// tempFiles
					// Array<Object>、Array<File>
					// 文件的本地文件列表，每一项是一个 File 对象
					console.log(JSON.stringify(res.tempFiles));
				},
				fail: function(res) {
					console.log('文件上传失败......');
				},
				complete: function(res) {
					console.log('文件上传任务完成......');
				}
			});
			// #endif

			// #ifdef MP-WEIXIN
			// 官方文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html
			wx.chooseMessageFile({
				count: 1,
				type: 'file',
				extension: ['.doc', '.xls', 'docx', 'xlsx'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFiles));
				},
				fail: function(res) {
					console.log('文件上传失败......');
				},
				complete: function(res) {
					console.log('文件上传任务完成......');
				}
			});
			// #endif
		},
		showInsureTip() {
			uni.showToast({
				title: '暂无保价服务的详细报价，敬请期待！',
				icon: 'none',
				duration: 1998
			});
		},
		getExpressService() {
			this.isShowDrawerService = true;
		},
		serviceCheckChange(e) {
			console.log('serviceRadio 发生 change 事件，携带值为', e.detail.value);
		},
		showDeliverTip() {
			uni.showToast({
				title: '暂无交付方式的详细说明，敬请期待！',
				icon: 'none',
				duration: 1998
			});
		},
		bindDeliverPickerChange(e) {
			console.log('交付方式 picker发送选择改变，携带值为', e.detail.value);
			this.deliverIndex = e.detail.value;
			if (this.deliverIndex === 1) {
				uni.showToast({
					title: '您选择了快递交付的方式，请提供快递单号！',
					icon: 'none',
					duration: 1998
				});
			}
		},
		bindDeliverShopPickerChange(e) {
			console.log('交付门店 picker发送选择改变，携带值为', e.detail.value);
			this.deliverShopIndex = e.detail.value;
		},
		getExpressOrderDetail() {
			this.isShowDrawerBillDetail = true;
		},
		saveExpressOrder() {
			this.showTestToast(0);
			console.log('保存寄件订单中ing...');
		},
		payExpressOrder() {
			this.showTestToast(0);
			console.log('提交寄件订单中ing...');
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

@express-card-margin-top: 20rpx;

.express-box {
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

	@express-address-right-width: 143rpx;
	.express-address {
		width: calc(100% - @base-gap * 2);
		border-radius: 20rpx;
		background-color: #ffffff;
		margin: @express-card-margin-top auto 0 auto;
		.express-address-item {
			width: 100%;
			min-height: 160rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid @topic-split;
			display: flex;
			justify-content: space-between;
			.express-address-item-left {
				width: calc(100% - @express-address-right-width - 36rpx);
				min-height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				@express-address-font-size: 68rpx;
				.express-address-item-font {
					width: @express-address-font-size;
					height: @express-address-font-size;
					font-size: 26rpx;
					color: #ffffff;
					text-align: center;
					line-height: calc(@express-address-font-size - 4rpx);
					border-radius: 50%;
					margin: 20rpx 25rpx 0 30rpx;
				}
				.express-address-item-font-green {
					background-color: @topic-green;
				}
				.express-address-item-font-red {
					background-color: #ff5147;
				}
				.express-address-item-info {
					width: calc(100% - @express-address-font-size - 60rpx);
					height: 100%;
					.express-address-item-person {
						font-size: 32rpx;
						color: #000000;
						margin-top: 25rpx;
						.express-address-item-person-name {
							margin-right: 40rpx;
						}
						.express-address-item-person-phone {
						}
						.express-address-item-person-unselected {
						}
					}
					.express-address-item-address {
						margin-top: 15rpx;
						font-size: 26rpx;
						.express-address-item-address-selected {
							color: #4a4a4a;
						}
						.express-address-item-address-unselected {
							color: #bfbfbf;
						}
					}
				}
			}
			.express-address-item-right {
				width: 143rpx;
				margin: 30rpx 0 15rpx 0;
				border-left: 1rpx solid @topic-split;
				.express-address-item-icon {
					width: 50rpx;
					height: 50rpx;
					display: block;
					margin: 0 auto;
					padding-top: 12rpx;
				}
				.express-address-item-text {
					display: block;
					margin: 0 auto;
					text-align: center;
					font-size: 26rpx;
					color: #313131;
					line-height: 45rpx;
				}
			}
		}
	}

	.card-two-express {
		margin: calc(@express-card-margin-top + 15rpx) auto 0 auto;

		@express-card-item-width: 40rpx;
		.card-two-content-express {
			padding: 20rpx 0 10rpx 0;
			.express-tab {
				width: calc(100% - @express-card-item-width);
				margin: 0 auto;
				border-bottom: 1rpx solid @topic-split;
			}
			.express-upload {
				width: calc(100% - @express-card-item-width);
				height: 270rpx;
				margin: 0 auto;
				.express-upload-top {
					width: 100%;
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.express-upload-title {
						font-size: 30rpx;
						color: #303031;
						margin-left: 10rpx;
					}
					.express-upload-model {
						margin-right: 10rpx;
						position: relative;
						top: 2rpx;
						.express-upload-model-icon {
							margin-right: 3rpx;
						}
						.express-upload-model-text {
							font-size: 24rpx;
							color: #f8bb32;
						}
					}
				}
				.express-upload-content {
					width: 100%;
					margin-top: 50rpx;
					.express-upload-btn {
						width: 230rpx;
						height: 76rpx;
						box-shadow: 0px 2px 8px 1px rgba(0, 128, 71, 0.31);
						border-radius: 70rpx;
						margin: 0 auto;
						text-align: center;
						color: @topic-green;
						line-height: 76rpx;
						font-size: 28rpx;
					}
					.express-upload-tip {
						margin-top: 25rpx;
						font-size: 20rpx;
						color: #bfbfbf;
						text-align: center;
					}
				}
			}
		}
	}

	.express-note {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: @express-card-margin-top auto 0 auto;
	}

	.express-service {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: @express-card-margin-top auto 0 auto;
		overflow: hidden;
		.express-service-tip {
			width: 100%;
			height: 46rpx;
			font-size: 20rpx;
			color: #f8bb32;
			background-color: rgba(248, 187, 50, 0.22);
			line-height: 46rpx;
			text-indent: 25rpx;
		}
	}

	.express-service-radio {
		width: calc(100% - @base-gap * 4);
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20rpx 0;
		.form-radio-default-label {
			width: 50%;
			margin: 15rpx 0;
		}
	}

	.express-deliver {
		width: calc(100% - @base-gap * 2);
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: @express-card-margin-top auto 0 auto;
	}

	@express-send-bottom-height: 76rpx;
	@express-send-bottom-bottom: 50rpx;
	.express-send-bottom {
		width: 100%;
		height: calc(@express-send-bottom-height + @express-send-bottom-bottom);
		position: fixed;
		background-color: #ffffff;
		bottom: 0;
		z-index: 9;
		padding-top: 22rpx;
		.express-send-bottom-box {
			width: calc(100% - @base-gap * 2);
			height: @express-send-bottom-height;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			@express-send-button-witdh: 252rpx;
			.express-send-bottom-bill {
				width: calc(100% - @express-send-button-witdh);
				height: 100%;

				@express-send-info-size: 28rpx;
				@express-send-info-more-width: 130rpx;
				.express-send-bottom-bill-info {
					height: 60rpx;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					.express-send-bottom-bill-info-left {
						width: calc(100% - @express-send-info-more-width);
						.express-send-bottom-bill-title {
							font-size: @express-send-info-size;
							color: #313131;
							margin-right: 5rpx;
						}
						.express-send-bottom-bill-unit {
							font-size: 24rpx;
							color: #ff5147;
							position: relative;
							top: 2rpx;
						}
						.express-send-bottom-bill-money {
							font-size: 42rpx;
							color: #ff5147;
							position: relative;
							top: 2rpx;
						}
						.express-send-bottom-bill-money-plus {
							font-size: 12rpx;
							color: #ff5147;
							position: relative;
							top: -18rpx;
						}
					}
					.express-send-bottom-bill-info-right {
						width: @express-send-info-more-width;
						line-height: 68rpx;
						font-size: @express-send-info-size;
						color: #313131;
						.express-send-bottom-bill-more {
							margin-left: 10rpx;
						}
						.express-send-bottom-bill-icon {
							position: relative;
							top: 2rpx;
						}
					}
				}
				.express-send-bottom-bill-tip {
					font-size: 22rpx;
					color: #bfbfbf;
				}
			}
			.express-send-bottom-button {
				width: @express-send-button-witdh;
				height: 100%;
				border-radius: 70rpx;
				display: flex;
				justify-content: space-between;
				overflow: hidden;
				position: relative;
				top: 15rpx;
				.express-send-bottom-button-item {
					width: 50%;
					height: 100%;
					line-height: @express-send-bottom-height;
					text-align: center;
					color: #ffffff;
					font-size: 28rpx;
					letter-spacing: 10rpx;
					text-indent: 10rpx;
				}
				.express-send-bottom-button-reset {
					background-color: #f8bb32;
				}
				.express-send-bottom-button-submit {
					background-color: @topic-green;
				}
			}
		}
	}
	.express-send-bottom-gap {
		width: 100%;
		height: calc(@express-send-bottom-height + @express-send-bottom-bottom - 10rpx);
	}

	.express-goods-add {
		width: calc(100% - @base-gap * 4);
		height: 120rpx;
		margin: 0 auto;
		line-height: 120rpx;
		border-bottom: 1rpx solid @topic-split;
		color: #303031;
		font-size: 30rpx;
		text-indent: 10rpx;
	}
	.express-goods-add:nth-child(1) {
		margin-top: 20rpx;
	}
	.express-goods-add:nth-child(2) {
		border-bottom: 1rpx solid transparent;
	}

	@express-pay-title-width: 160rpx;
	.express-detail-pay {
		width: calc(100% - @base-gap * 4);
		min-height: 60rpx;
		line-height: 60rpx;
		margin: 0 auto;
		font-size: 30rpx;
		color: #313131;
		display: flex;
		justify-content: space-between;
		text:nth-child(1) {
			width: @express-pay-title-width;
		}
		text:nth-child(2) {
			width: calc(100% - @express-pay-title-width);
			text-align: right;
		}
	}
	.express-detail-pay:nth-child(1) {
		margin-top: 40rpx;
	}
	.express-detail-pay-red {
		text:nth-child(2) {
			color: #ff5147;
			font-size: 38rpx;
		}
	}
	.express-detail-pay-grey {
		font-size: 28rpx;
		color: #838383;
	}
	.express-detail-pay-split {
		border-bottom: 1px dashed #bfbfbf;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
	}
	.express-detail-pay-more {
		text:nth-child(2) {
			color: #838383;
			font-size: 28rpx;
		}
	}
}
</style>
