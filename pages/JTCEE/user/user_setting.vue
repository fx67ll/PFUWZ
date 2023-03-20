<template>
	<view class="user-setting-box">
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
				<view class="top-nav-title">{{ $t('user_setting.title') }}</view>
				<view class="top-nav-btn"></view>
			</view>
			<view class="top-nav-fake"></view>
			<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
			<view class="user-setting-form">
				<view class="user-setting-form-item" @click="goChangePassword">
					<text class="user-setting-form-text">{{ $t('user_setting.setting.edit.password') }}</text>
					<uni-icons class="user-setting-form-icon" type="right" size="18" color="#BFBFBF"></uni-icons>
				</view>
				<!-- 验证邮箱这个功能有两个考虑：
				1. 验证邮箱，页面风格使用修改密码的，重绘个页面
				2. 修改邮箱，页面结构完全使用修改密码的，改为修改邮箱 -->
				<view class="user-setting-form-item" @click="proveMail">
					<text class="user-setting-form-text">{{ $t('user_setting.setting.check.mail') }}</text>
					<uni-icons class="user-setting-form-icon" type="right" size="18" color="#BFBFBF"></uni-icons>
				</view>
				<view class="user-setting-form-item">
					<text class="user-setting-form-text">{{ $t('user_setting.setting.mail.password') }}</text>
					<switch class="form-switch-default" :checked="passwordSetting" color="#5BC797" @change="passwordSwitchChange" />
				</view>
				<view class="user-setting-form-item">
					<text class="user-setting-form-text">{{ $t('user_setting.setting.mail.order') }}</text>
					<switch class="form-switch-default" :checked="orderSetting" color="#5BC797" @change="orderSwitchChange" />
				</view>
				<view class="user-setting-form-item">
					<text class="user-setting-form-text">{{ $t('user_setting.setting.language') }}</text>
					<picker class="user-setting-form-picker" :value="languageIndex" :range="languageList" range-key="value" @change="changeLanguage">中文</picker>
				</view>
				<!-- 页面警告消息 -->
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog
						type="error"
						mode="base"
						:title="this.$t('popup.warning.title')"
						content="国际化功能已支持，暂无精力补充 i18n 中的 ja.json 文件，请等待后续更新版本~"
						confirmText="确定"
						cancelText="取消"
					></uni-popup-dialog>
				</uni-popup>
			</view>
			<view class="user-setting-loginout" @click="loginOut">{{ $t('user_setting.login.out') }}</view>
		</view>
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
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			// 密码变更switch
			passwordSetting: true,
			// 订单变更switch
			orderSetting: true,
			// 当前选中的语言
			languageIndex: 0,
			// 可切换的语言列表
			languageList: [
				{
					value: '中文',
					key: 'zh-Hans'
				},
				{
					value: '日语',
					key: 'ja'
				}
			]
		};
	},
	methods: {
		goBack() {
			uni.redirectTo({
				url: '/pages/JTCEE/user/user_index'
			});
		},
		goChangePassword() {
			uni.navigateTo({
				url: '/pages/JTCEE/login/forget_password?fromType=2'
			});
		},
		proveMail() {
			uni.navigateTo({
				url: '/pages/JTCEE/user/user_mail'
			});
		},
		passwordSwitchChange(e) {
			console.log('passwordSwitch 发生 change 事件，携带值为', e.detail.value);
		},
		orderSwitchChange(e) {
			console.log('orderSwitch 发生 change 事件，携带值为', e.detail.value);
		},
		changeLanguage(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			if (e.detail.value === 0) {
				this.languageIndex = e.detail.value;
			} else {
				this.$refs.popup.open();
			}
			// 预留后期国际化功能
			// uni.setLocale(this.languageList[e.detail.value].key);
			// this.$i18n.locale = this.languageList[e.detail.value].key;
		},
		loginOut() {
			console.log('退出登录中ing...');
			let loadingTitle = this.$t('uni.loading.login.out');
			uni.showLoading({
				title: loadingTitle,
				mask: true
			});
			setTimeout(function() {
				uni.hideLoading();
				uni.reLaunch({
					url: '/pages/JTCEE/login/login'
				});
			}, 600);
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

.user-setting-box {
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

	.user-setting-form {
		width: calc(100% - @base-gap * 2);
		margin: 30rpx auto;
		background-color: #ffffff;
		border-radius: 20rpx;
		.user-setting-form-item {
			width: calc(100% - 40rpx);
			margin: 0 auto;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid @topic-split;
			.user-setting-form-text {
				font-size: 30rpx;
				color: #000000;
				margin-left: 8rpx;
			}
			.user-setting-form-icon {
				margin-right: 20rpx;
			}
			.user-setting-form-picker {
				margin-right: 20rpx;
				font-size: 30rpx;
				color: #000000;
			}
		}
		.user-setting-form-item:last-child {
			border-bottom: 1rpx solid transparent;
		}
	}

	.user-setting-loginout {
		width: calc(100% - @base-gap * 2);
		height: 120rpx;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 20rpx;
		letter-spacing: 20rpx;
		text-align: center;
		line-height: 120rpx;
		font-size: 34rpx;
		color: #303031;
	}
}
</style>
