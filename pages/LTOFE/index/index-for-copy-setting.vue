<template>
	<view class="fx67ll-tools-box">
		<!-- 这里需要使用 zb-drawer-LTOFE -->
		<zb-drawer-LTOFE mode="bottom" :title="drawerTitle" :wrapperClosable="false" :visible.sync="isShowDrawer"
			:radius="true" :height="drawerHeight"></zb-drawer-LTOFE>
	</view>
</template>

<script>
	// 这里导入的地址不一样
	import {
		quickSort
	} from '@/static/utils/index.js';
	export default {
		methods: {
			// 这里使用的二维码扫描页地址不同
			useCamera() {
				// #ifdef H5
				uni.navigateTo({
					url: '/pages/LTOFE/scan/scan_qr'
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.showToast({
					title: '功能开发中',
					icon: 'none',
					duration: 1998
				});
				// #endif
			}
		}
	};
</script>

<style lang="less">
	// 这里导入的地址不一样
	@import url('@/static/style/LTOFE/index/index.less');
</style>