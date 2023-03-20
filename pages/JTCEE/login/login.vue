<template>
	<view class="login-box">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
		<!-- #endif -->
		<view class="login-img"><img src="/static/img/JTCEE/login/login-img-bg.png" /></view>
		<view class="login-info">
			<view class="login-card" :class="{ 'login-card-long': !islc }">
				<view class="login-card-head">
					<view class="login-card-head-item" :class="{ 'login-card-head-item-active': islc, 'login-card-head-item-login': !islc }" @click="isLoginCard(true)">
						{{ $t('login.login') }}
					</view>
					<view class="login-card-head-item" :class="{ 'login-card-head-item-active': !islc, 'login-card-head-item-register': islc }" @click="isLoginCard(false)">
						{{ $t('login.register') }}
					</view>
				</view>
				<view class="login-card-content login-card-login" v-if="islc">
					<view class="login-card-content-title">{{ $t('login.login') }}</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.user') }}</view>
						<input
							id="user-input"
							class="uni-input login-input login-input-blur"
							type="text"
							value=""
							:placeholder="$t('login.user.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('user')"
							@focus="inputFocus('user')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.password') }}</view>
						<input
							id="password-input"
							class="uni-input login-input login-input-blur"
							password
							type="text"
							value=""
							:placeholder="$t('login.password.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('password')"
							@focus="inputFocus('password')"
						/>
					</view>
					<view class="login-change-password" @click="changePassword">{{ $t('login.password.forget') }}？</view>
				</view>
				<view class="login-card-content" v-if="!islc">
					<view class="login-card-content-title">{{ $t('login.register') }}</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.user') }}</view>
						<input
							id="user-input"
							class="uni-input login-input login-input-blur"
							type="text"
							value=""
							:placeholder="$t('login.user.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('user')"
							@focus="inputFocus('user')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.mail') }}</view>
						<input
							id="mail-input"
							class="uni-input login-input login-input-blur"
							type="text"
							value=""
							:placeholder="$t('login.mail.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('mail')"
							@focus="inputFocus('mail')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.password') }}</view>
						<input
							id="password-input"
							class="uni-input login-input login-input-blur"
							password
							type="text"
							value=""
							:placeholder="$t('login.password.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('password')"
							@focus="inputFocus('password')"
						/>
					</view>
					<view class="login-form">
						<view class="login-form-title">{{ $t('login.password.check') }}</view>
						<input
							id="check-input"
							class="uni-input login-input login-input-blur"
							password
							type="text"
							value=""
							:placeholder="$t('login.password.check.placeholder')"
							placeholder-class="login-input-placeholder"
							@blur="inputBlur('check')"
							@focus="inputFocus('check')"
						/>
						<img class="login-form-icon" src="/static/img/JTCEE/login/warning.png" />
					</view>
				</view>
			</view>
			<view class="login-btn" v-if="islc">
				<view class="login-btn-rp" @click="isRememberUser">
					<view class="login-btn-rp-checkbox" :class="{ 'login-btn-rp-checkbox-active': isru }">
						<uni-icons v-if="isru" class="login-btn-rp-checkbox-icon" type="checkmarkempty" size="16" color="#ffffff"></uni-icons>
					</view>
					{{ $t('login.user.remember') }}
				</view>
				<view class="login-btn-submit" @click="submitLogin(1)">
					<!-- 登
					<text class="login-btn-submit-space"></text>
					录 -->
					{{ $t('login.login') }}
				</view>
			</view>
			<view class="login-btn" v-if="!islc">
				<view class="login-btn-left"><!-- 占位 --></view>
				<view class="login-btn-submit" @click="submitLogin(0)">
					<!-- 注
					<text class="login-btn-submit-space"></text>
					册 -->
					{{ $t('login.register') }}
				</view>
			</view>
		</view>
		<view class="login-wx" v-if="islc">
			<view class="login-wx-title">
				<text class="login-wx-title-line"></text>
				<text class="login-wx-title-text">{{ $t('login.login') }}</text>
				<text class="login-wx-title-line"></text>
			</view>
			<view class="login-wx-icon" @click="wxLogin"><img src="/static/img/JTCEE/login/wx.png" /></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否是登录卡片
			islc: true,
			// 是否记住账号
			isru: false
		};
	},
	onLoad() {
		// 为了访问用的提示消息，不做国际化了
		uni.showToast({
			title: '欢迎访问 uni.fx67ll.com 站点~ 本项目是个人用于练习 uni-app 开发能力的纯静态演示项目，主要是模拟一个境外快递包裹的业务流程，无需输入账号密码点击登录即可查看~',
			icon: 'none',
			duration: 8888
		});
	},
	methods: {
		isLoginCard(val) {
			this.islc = val;
		},
		inputBlur(id) {
			// #ifdef H5
			document.getElementById(id + '-input').className = 'uni-input login-input login-input-blur';
			// #endif
		},
		inputFocus(id) {
			// #ifdef H5
			document.getElementById(id + '-input').className = 'uni-input login-input login-input-focus';
			// #endif
		},
		changePassword() {
			console.log('修改密码中...');
			uni.navigateTo({
				url: '/pages/JTCEE/login/forget_password?fromType=1'
			});
		},
		isRememberUser() {
			this.isru = !this.isru;
			console.log('是否记住密码：' + this.isru);
		},
		submitLogin(type) {
			console.log('登录中ing...');
			if(type === 1){
				let loadingTitle = this.$t('uni.loading.login');
				uni.showLoading({
					title: loadingTitle,
					mask: true
				});
				setTimeout(function() {
					uni.hideLoading();
					uni.reLaunch({
						url: '/pages/JTCEE/index/index'
					});
				}, 300);
			}else{
				console.log('注册中ing...');
				this.showTestToast(0);
			}
		},
		wxLogin() {
			console.log('微信登录中ing...');
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

	.login-img {
		width: 100%;
		height: 300rpx;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.login-info {
		width: 100%;
		.flex-box();
		position: relative;
		top: -50rpx;

		.login-card {
			width: calc(100% - @width-gap);
			height: 600rpx;
			background: #ffffff;
			box-shadow: 0px 20px 37px 13px rgba(4, 192, 211, 0.1);
			border-radius: 20px;
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
					letter-spacing: 10rpx;
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
					margin: 39rpx auto 33rpx auto;
					line-height: 72rpx;
					font-size: 48rpx;
					color: #3e4a59;
					letter-spacing: 7rpx;
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
					float: right;
					position: absolute;
					right: 0;
					top: 50rpx;
				}
			}
		}
		.login-card-long {
			height: 850rpx;
		}

		.login-btn {
			width: calc(100% - @width-gap);
			height: 100rpx;
			margin-top: 57rpx;
			display: flex;
			justify-content: space-between;
			.login-btn-rp {
				line-height: 115rpx;
				font-size: @base-font-size;
				color: #666666;
				opacity: 0.45;
				.login-btn-rp-checkbox {
					width: 28rpx;
					height: 28rpx;
					display: inline-block;
					border: 4rpx solid @topic-green;
					border-radius: 50%;
					position: relative;
					top: 8rpx;
					margin: 0 19rpx 0 40rpx;
					.login-btn-rp-checkbox-icon {
						position: absolute;
						top: -43rpx;
						left: -1rpx;
					}
				}
				.login-btn-rp-checkbox-active{
					// border: 4rpx solid transparent;
					background-color: @topic-green;
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
				letter-spacing: 30rpx;
				text-indent: 30rpx;
				.login-btn-submit-space {
					padding: 0 15rpx;
				}
			}
		}
	}

	.login-wx {
		margin: 60rpx auto 150rpx auto;
		.login-wx-title {
			width: 100%;
			.login-wx-title-line {
				width: 181rpx;
				display: inline-block;
				border-top: 3rpx solid @topic-green;
				opacity: 0.5;
			}
			.login-wx-title-text {
				font-size: @base-font-size;
				color: @topic-green;
				margin: 0 20rpx;
				position: relative;
				top: 7rpx;
			}
		}
		.login-wx-icon {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			// border: @test-line-width solid @topic-green;
			margin: 60rpx auto 0 auto;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
