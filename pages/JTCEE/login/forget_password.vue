<template>
	<view class="login-box">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
		<!-- #endif -->
		<view class="login-info">
			<view class="login-card login-card-long">
				<view class="login-card-content login-card-register">
					<view class="login-card-content-title">{{ fromType === '1' ? $t('forget_password.title.forget') : $t('forget_password.title.edit') }}</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('forget_password.mail') }}</view>
						<input
							id="mail-input"
							class="uni-input login-input login-input-blur"
							type="text"
							value=""
							:placeholder="$t('forget_password.mail.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('mail')"
							@focus="inputFocus('mail')"
						/>
						<view class="login-form-send">{{ $t('forget_password.code.send') }}</view>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('forget_password.code') }}</view>
						<input
							id="code-input"
							class="uni-input login-input login-input-blur"
							type="text"
							value=""
							:placeholder="$t('forget_password.code.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('code')"
							@focus="inputFocus('code')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('forget_password.password.new') }}</view>
						<input
							id="password-input"
							class="uni-input login-input login-input-blur"
							password
							type="text"
							value=""
							:placeholder="$t('forget_password.password.new.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('password')"
							@focus="inputFocus('password')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('forget_password.password.new.check') }}</view>
						<input
							id="check-input"
							class="uni-input login-input login-input-blur"
							password
							type="text"
							value=""
							:placeholder="$t('forget_password.password.new.check.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('check')"
							@focus="inputFocus('check')"
						/>
						<img class="login-form-icon" src="/static/img/JTCEE/login/warning.png" />
					</view>
				</view>
			</view>
			<view class="login-btn">
				<view class="login-btn-gb" @click="backLogin">
					<view class="login-btn-gb-arrow"><img src="/static/img/JTCEE/login/arrow.png" /></view>
					{{ fromType === '1' ? $t('forget_password.login') : $t('forget_password.back') }}
				</view>
				<view class="login-btn-submit" @click="submitPassword">{{ $t('forget_password.title.edit') }}</view>
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
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			// 来自哪个位置按钮，1登录忘记密码，2我的修改密码
			fromType: '2'
		};
	},
	onLoad(option) {
		this.fromType = option.fromType;
	},
	methods: {
		inputBlur(id) {
			document.getElementById(id + '-input').className = 'uni-input login-input login-input-blur';
		},
		inputFocus(id) {
			document.getElementById(id + '-input').className = 'uni-input login-input login-input-focus';
		},
		backLogin() {
			if (this.fromType === '1') {
				uni.redirectTo({
					url: '/pages/JTCEE/login/login'
				});
			} else if (this.fromType === '2') {
				uni.redirectTo({
					url: '/pages/JTCEE/user/user_setting'
				});
			} else {
				this.$refs.popup.open();
			}
		},
		confirmErrorDialog() {
			uni.reLaunch({
				url: '/pages/JTCEE/index/index'
			})
		},
		submitPassword() {
			console.log('修改密码中ing...');
			this.showTestToast(0);
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

// 标准左右间隔
@width-gap: 120rpx;

.login-box {
	.flex-box();

	.login-info {
		width: 100%;
		.flex-box();
		position: relative;
		top: 150rpx;

		.login-card {
			width: calc(100% - @width-gap);
			height: 600rpx;
			background: #ffffff;
			box-shadow: 0px 20px 37px 13px rgba(4, 192, 211, 0.1);
			border-radius: 10px;
			.login-card-head {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				.login-card-head-item {
					width: 50%;
					height: 100%;
					font-size: 32rpx;
					text-align: center;
					line-height: 80rpx;
					color: #ffffff;
					background: @topic-green;
					border-radius: 20px;
				}
				@active-top: 30rpx;
				.login-card-head-item-active {
					height: calc(100% + @active-top);
					line-height: calc(90rpx + @active-top);
					color: #343434;
					font-size: 38rpx;
					background-color: #ffffff;
					position: relative;
					top: -@active-top;
				}
				.login-card-head-item-login {
					border-radius: 20px 0px 20px 0px;
				}
				.login-card-head-item-register {
					border-radius: 0px 20px 0px 20px;
				}
			}
			.login-card-content {
				width: 100%;
				.login-card-content-title {
					width: calc(100% - @width-gap);
					margin: 49rpx auto 47rpx auto;
					line-height: 72rpx;
					font-size: 48rpx;
					color: #3e4a59;
					letter-spacing: 7rpx;
					position: relative;
					left: -8rpx;
				}
			}
			.login-card-login {
				.login-change-password {
					width: calc(100% - @width-gap);
					margin: 0 auto;
					margin-top: 35rpx;
					color: @topic-green;
					font-size: @base-font-size;
					text-align: right;
				}
			}
			.login-form {
				width: calc(100% - @width-gap);
				margin: 0 auto;
				position: relative;
				.login-form-title {
					font-size: @base-font-size;
					margin-top: 27rpx;
					color: #3e4a59;
				}
				.login-input {
					padding: 20rpx 20rpx 20rpx 20rpx;
					font-size: 24rpx;
				}
				.login-input-focus {
					border-bottom: 4rpx solid @topic-green;
				}
				.login-input-blur {
					border-bottom: 4rpx solid #d3dfef;
				}
				.login-input-placeholder {
					font-size: 24rpx;
					color: #3e4a59;
					opacity: 0.45;
				}
				.login-form-icon {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 0;
					top: 50rpx;
				}
				.login-form-send {
					width: 200rpx;
					height: 60rpx;
					line-height: 57rpx;
					text-align: center;
					font-size: 24rpx;
					color: #ffffff;
					letter-spacing: 5rpx;
					background: @topic-green;
					border-radius: 35rpx;
					position: absolute;
					right: 0;
					top: 35rpx;
				}
			}
		}
		.login-card-long {
			height: 780rpx;
		}

		.login-btn {
			width: calc(100% - @width-gap);
			height: 100rpx;
			margin-top: 57rpx;
			display: flex;
			justify-content: space-between;
			.login-btn-gb {
				line-height: 115rpx;
				font-size: @base-font-size;
				color: @topic-green;
				opacity: 0.45;
				margin-left: 26rpx;
				.login-btn-gb-arrow {
					width: 40rpx;
					height: 25rpx;
					display: inline-block;
					margin-right: 11rpx;
					position: relative;
					top: 3rpx;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.login-btn-submit {
				width: 50%;
				height: 100rpx;
				background: @topic-green;
				box-shadow: 0px 20px 20px -5px rgba(91, 199, 151, 0.45);
				border-radius: 12px;
				text-align: center;
				line-height: 100rpx;
				color: #ffffff;
				font-size: 36rpx;
				letter-spacing: 15rpx;
				text-indent: 15rpx;
				.login-btn-submit-space {
					padding: 0 15rpx;
				}
			}
		}
	}
}
</style>
