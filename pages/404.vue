<template>
	<view class="fx67ll-404">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><!-- 这里是状态栏，用于app端的状态栏抵消 --></view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || H5 -->
		<view class="status-bar-wx" :style="{ '--statusbarheight': statusBarHeight }"><!-- 这里是状态栏，用于微信端的状态栏抵消 --></view>
		<!-- #endif -->

		<view class="fx67ll-404-content">
			<view class="shelf">
				<view class="book home-page" @click="openLink('https://fx67ll.com')">个人主页</view>
				<view class="book contact" @click="openLink('https://fx67ll.xyz/s/messageboard')">联系管理员</view>
				<view class="book about-us" @click="openLink('https://fx67ll.xyz')">技术博客</view>
				<view class="book faq" @click="back">返回上一页</view>
				<view class="book not-found"></view>
				<view class="door left"></view>
				<view class="door right"></view>
			</view>
			<text class="title">404</text>
			<text class="desc">糟糕，当前网页不存在，如有需要请留言咨询~</text>
		</view>

		<fx67ll-footer />
	</view>
</template>

<script>
import { openExternalUrl } from '@/utils/browser.js';

export default {
	name: '404',
	data() {
		return {
			// 状态栏高度，用于微信端/H5端的状态栏抵消
			statusBarHeight: '0px'
		};
	},
	onLoad() {
		// #ifdef MP-WEIXIN || H5
		try {
			const sysInfo = uni.getWindowInfo();
			this.statusBarHeight = (sysInfo.statusBarHeight || 0) + 'px';
		} catch (e) {
			this.statusBarHeight = '0px';
		}
		// #endif
	},
	methods: {
		// 打开外部链接，跨端统一处理
		openLink(url) {
			openExternalUrl(url);
		},
		// 返回上一页，无历史记录时回到首页
		back() {
			const pages = getCurrentPages();
			if (pages.length > 1) {
				uni.navigateBack();
			} else {
				uni.reLaunch({ url: '/pages/index' });
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.fx67ll-404 {
	width: 100%;
	height: 100%;
	min-height: 100vh;
	margin: 0;
	padding: 0;
	background-color: #446072;
	font-family: 'Microsoft YaHei', sans-serif;
	color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	box-sizing: border-box;
}

/* 状态栏抵消（与项目其它页面保持一致） */
.status_bar {
	height: var(--status-bar-height, 0px);
	width: 100%;
}

.status-bar-wx {
	height: var(--statusbarheight, 0px);
	width: 100%;
}

.fx67ll-404-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.title {
	margin-top: 2rem;
	font-size: 100px;
	font-weight: bold;
	line-height: 1;
	margin-bottom: 2rem;
}

.desc {
	font-family: 'Microsoft YaHei', 'Segoe UI', 'Lucida Grande', Helvetica, Arial, sans-serif;
	font-size: 16px;
}

.shelf {
	position: relative;
	width: 30rem;
	height: 14rem;
	border: 0.5rem solid #374d5b;
	border-radius: 0.5rem;
	background-color: rgba(255, 255, 255, 0.1);
	perspective: 130rem;
	box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.2);
}

.door {
	position: absolute;
	width: 14.8rem;
	height: 14rem;
	display: flex;
	box-sizing: border-box;
	padding: 1rem;
	background-color: #374d5b;
	align-items: center;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.door::before {
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.1);
	content: '';
}

.door.left {
	border-radius: 0 0.75rem 0.75rem 0;
	justify-content: flex-end;
	animation: leftDoorOpen 3.5s ease-out forwards 1s, leftDoorFlap 15s linear infinite forwards 9s;
	transform-origin: 0 0 0;
}

.door.right {
	right: 0;
	border-radius: 0.75rem 0 0 0.75rem;
	animation: rightDoorOpen 3s ease-out forwards 1.5s, rightDoorFlap 10s linear infinite forwards 8s;
	transform-origin: 100% 0 0;
}

.book {
	position: absolute;
	box-sizing: border-box;
	padding: 0.8rem 4rem 0.8rem 2rem;
	border-radius: 0.25rem;
	background-color: rgba(255, 255, 255, 0.1);
	color: #ffffff;
	font-size: 1rem;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	cursor: pointer;
	box-shadow: inset 0 0 0.75rem rgba(255, 255, 255, 0.1);
}

.book.home-page {
	transform: rotate(-90deg) translate(-12.4rem, 3rem);
	transform-origin: 0;
}

.book.about-us {
	transform: rotate(-100deg) translate(-13.4rem, 6.1rem);
	transform-origin: 0;
}

.book.contact {
	right: 2rem;
	bottom: 0.2rem;
	border-radius: 0.3rem 0 0 0.3rem;
}

.book.faq {
	right: 0.8rem;
	bottom: 3.3rem;
	border-radius: 0.3rem 0 0 0.3rem;
}

.book.not-found {
	width: 12rem;
	height: 3.5rem;
	border: 1px dashed rgba(255, 255, 255, 0.3);
	background-color: transparent;
	transform: rotate(-90deg) translate(-12rem, 13rem) scale(1);
	transform-origin: 0;
	cursor: default;
	animation: bookFadeOut 1s 3s infinite forwards;
}

.book.not-found::after {
	display: block;
	width: 10rem;
	padding-left: 5rem;
	background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='30'><path fill='rgb(255, 255, 255)' d='M7.688,3.737C6.1,10.409,4.624,16.982,2.475,23.517c-0.424,1.29,0.724,2.338,1.957,1.916 c5.879-2.021,11.743-4.107,17.409-6.696c1.246-0.572,0.443-2.366-0.815-1.932c-3.856,1.333-7.695,2.69-11.565,3.959 c2.879-2.526,5.485-5.215,9.013-7.17c4.441-2.459,9.299-4.109,14.281-4.915c10.903-1.772,22.052,0.562,31.979,5.04 c9.241,4.162,12.895,8.725,13.164,4.942c0.121-1.69-5.57-4.953-14.125-8.714C53.19,5.292,41.094,3.539,29.636,6.058 c-7.122,1.567-16.708,5.374-22.064,11.544c1.359-4.455,2.461-9.028,3.032-13.563C10.852,2.091,8.12,1.927,7.688,3.737z'/></svg>");
	background-repeat: no-repeat;
	background-size: 4rem;
	background-position: left center;
	font-family: 'Dancing Script';
	text-transform: lowercase;
	font-size: 25px;
	content: "this page can't be found";
	transform: rotate(90deg) translate(6rem, -1rem);
	opacity: 0.3;
}

.book:active:not(.not-found) {
	background-color: rgba(255, 255, 255, 0.2);
}

@keyframes leftDoorOpen {
	60% {
		transform: rotateY(-115deg);
	}

	100% {
		transform: rotateY(-110deg);
	}
}

@keyframes rightDoorOpen {
	60% {
		transform: rotateY(125deg);
	}

	100% {
		transform: rotateY(120deg);
	}
}

@keyframes rightDoorFlap {
	0% {
		transform: rotateY(120deg);
	}

	5% {
		transform: rotateY(125deg);
	}

	15% {
		transform: rotateY(117deg);
	}

	25% {
		transform: rotateY(123deg);
	}

	30% {
		transform: rotateY(120deg);
	}

	100% {
		transform: rotateY(120deg);
	}
}

@keyframes leftDoorFlap {
	0% {
		transform: rotateY(-110deg);
	}

	5% {
		transform: rotateY(-115deg);
	}

	15% {
		transform: rotateY(-107deg);
	}

	25% {
		transform: rotateY(-113deg);
	}

	30% {
		transform: rotateY(-110deg);
	}

	100% {
		transform: rotateY(-110deg);
	}
}

@keyframes bookFadeOut {
	50% {
		border: 1px dashed rgba(255, 255, 255, 0.1);
	}
}

/* ========== 小程序/App 端移动端适配 ==========
   原生端不支持 @media 媒体查询，且无地址栏直接访问场景（404 仅由拦截器跳转触达），
   这里用 rpx 按小屏基准统一收紧尺寸，避免书架在手机端溢出 */
/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || APP-PLUS */
.title {
	font-size: 96rpx;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}

.desc {
	font-size: 28rpx;
	text-align: center;
	padding: 0 20rpx;
	line-height: 1.6;
}

.shelf {
	width: 600rpx;
	height: 280rpx;
	border-width: 10rpx;
	perspective: 1600rpx;
}

.door {
	width: 296rpx;
	height: 280rpx;
	padding: 20rpx;
}

.door::before {
	width: 30rpx;
	height: 30rpx;
}

.door.left {
	border-radius: 0 15rpx 15rpx 0;
}

.door.right {
	border-radius: 15rpx 0 0 15rpx;
}

.book {
	padding: 16rpx 80rpx 16rpx 40rpx;
	font-size: 20rpx;
	letter-spacing: 2rpx;
	border-radius: 5rpx;
}

.book.home-page {
	transform: rotate(-90deg) translate(-248rpx, 60rpx);
}

.book.about-us {
	transform: rotate(-100deg) translate(-268rpx, 122rpx);
}

.book.contact {
	right: 40rpx;
	bottom: 4rpx;
	border-radius: 6rpx 0 0 6rpx;
}

.book.faq {
	right: 16rpx;
	bottom: 66rpx;
	border-radius: 6rpx 0 0 6rpx;
}

.book.not-found {
	width: 240rpx;
	height: 70rpx;
	transform: rotate(-90deg) translate(-240rpx, 260rpx) scale(1);
}

.book.not-found::after {
	width: 200rpx;
	padding-left: 100rpx;
	background-size: 80rpx;
	font-size: 30rpx;
	transform: rotate(90deg) translate(120rpx, -20rpx);
}
/* #endif */

/* ========== H5 端移动端适配 ========== */
@media screen and (max-width: 768px) {
	.fx67ll-404 {
		padding: 1rem;
		box-sizing: border-box;
	}

	.title {
		font-size: 64px;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.desc {
		font-size: 14px;
		text-align: center;
		padding: 0 1rem;
		line-height: 1.6;
	}

	.shelf {
		width: 18rem;
		height: 8.4rem;
		border-width: 0.3rem;
		perspective: 80rem;
	}

	.door {
		width: 8.88rem;
		height: 8.4rem;
		padding: 0.6rem;
	}

	.door::before {
		width: 0.9rem;
		height: 0.9rem;
	}

	.door.left {
		border-radius: 0 0.45rem 0.45rem 0;
	}

	.door.right {
		border-radius: 0.45rem 0 0 0.45rem;
	}

	.book {
		padding: 0.48rem 2.4rem 0.48rem 1.2rem;
		font-size: 0.6rem;
		letter-spacing: 0.06rem;
		border-radius: 0.15rem;
	}

	.book.home-page {
		transform: rotate(-90deg) translate(-7.44rem, 1.8rem);
	}

	.book.about-us {
		transform: rotate(-100deg) translate(-8.04rem, 3.66rem);
	}

	.book.contact {
		right: 1.2rem;
		bottom: 0.12rem;
		border-radius: 0.18rem 0 0 0.18rem;
	}

	.book.faq {
		right: 0.48rem;
		bottom: 1.98rem;
		border-radius: 0.18rem 0 0 0.18rem;
	}

	.book.not-found {
		width: 7.2rem;
		height: 2.1rem;
		transform: rotate(-90deg) translate(-7.2rem, 7.8rem) scale(1);
	}

	.book.not-found::after {
		width: 6rem;
		padding-left: 3rem;
		background-size: 2.4rem;
		font-size: 15px;
		transform: rotate(90deg) translate(3.6rem, -0.6rem);
	}
}

/* ========== 小屏手机进一步适配 ========== */
@media screen and (max-width: 414px) {
	.title {
		font-size: 48px;
	}

	.shelf {
		width: 16rem;
		height: 7.46rem;
	}

	.door {
		width: 7.88rem;
		height: 7.46rem;
	}

	.book.home-page {
		transform: rotate(-90deg) translate(-6.61rem, 1.6rem);
	}

	.book.about-us {
		transform: rotate(-100deg) translate(-7.15rem, 3.25rem);
	}

	.book.not-found {
		width: 6.4rem;
		height: 1.87rem;
		transform: rotate(-90deg) translate(-6.4rem, 6.93rem) scale(1);
	}

	.book.not-found::after {
		width: 5.3rem;
		padding-left: 2.7rem;
		background-size: 2.1rem;
		font-size: 13px;
		transform: rotate(90deg) translate(3.2rem, -0.5rem);
	}
}
</style>
