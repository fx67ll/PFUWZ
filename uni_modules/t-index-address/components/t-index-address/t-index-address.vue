<template>
	<view class="t-index-address">
		<scroll-view class="t-index-address__scroll-view" :scroll-into-view="scrollview" :scroll-y="true"
			:enable-flex="true">
			<view :id="group.initial" v-for="group in cityList" :key="group.initial">
				<view class="t-index-address__anchor">
					<text>{{ group.initial }}</text>
				</view>
				<view class="t-index-address__list">
					<view class="t-index-address__cell" v-for="(city, index) in group.list" :key="index"
						@click="$emit('select', city)">
						<text>{{ city.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="t-index-address__sidebar">
			<view class="t-index-address__index" v-for="group in cityList" :key="group.initial"
				@touchstart.stop.prevent="onTouchMove(group.initial)" @touchend.stop.prevent="onTouchStop"
				@touchcancel.stop.prevent="onTouchStop">
				<span>{{ group.initial }}</span>
			</view>
		</view>
		<view class="t-index-address__alert" v-if="touchmove">
			<text>{{ activeIndex }}</text>
		</view>
	</view>
</template>

<script>
	import cityList from "./cities.json";

	export default {
		data() {
			return {
				scrollview: "A",
				cityList: [],
				activeIndex: "A",
				touchmove: false,
			};
		},
		watch: {
			activeIndex(value) {
				this.scrollview = value;
			},
		},
		methods: {
			initCityList() {
				this.cityList = cityList;
			},
			onTouchMove(index) {
				this.activeIndex = index;
				this.touchmove = true;
			},
			onTouchStop() {
				this.touchmove = false;
			},
		},
		mounted() {
			this.initCityList();
		},
	};
</script>

<style lang="scss" scoped>
	.t-index-address {
		height: 100%;

		&__scroll-view {
			width: 100%;
			height: 100%;
			max-height: 100vh;
		}

		&__anchor {
			padding: 15rpx 30rpx;
			width: 100%;
			font-size: 28rpx;
			font-weight: 500;
			color: #606266;
			background-color: rgb(245, 245, 245);
		}

		&__list {
			padding: 0 70rpx 0 30rpx;
		}

		&__cell {
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #f2f2f2;

			&:last-child {
				border: none;
			}
		}

		&__sidebar {
			position: fixed;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			z-index: 99;
		}

		&__index {
			padding: 10rpx 20rpx;
			font-size: 22rpx;
			font-weight: 500;
			line-height: 1;
		}

		&__alert {
			position: fixed;
			top: 50%;
			right: 90rpx;
			z-index: 99;
			margin-top: -60rpx;
			width: 120rpx;
			height: 120rpx;
			font-size: 50rpx;
			color: #fff;
			border-radius: 24rpx;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
