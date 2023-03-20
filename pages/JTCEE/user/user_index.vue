<template>
	<view class="user-box">
		<view class="page-bg" :style="{ '--clientheight': clientHeight }"></view>
		<view class="user-info">
			<!-- #ifdef H5 -->
			<view class="user-info-setting"><img src="/static/img/JTCEE/user/user-setting.png" @click="goUserSetting" /></view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="user-info-setting user-info-setting-wx"><img src="/static/img/JTCEE/user/user-setting.png" @click="goUserSetting" /></view>
			<!-- #endif -->
			<view class="user-info-content">
				<view class="user-info-head"><img src="https://test.fx67ll.com/fx67ll-img-collection/fx67ll.jpg" /></view>
				<view class="user-info-text">
					<view class="user-info-text-name">fx67ll</view>
					<view class="user-info-text-mail">fx67ll@qq.com</view>
				</view>
			</view>
		</view>
		<view class="user-card">
			<view class="user-card-box">
				<view class="user-card-item">
					<view class="user-card-item-img"><img src="/static/img/JTCEE/user/user-express-use.png" /></view>
					<!-- 这里后期用js动态处理一下，超过九位数显示999999999+ -->
					<view class="user-card-item-num">
						<text class="user-card-item-num-text">{{ Math.round(Math.random() * (999 - 1) + 1) }}</text>
					</view>
					<view class="user-card-item-text">{{ $t('user_index.express.use') }}</view>
				</view>
				<view class="user-card-item">
					<view class="user-card-item-img"><img src="/static/img/JTCEE/user/user-express-get.png" /></view>
					<!-- 这里后期用js动态处理一下，超过九位数显示999999999+ -->
					<view class="user-card-item-num">
						<text class="user-card-item-num-text">{{ Math.round(Math.random() * (23 - 1) + 1) }}</text>
					</view>
					<view class="user-card-item-text">{{ $t('user_index.express.get') }}</view>
				</view>
				<view class="user-card-item">
					<view class="user-card-item-img"><img src="/static/img/JTCEE/user/user-express-money.png" /></view>
					<!-- 这里后期用js动态处理一下，超过九位数显示999999999+ -->
					<view class="user-card-item-num">
						<text class="user-card-item-num-text">{{ Math.round(Math.random() * (9999 - 1) + 1) }}</text>
						<text class="user-card-item-num-plus">+</text>
					</view>
					<view class="user-card-item-text">{{ $t('user_index.express.money') }}</view>
				</view>
			</view>
		</view>
		<view class="user-manager">
			<view class="user-manager-item" @click="goGetExpress">
				<view class="user-manager-title">
					<view class="user-manager-title-img"><img src="/static/img/JTCEE/user/user-express.png" /></view>
					<text class="user-manager-title-text">{{ $t('user_index.manager.express') }}</text>
				</view>
				<view class="user-manager-icon"><uni-icons type="right" size="16" color="#BFBFBF"></uni-icons></view>
			</view>
			<view class="user-manager-item" @click="goManagerGoods">
				<view class="user-manager-title">
					<view class="user-manager-title-img"><img src="/static/img/JTCEE/user/user-goods.png" /></view>
					<text class="user-manager-title-text">{{ $t('user_index.manager.goods') }}</text>
				</view>
				<view class="user-manager-icon"><uni-icons type="right" size="16" color="#BFBFBF"></uni-icons></view>
			</view>
			<view class="user-manager-item" @click="goManagerAddress">
				<view class="user-manager-title">
					<view class="user-manager-title-img"><img src="/static/img/JTCEE/user/user-address.png" /></view>
					<text class="user-manager-title-text">{{ $t('user_index.manager.address') }}</text>
				</view>
				<view class="user-manager-icon"><uni-icons type="right" size="16" color="#BFBFBF"></uni-icons></view>
			</view>
			<view class="user-manager-item" @click="getMoreNotice">
				<view class="user-manager-title">
					<view class="user-manager-title-img"><img src="/static/img/JTCEE/user/user-notice.png" /></view>
					<text class="user-manager-title-text">{{ $t('user_index.manager.notice') }}</text>
				</view>
				<view class="user-manager-icon">
					<text class="user-manager-icon-text">{{ Math.round(Math.random() * (999 - 1) + 1) }}</text>
					<text class="user-manager-icon-plus">+</text>
					<uni-icons type="right" size="16" color="#BFBFBF"></uni-icons>
				</view>
			</view>
			<view class="user-manager-item" @click="goGetPackage">
				<view class="user-manager-title">
					<view class="user-manager-title-img"><img src="/static/img/JTCEE/user/user-package.png" /></view>
					<text class="user-manager-title-text">{{ $t('user_index.manager.package') }}</text>
				</view>
				<view class="user-manager-icon"><uni-icons type="right" size="16" color="#BFBFBF"></uni-icons></view>
			</view>
		</view>
		<view class="user-chart">
			<view class="user-chart-title">
				<text class="user-chart-title-text">{{ $t('user_index.chart.title') }}</text>
				<picker mode="multiSelector" @columnchange="chooseChartDate" :value="chartIndex" :range="chartArray">
					<view class="user-chart-title-choose">
						<view class="user-chart-title-date">{{ chartArray[0][chartIndex[0]] + '-' + chartArray[1][chartIndex[1]] }}</view>
						<uni-icons class="user-chart-title-icon" type="bottom" size="14" color="#838383"></uni-icons>
					</view>
				</picker>
			</view>
			<!-- <view class="user-chart-unit">
				{{ $t('user_index.chart.unit') }}
			</view> -->
			<!-- #ifdef H5 -->
			<view class="user-chart-box" id="user-chart-id"></view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="user-chart-box user-chart-box-wx" id="user-chart-id">微信端暂未适配</view>
			<!-- #endif -->
		</view>
		<!-- 由于card做了偏移，底部不需要这么高的元素来垫了 -->
		<view class="bottom-gap bottom-gap-offset"></view>
		<view class="bottom-menu">
			<view class="bottom-menu-box">
				<view class="bottom-menu-item" @click="goHome">
					<view class="bottom-menu-icon"><img src="/static/img/JTCEE/bottom/bottom-home.png" /></view>
					<view class="bottom-menu-text">{{ $t('bottom_menu.home') }}</view>
				</view>
				<view class="bottom-menu-logo"><img src="/static/img/JTCEE/logo/logo2-1.png" /></view>
				<view class="bottom-menu-item">
					<view class="bottom-menu-icon"><img src="/static/img/JTCEE/bottom/bottom-user-active.png" /></view>
					<view class="bottom-menu-text">{{ $t('bottom_menu.user') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { dateArray, dateIndex } from '@/static/utils/uni-date-picker.js';

// #ifdef H5
import * as echarts from '@/node_modules/echarts';
// #endif

// 微信端待适配
// #ifdef MP-WEIXIN
// #endif

export default {
	data() {
		return {
			// 屏幕高度，用于自适应
			clientHeight: 'auto',
			// 状态栏高度，用于微信小程序适配
			statusBarHeight: 0,
			chartArray: dateArray,
			chartIndex: dateIndex
		};
	},
	onShow() {
		this.clientHeight = uni.getWindowInfo().windowHeight + 'px';
		this.statusBarHeight = uni.getWindowInfo().statusBarHeight + 'px';
	},
	mounted() {
		// #ifdef H5
		this.initChart();
		// #endif

		// 微信端待适配
		// #ifdef MP-WEIXIN
		// #endif
	},
	methods: {
		goHome() {
			uni.reLaunch({
				url: '/pages/JTCEE/index/index'
			});
		},
		goUserSetting() {
			uni.navigateTo({
				url: '/pages/JTCEE/user/user_setting'
			});
		},
		goGetExpress() {
			uni.navigateTo({
				url: '/pages/JTCEE/invoice/invoice_index?fromType=2'
			});
		},
		goManagerGoods() {
			uni.navigateTo({
				url: '/pages/JTCEE/goods/goods_index'
			});
		},
		goManagerAddress() {
			uni.navigateTo({
				url: '/pages/JTCEE/address/address_index?fromType=2'
			});
		},
		getMoreNotice() {
			uni.navigateTo({
				url: '/pages/JTCEE/notice/notice_catagory?fromType=2'
			});
		},
		goGetPackage() {
			uni.navigateTo({
				url: '/pages/JTCEE/package/package_index'
			});
		},
		chooseChartDate(e) {
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.chartIndex[e.detail.column] = e.detail.value;
			this.$forceUpdate();
		},
		initChart() {
			let chartDom = document.getElementById('user-chart-id');
			let myChart = echarts.init(chartDom);
			let option = {
				grid: {
					top: '6%',
					bottom: '12%',
					left: '5.5%',
					right: '7%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['2022-06-01', '2022-06-02', '2022-06-03', '2022-06-04', '2022-06-05', '2022-06-06', '2022-06-07', '2022-06-08', '2022-06-09', '2022-06-10'],
					axisLine: {
						lineStyle: {
							color: '#E9E9E9'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#838383',
						fontSize: 9,
						rotate: 0
					},
					splitLine: {
						show: false
					}
				},
				yAxis: {
					type: 'value',
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#838383',
						fontSize: 9
					}
				},
				series: [
					{
						data: [100, 500, 550, 600, 420, 520, 400, 300, 500, 100],
						type: 'line',
						smooth: true,
						color: '#5BC797',
						symbol: 'circle',
						symbolSize: 4,
						lineStyle: {
							color: '#5BC797'
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{
											offset: 0,
											color: 'rgba(91, 199, 151, 0.5)'
										},
										{
											offset: 1,
											color: 'rgba(91, 199, 151, 0)'
										}
									],
									global: false
								}
							}
						}
					}
				]
			};
			myChart.setOption(option);
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/JTCEE/mixin.less');

@offset-top: -80rpx;

.user-box {
	width: 100%;
	background-color: @topic-bgc;

	// 这里是为了保证页面没有撑开也能有灰色的背景
	.page-bg {
		width: 100%;
		height: var(--clientheight);
		position: fixed;
		top: 0;
		background-color: @topic-bgc;
		z-index: -1;
	}

	.user-info {
		width: 100%;
		height: 420rpx;
		background-image: url('/static/img/JTCEE/user/user-info-bg.png');
		background-size: 100% 100%;

		@setting-size: 40rpx;
		.user-info-setting {
			width: calc(100% - @base-gap * 2);
			height: @setting-size;
			margin: 0 auto;
			display: flex;
			justify-content: flex-end;
			img {
				width: @setting-size;
				height: 100%;
				position: relative;
				top: 68rpx;
				right: 20rpx;
			}
		}
		.user-info-setting-wx {
			img {
				top: calc(152rpx + @setting-size);
			}
		}
		.user-info-content {
			width: calc(100% - @base-gap * 2);
			height: 130rpx;
			margin: calc(152rpx - @setting-size) auto 0 auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.user-info-head {
				width: 140rpx;
				height: 140rpx;
				position: relative;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 110%;
				}
			}
			.user-info-text {
				color: #ffffff;
				margin-left: 17rpx;
				.user-info-text-name {
					font-size: 30rpx;
				}
				.user-info-text-mail {
					font-size: 26rpx;
					margin-top: 19rpx;
				}
			}
		}
	}

	.user-card {
		width: calc(100% - @base-gap * 2);
		height: 220rpx;
		background: #ffffff;
		box-shadow: 0px 10px 20px 1px rgba(164, 164, 164, 0.2);
		border-radius: 20rpx;
		margin: 0 auto;
		position: relative;
		top: @offset-top;
		z-index: 2;
		.user-card-box {
			width: 85%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.user-card-item {
				width: 33%;
				height: 100%;
				text-align: center;
				.user-card-item-img {
					width: 88rpx;
					height: 88rpx;
					margin: 23rpx auto 10rpx auto;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.user-card-item-num {
					color: #f8bb32;
					.user-card-item-num-text {
						font-size: 36rpx;
					}
					.user-card-item-num-plus {
						font-size: 26rpx;
						position: relative;
						top: -18rpx;
					}
				}
				.user-card-item-text {
					font-size: 26rpx;
					color: #303031;
				}
			}
		}
	}

	.user-manager {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto 30rpx auto;
		padding: 20rpx 0 10rpx 0;
		background-color: #ffffff;
		border-radius: 20rpx;
		position: relative;
		top: @offset-top;
		z-index: 1;
		.user-manager-item {
			width: calc(100% - 40rpx);
			height: 120rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.user-manager-title {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.user-manager-title-img {
					width: 45rpx;
					height: 45rpx;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.user-manager-title-text {
					font-size: 30rpx;
					color: #303031;
					margin-left: 20rpx;
					line-height: 120rpx;
				}
			}
			.user-manager-icon {
				color: #ed4740;
				.user-manager-icon-text {
					font-size: 28rpx;
				}
				.user-manager-icon-plus {
					font-size: 20rpx;
					position: relative;
					top: -15rpx;
					margin-right: 8rpx;
				}
			}
		}
	}

	.user-chart {
		width: calc(100% - @base-gap * 2);
		margin: 0 auto 20rpx auto;
		background-color: #ffffff;
		border-radius: 20rpx;
		position: relative;
		top: @offset-top;
		.user-chart-title {
			width: 100%;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.user-chart-title-text {
				font-size: 30rpx;
				color: #313131;
				margin-left: 33rpx;
				position: relative;
				top: -5rpx;
			}
			.user-chart-title-choose {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-right: 15rpx;
				.user-chart-title-date {
					font-size: 24rpx;
					color: #838383;
					margin-right: 5rpx;
				}
				.user-chart-title-icon {
					margin-right: 25rpx;
					position: relative;
					top: 3rpx;
				}
			}
		}
		// .user-chart-unit{
		// 	width: 100%;
		// 	margin-left: 33rpx;
		// 	font-size: 20rpx;
		// 	color: #838383;
		// }
		.user-chart-box {
			width: 100%;
			height: 480rpx;
		}
		.user-chart-box-wx {
			font-size: 40rpx;
			color: @topic-green;
			text-align: center;
			line-height: 420rpx;
			border: @test-line-width solid @topic-green;
		}
	}
}
</style>
