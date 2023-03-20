<script>
export default {
	onLaunch: function() {
		// console.log('App Launch')
		uni.setLocale('zh-Hans');
		this.$i18n.locale = 'zh-Hans';
	},
	onShow: function() {
		// console.log('App Show')
	},
	onHide: function() {
		// console.log('App Hide')
	}
};
</script>

<style>
/*这里是每个页面公共css */

/* picker按钮颜色公共样式 */
.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
	color: #5bc797 !important;
}

/* radio按钮大小公共样式 */
.uni-radio-input {
	transform: scale(0.8);
}

/* 模态框确定按钮公共样式 */
.uni-modal .uni-modal__btn_primary {
	color: #5bc797 !important;
}

/* 折叠面板标题公共样式 */
.uni-collapse-item__title-box {
	color: #f8bb32 !important;
	/* color: #313131 !important; */
}
.uni-collapse-item__title-text {
	font-size: 32rpx !important;
}

/* #ifdef H5 */
/* 多选框公共样式，微信平台不生效 */
uni-checkbox .uni-checkbox-input {
	border-radius: 50% !important;
	border: 2px solid #b0b0b0;
	transform: scale(0.7);
	position: relative;
	top: -2rpx;
}
uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	background-color: #5bc797;
	border: 2px solid #5bc797;
}
uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
	border-color: #5bc797;
}
/* #endif */

.file-title{
	font-size: 30rpx !important;
}
</style>
