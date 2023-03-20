<template>
	<view class="fx67ll-tools-box">
		<div class="fx67ll-btn-box">
			<!-- 
			1. 优化大乐透的选号方案，是否严格限制重复号码
			2. 添加设置，当日幸运数字，输入之后必须出现在随机号码中
			3. 幸运按钮点击之后，添加一个动画效果，然后展示今天是否适合买彩票，虽然永远不会用，但是我想做一个这个功能
			4. 完成彩票的基础功能的之后，重新开一个项目做一个fx67ll的App，添加之前一直想做的，在地图上记录行踪的功能
			-->

			<div class="fx67ll-btn-item fx67ll-btn-item-two">
				<button class="fx67ll-btn-default" type="default" @click="getLuckyNumber">获取今日随机号码</button>
				<uni-icons class="fx67ll-btn-icon" type="gear-filled" :size="iconSize" @click="editLuckySetting"></uni-icons>
			</div>
			<div class="fx67ll-btn-item fx67ll-btn-item-two">
				<button class="fx67ll-btn-default" type="default" @click="importLuckyImg">上传照片自动分析</button>
				<uni-icons class="fx67ll-btn-icon" type="camera-filled" :size="iconSize" @click="useCamera"></uni-icons>
			</div>
			<div class="fx67ll-btn-item"><button class="fx67ll-btn-default" type="warn" @click="isLuckyDay">点击看看今天是否幸运</button></div>
		</div>

		<!-- 页面底部抽屉 -->
		<zb-drawer-LTOFE mode="bottom" :title="drawerTitle" :wrapperClosable="false" :visible.sync="isShowDrawer" :radius="true" :height="drawerHeight">
			<div v-if="showType === 'luckyNumber'">
				<div id="luckyNumberText" class="fx67ll-number-box">
					<div class="fx67ll-number-item" v-for="(item, index) in luckyNumberList" :key="item.timeStamp">
						<!-- #ifdef H5 -->
						<span v-for="(redNum, j) in item.lottoryNumberFirst" :key="Math.random() * redNum + j">{{ redNum }}</span>
						-
						<span v-for="(blueNum, k) in item.lottoryNumberSecond" :key="Math.random() * blueNum + k">{{ blueNum }}</span>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<span v-for="(itemFirst, j) in item.lottoryNumberFirst" :key="itemFirst.key">{{ itemFirst.num }}</span>
						-
						<span v-for="(itemSecond, k) in item.lottoryNumberSecond" :key="itemSecond.key">{{ itemSecond.num }}</span>
						<!-- #endif -->
					</div>
				</div>
				<button class="fx67ll-btn-submit" type="primary" @click="copyLuckyNumber">拷贝至剪切板</button>
			</div>

			<div class="fx67ll-drawer-img" v-if="showType === 'luckyPhoto' && lottoryTicketArr.length > 0">
				<!-- <uni-icons class="fx67ll-img-icon" type="trash" size="24" color="#BFBFBF" @click="deleteImportImg"></uni-icons> -->
				<img class="fx67ll-img-lottory" :src="lottoryTicketArr[0]" @click="previewImportImg" />
			</div>

			<div class="fx67ll-drawer-setting" v-if="showType === 'luckySetting'">
				<div class="fx67ll-setting-item">
					<span>需要随机输出的注数</span>
					<uni-number-box :min="1" :max="5" v-model="settingInfo.luckyCount" @change="luckyCountChange"></uni-number-box>
				</div>
				<div class="fx67ll-setting-item">
					<span>是否允许出现重复串号</span>
					<switch class="fx67ll-setting-switch" :checked="settingInfo.isNeedRepeat" @change="isNeedRepeatChange" />
				</div>
				<button class="fx67ll-btn-submit" type="primary" @click="saveLuckySetting">保存设置</button>
			</div>
		</zb-drawer-LTOFE>
	</view>
</template>

<script>
// 官方组件库
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import uniNumberBox from '@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue';
// underscores函数库
import _ from '@/node_modules/underscore';
// 日期时间处理
import moment from '@/node_modules/moment';
import '@/node_modules/moment/locale/zh-cn';
// 快速排序
import { quickSort } from '@/static/utils/index.js';

export default {
	components: {
		uniIcons,
		uniNumberBox
	},
	data() {
		return {
			// 按钮图标大小
			iconSize: 32,
			// 定时器对象
			timer: null,
			// 今日星期几
			todayWeek: moment().format('E'),
			// todayWeek: '2',
			// Drawer组件相关参数
			isShowDrawer: false,
			drawerHeight: '75%',
			drawerTitle: moment().format('YYYY-MM-DD hh:mm:ss dddd'),
			showType: '',
			// SSQ红蓝球
			luckyNumberRed: [],
			luckyNumberBlue: [],
			// DLT前后区
			luckyNumberFront: [],
			luckyNumberBack: [],
			// 今日随机号码
			luckyNumberList: [],
			// SSQ固定追号
			luckyNumberSSQ: {
				timeStamp: new Date().getTime(),
				lottoryNumberFirst: [1, 4, 5, 8, 10, 23],
				lottoryNumberSecond: [5]
			},
			// DLT固定追号
			luckyNumberDLT: {
				timeStamp: new Date().getTime(),
				lottoryNumberFirst: [4, 7, 8, 10, 23],
				lottoryNumberSecond: [4, 9]
			},
			// 需要拷贝到剪切板的内容
			copyTextContent: '',
			// 照片数组
			lottoryTicketArr: [],
			idImgArrBack: [],
			// 设置相关参数
			settingInfo: {
				// 输出注数
				luckyCount: 5,
				// 是否允许重复
				isNeedRepeat: false
			}
		};
	},
	onLoad() {
		// moment初始汉化
		moment.locale('zh-cn');
		// 初始化随机号码
		this.initLuckyNumber();
		// 初始化缓存设置
		this.initCacheSetting();
	},
	onShow() {
		// 显示当前时间
		this.showNowTime();
	},
	onUnload() {
		// 销毁时清除定时器
		this.timer = null;
	},
	methods: {
		// 显示今日随机号码
		getLuckyNumber() {
			if (this.todayWeek === '5') {
				uni.showToast({
					title: '非常抱歉，今天是星期五，不提供随机号码选择~',
					icon: 'none',
					duration: 1998
				});
			} else {
				this.showType = 'luckyNumber';
				this.packageRandomList();

				// #ifdef H5
				this.drawerHeight = `${170 + this.settingInfo.luckyCount * 30}px`;
				// #endif

				// #ifdef MP-WEIXIN
				this.drawerHeight = `${200 + this.settingInfo.luckyCount * 30}px`;
				// #endif

				this.isShowDrawer = true;
			}
		},
		// 从奖池中摇奖
		rollNumber(luckyList, numberList, count) {
			let tempLucky = [...luckyList];
			let tempNumber = [...numberList];
			let randomIndex = Math.floor(Math.random() * tempNumber.length);
			tempLucky.push(tempNumber[randomIndex]);
			tempLucky = quickSort(tempLucky);
			tempNumber.splice(randomIndex, 1);
			count--;
			if (count > 0) {
				return this.rollNumber(tempLucky, tempNumber, count);
			} else {
				let checkResArr = this.checkSameNumber(tempLucky);
				if (checkResArr && checkResArr.length !== 0) {
					return tempLucky;
				} else {
					if (tempLucky.length === 6) {
						return this.rollNumber([], this.luckyNumberRed, tempLucky.length);
					}
					if (tempLucky.length === 1) {
						return this.rollNumber([], this.luckyNumberBlue, tempLucky.length);
					}
					if (tempLucky.length === 5) {
						return this.rollNumber([], this.luckyNumberFront, tempLucky.length);
					}
					if (tempLucky.length === 2) {
						return this.rollNumber([], this.luckyNumberBack, tempLucky.length);
					}
				}
			}
		},
		// 检查后半区是否有重复号码
		checkSameNumber(numberList) {
			let isSameNumber = false;
			let tempList = [...numberList];
			if (!this.settingInfo.isNeedRepeat) {
				for (var i = 0; i < this.luckyNumberList.length; i++) {
					// #ifdef H5
					if (_.isEqual(tempList, this.luckyNumberList[i].lottoryNumberFirst) || _.isEqual(tempList, this.luckyNumberList[i].lottoryNumberSecond)) {
						isSameNumber = true;
					}
					// #endif
					// #ifdef MP-WEIXIN
					if (_.isEqual(tempList, [this.luckyNumberList[i].lottoryNumberSecond[0].num])) {
						isSameNumber = true;
					}
					// #endif
				}
			}
			if (isSameNumber) {
				return [];
			} else {
				return tempList;
			}
		},
		// 组装今今日随机号码
		packageRandomList() {
			this.luckyNumberList = [];
			if (this.todayWeek === '1' || this.todayWeek === '3' || this.todayWeek === '6') {
				// #ifdef H5
				this.luckyNumberList.push(this.luckyNumberDLT);
				// #endif
				// #ifdef MP-WEIXIN
				this.luckyNumberList.push(this.packageTempObjForWX(this.luckyNumberDLT));
				// #endif
				for (var i = 0; i < this.settingInfo.luckyCount - 1; i++) {
					// #ifdef H5
					this.luckyNumberList.push(this.packageTempObj('DLT', i));
					// #endif
					// #ifdef MP-WEIXIN
					this.luckyNumberList.push(this.packageTempObjForWX(this.packageTempObj('DLT', i)));
					// #endif
				}
			}
			if (this.todayWeek === '2' || this.todayWeek === '4' || this.todayWeek === '7') {
				// #ifdef H5
				this.luckyNumberList.push(this.luckyNumberSSQ);
				// #endif
				// #ifdef MP-WEIXIN
				this.luckyNumberList.push(this.packageTempObjForWX(this.luckyNumberSSQ));
				// #endif
				for (var i = 0; i < this.settingInfo.luckyCount - 1; i++) {
					// #ifdef H5
					this.luckyNumberList.push(this.packageTempObj('SSQ', i));
					// #endif
					// #ifdef MP-WEIXIN
					this.luckyNumberList.push(this.packageTempObjForWX(this.packageTempObj('SSQ', i)));
					// #endif
				}
			}
		},
		// 特供微信处理包装单条随机号码，微信小程序不支持key使用表达式，包装一下再渲染
		packageTempObjForWX(numberObj) {
			let tempFirst = [];
			let tempSecond = [];
			let tempObj = { ...numberObj };
			_.each(tempObj.lottoryNumberFirst, function(ita, ina) {
				let temObj = {
					num: ita,
					key: Math.random() * ita + ina
				};
				tempFirst.push(temObj);
			});
			_.each(tempObj.lottoryNumberSecond, function(itb, inb) {
				let temObj = {
					num: itb,
					key: Math.random() * itb + inb
				};
				tempSecond.push(temObj);
			});
			tempObj.lottoryNumberFirst = tempFirst;
			tempObj.lottoryNumberSecond = tempSecond;
			return tempObj;
		},
		// 包装单条随机号码
		packageTempObj(type, mix) {
			let objTemp = {
				timeStamp: new Date().getTime() + mix,
				lottoryNumberFirst: [],
				lottoryNumberSecond: []
			};
			if (type === 'DLT') {
				objTemp.lottoryNumberFirst = this.rollNumber([], this.luckyNumberFront, 5);
				objTemp.lottoryNumberSecond = this.rollNumber([], this.luckyNumberBack, 2);
			}
			if (type === 'SSQ') {
				objTemp.lottoryNumberFirst = this.rollNumber([], this.luckyNumberRed, 6);
				objTemp.lottoryNumberSecond = this.rollNumber([], this.luckyNumberBlue, 1);
			}
			return objTemp;
		},
		// 复制给发给彩票店老板的内容
		copyLuckyNumber() {
			let self = this;
			let luckyTitle = '';
			// let luckyFooter = '\n 老板号码别打错了哈，谢谢~';
			let luckyFooter = '\n';
			let luckyContent = null;
			// #ifdef H5
			luckyContent = document
				.getElementById('luckyNumberText')
				.innerHTML.replace(/(<\/?span.*?>)/g, ' ')
				.replace(/<\/?div.*?>/gi, '\n');
			// #endif
			// #ifdef MP-WEIXIN
			luckyContent = this.packageContextForWX();
			// #endif
			if (this.todayWeek === '1' || this.todayWeek === '3' || this.todayWeek === '6') {
				luckyTitle = ' 老板买' + this.settingInfo.luckyCount + '注自选号码大乐透\n';
				this.copyTextContent = luckyTitle + luckyContent + luckyFooter;
			}
			if (this.todayWeek === '2' || this.todayWeek === '4' || this.todayWeek === '7') {
				luckyTitle = ' 老板买' + this.settingInfo.luckyCount + '注自选号码双色球\n';
				this.copyTextContent = luckyTitle + luckyContent + luckyFooter;
			}
			uni.setClipboardData({
				data: this.copyTextContent,
				showToast: false,
				success: function() {
					uni.showToast({
						title: '已复制到剪切板啦~',
						icon: 'none',
						duration: 1998
					});
					self.isShowDrawer = false;
				},
				fail: function() {
					uni.showToast({
						title: '卧槽复制失败了！请联系管理员~',
						icon: 'none',
						duration: 1998
					});
				}
			});
		},
		// 微信小程序不支持直接操作dom
		packageContextForWX() {
			let self = this;
			let context = '';
			_.each(this.luckyNumberList, function(item, index) {
				let singleContextFirst = '';
				let singleContextSecond = '';
				_.each(item.lottoryNumberFirst, function(ita, ina) {
					singleContextFirst = singleContextFirst.concat(ina === 0 ? ` ` : '', `${JSON.stringify(ita.num)}  `);
				});
				_.each(item.lottoryNumberSecond, function(itb, inb) {
					singleContextSecond = singleContextSecond.concat(inb === 0 ? ` ` : '', `${JSON.stringify(itb.num)}  `);
				});
				context = context.concat(index === 0 ? '\n' : '', `${singleContextFirst}- ${singleContextSecond}`, '\n', index + 1 !== self.luckyNumberList.length ? '\n' : '');
			});
			return context;
		},
		// 初始化随机号码
		initLuckyNumber() {
			if (this.todayWeek === '1' || this.todayWeek === '3' || this.todayWeek === '6') {
				this.initDLT();
			}
			if (this.todayWeek === '2' || this.todayWeek === '4' || this.todayWeek === '7') {
				this.initSSQ();
			}
			// test
			this.initSSQ();
		},
		// 初始化SSQ的奖池初始号码
		initSSQ() {
			this.luckyNumberRed = [];
			this.luckyNumberBlue = [];
			for (var i = 0; i < 33; i++) {
				this.luckyNumberRed.push(i + 1);
			}
			for (var i = 0; i < 16; i++) {
				this.luckyNumberBlue.push(i + 1);
			}
		},
		// 初始化DLT的奖池初始号码
		initDLT() {
			this.luckyNumberFront = [];
			this.luckyNumberBack = [];
			for (var i = 0; i < 35; i++) {
				this.luckyNumberFront.push(i + 1);
			}
			for (var i = 0; i < 12; i++) {
				this.luckyNumberBack.push(i + 1);
			}
		},
		// 显示当前时间
		showNowTime() {
			let self = this;
			this.timer = setInterval(() => {
				self.drawerTitle = moment().format('YYYY-MM-DD hh:mm:ss dddd');
			}, 1000);
		},
		// 从缓存里初始化之前的摇奖设置
		initCacheSetting() {
			let self = this;

			// #ifdef H5
			if (localStorage.getItem('settingInfo')) {
				let settingInfo = JSON.parse(localStorage.getItem('settingInfo'));
				this.settingInfo.luckyCount = settingInfo.luckyCount;
				this.settingInfo.isNeedRepeat = settingInfo.isNeedRepeat;
			}
			// #endif

			// 微信端不支持localStorage
			// #ifdef MP-WEIXIN
			wx.getStorage({
				key: 'settingInfo',
				success: function(res) {
					let settingInfo = JSON.parse(res.data);
					self.settingInfo.luckyCount = settingInfo.luckyCount;
					self.settingInfo.isNeedRepeat = settingInfo.isNeedRepeat;
				}
			});
			// #endif
		},
		// 打开摇奖设置
		editLuckySetting() {
			this.showType = 'luckySetting';
			this.drawerHeight = '220px';
			this.isShowDrawer = true;
		},
		// 本地缓存摇奖设置
		saveLuckySettingLocal() {
			// #ifdef H5
			localStorage.setItem('settingInfo', JSON.stringify(this.settingInfo));
			// #endif

			// 微信端不支持localStorage
			// #ifdef MP-WEIXIN
			wx.setStorage({
				key: 'settingInfo',
				data: JSON.stringify(this.settingInfo)
			});
			// #endif
		},
		// 监听注数监听
		luckyCountChange(e) {
			this.settingInfo.luckyCount = e;
			this.saveLuckySettingLocal();
		},
		// 监听是否允许重复
		isNeedRepeatChange(e) {
			this.settingInfo.isNeedRepeat = e.detail.value;
			this.saveLuckySettingLocal();
		},
		// 保存设置
		saveLuckySetting() {
			let self = this;
			uni.setClipboardData({
				data: this.copyTextContent,
				showToast: false,
				success: function() {
					uni.showToast({
						title: '设置保存成功啦~',
						icon: 'none',
						duration: 1998
					});
					self.isShowDrawer = false;
				},
				fail: function() {
					uni.showToast({
						title: '卧槽设置保存失败了！请联系管理员~',
						icon: 'none',
						duration: 1998
					});
				}
			});
		},
		// 上传图片
		importLuckyImg(type) {
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
					self.showType = 'luckyPhoto';
					self.lottoryTicketArr = [];
					self.lottoryTicketArr.push(res.tempFilePaths[0]);
					self.drawerHeight = '80%';
					self.isShowDrawer = true;
				},
				// 接口调用失败的回调函数，小程序、App
				fail: function(res) {
					// console.log('H5图片上传接口调用失败:' + JSON.stringify(res));
				},
				// 接口调用结束的回调函数（调用成功、失败都会执行），全平台
				complete: function(res) {
					// console.log('H5图片上传接口调用结束:' + JSON.stringify(res));
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
					self.showType = 'luckyPhoto';
					self.lottoryTicketArr = [];
					self.lottoryTicketArr.push(res.tempFiles[0].tempFilePath);
					self.drawerHeight = '80%';
					self.isShowDrawer = true;
				},
				fail(res) {
					// console.log('微信文件图片上传接口调用失败:' + JSON.stringify(res));
				},
				complete(res) {
					// console.log('微信文件图片上传接口调用结束:' + JSON.stringify(res));
				}
			});
			// #endif
		},
		// 删除上传图片（功能暂时不需要）
		deleteImportImg(type) {
			let self = this;
			uni.showModal({
				title: '提示',
				content: '是否删除当前照片',
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定');
						self.lottoryTicketArr = [];
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
		},
		// 预览上传图片
		previewImportImg(type) {
			let self = this;
			uni.previewImage({
				urls: [self.lottoryTicketArr[0]],
				longPressActions: {
					success: function(data) {
						// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						// console.log(err.errMsg);
					}
				}
			});
		},
		// 使用摄像头扫码
		useCamera() {
			// #ifdef H5
			uni.navigateTo({
				url: '/pages/scan/scan_qr'
			});
			// #endif

			// #ifdef MP-WEIXIN
			uni.showToast({
				title: '功能开发中',
				icon: 'none',
				duration: 1998
			});
			// #endif
		},
		// 今天是幸运日吗
		isLuckyDay() {
			uni.showToast({
				title: '今天你真的很幸运！',
				icon: 'none',
				duration: 1998
			});
		}
	}
};
</script>

<style lang="less">
@import url('@/static/style/LTOFE/index/index.less');
</style>
