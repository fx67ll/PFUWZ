<template>
	<view class="fx67ll-reservation-box">
		<!-- 全局遮罩层 -->
		<view v-if="loading || !isDataLoaded" class="loading-mask">
			<view class="loading-content">
				<text class="loading-text">加载数据中...</text>
			</view>
		</view>

		<!-- 演示说明与操作区 -->
		<view class="demo-tip-box">
			<view class="demo-tip-text">本页面为麻将室预约的纯前端交互演示，时段数据由本地按日期稳定模拟，不请求任何后端接口</view>
			<view class="demo-tip-btn" @click="handleResetMockData">重置演示数据</view>
		</view>

		<!-- 添加v-if控制，等待模拟数据就绪后再渲染子组件 -->
		<prettyTimes v-if="isDataLoaded" ref="prettyTimes" :showOvernight="appointConfig.showOvernight"
			:beginTime="appointConfig.allowBeginTime" :endTime="appointConfig.allowEndTime"
			:timeInterval="appointConfig.allowTimeInterval" :appointTime="appointConfig.appointTime" :isSection="true"
			:disableTimeSlot="appointConfig.disableTimeSlot" :myAppointTimeSlot="appointConfig.myAppointTimeSlot"
			:formParams="formParams" @change="handleTimeChange" @date-change="handleDateChange"
			@ready="handleComponentReady" @overnight-change="handleOvernightChange">
		</prettyTimes>

		<!-- 底部提交按钮容器（放入文档流，适配安全区域） -->
		<view class="submit-btn-container">
			<button class="submit-btn" @click="handleSubmitReservation">提交预约</button>
		</view>
	</view>
</template>

<script>
// 预约时段选择组件，从麻将室预约业务项目中提炼，已移除组件内置的确认预约按钮，提交入口仅保留页面底部的提交预约按钮
import prettyTimes from "@/components/pretty-times/pretty-times.vue";

// 日期时间处理
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// 引入underscore库用于防抖
import _ from "underscore";

// 本地演示数据缓存键：我的预约记录（模拟后端返回格式，结束时间含1小时缓冲）
const MOCK_MY_LOG_STORAGE_KEY = "mahjongDemoMyReservationLogList";

export default {
	components: { prettyTimes },
	data() {
		return {
			appointConfig: {
				showOvernight: true,
				allowBeginTime: "10:00:00",
				allowEndTime: "22:00:00",
				allowTimeInterval: 1,
				appointTime: [],
				disableTimeSlot: [],
				myAppointTimeSlot: []
			},
			formParams: {
				reservationStartTime: null,
				reservationEndTime: null,
			},
			// 我的预约模拟记录，按日期分组
			myMockLogMap: {},
			nowDateInfo: {},
			// 标记是否选择了包夜
			isOvernightSelected: false,
			// 防抖函数实例
			debouncedSubmitReservation: null,
			// 加载状态
			loading: false,
			// 标记模拟数据是否就绪
			isDataLoaded: false
		};
	},
	onLoad() {
		// 1. 初始化当日日期（与组件返回的 selectedDate 格式一致：YYYY-MM-DD）
		const today = moment().format('YYYY-MM-DD');
		const todayWeek = moment().format('dddd');
		// 2. 初始化 nowDateInfo（匹配 handleDateChange 所需的参数结构）
		this.nowDateInfo = {
			selectedDate: today,
			selectedWeek: todayWeek,
			activeIndex: 0 // 当日在日期列表中的索引（默认第1个）
		};

		// 3. 读取本地缓存的我已约模拟记录
		this.myMockLogMap = uni.getStorageSync(MOCK_MY_LOG_STORAGE_KEY) || {};

		// 4. 初始化防抖函数
		this.debouncedSubmitReservation = _.debounce(this._realHandleSubmitReservation, 500, true);

		// 5. 首次加载数据
		this.initData();
	},
	methods: {
		// 初始化数据方法
		initData() {
			this.loading = true;
			// 模拟请求耗时后填充数据
			setTimeout(() => {
				this.queryMockLogList(this.nowDateInfo);
				this.isDataLoaded = true;
				this.loading = false;
			}, 500);
		},

		// 子组件渲染完成后，同步初始日期到父组件 nowDateInfo
		handleComponentReady() {
			// 子组件的 dateArr 是生成的日期列表，取第一个（默认选中的当日）
			const initDate = this?.$refs?.prettyTimes?.dateArr?.[0] || null;
			if (initDate) {
				this.nowDateInfo = {
					selectedDate: initDate.date,
					selectedWeek: initDate.week,
					activeIndex: 0
				};
			}
		},
		// 根据日期字符串生成稳定的伪随机种子，保证同一天的模拟数据不变
		getSeedByDate(dateStr) {
			let seed = 0;
			for (const char of dateStr) {
				seed = (seed * 31 + char.charCodeAt(0)) % 99991;
			}
			return seed;
		},
		// 生成本地模拟的当日预约占坑记录，格式与后端返回保持一致（结束时间含1小时缓冲）
		mockAllReservationLogList(dateStr) {
			const seed = this.getSeedByDate(dateStr);
			const list = [];
			// 第一步：按种子逐小时生成是否约满的标记，再合并连续时段为一条记录
			let beginHour = -1;
			for (let hour = 10; hour <= 22; hour++) {
				const isFull = hour < 22 && ((seed + hour * 13) % 7) < 2;
				if (isFull && beginHour === -1) {
					beginHour = hour;
				}
				if (!isFull && beginHour !== -1) {
					list.push({
						reservationStartTime: `${dateStr} ${beginHour}:00:00`,
						reservationEndTime: `${dateStr} ${hour}:00:00`,
						reservationStatus: '0'
					});
					beginHour = -1;
				}
			}
			// 第二步：部分日期模拟一个已被他人预约的包夜记录
			if (seed % 3 === 0) {
				const nextDate = moment(dateStr).add(1, 'days').format('YYYY-MM-DD');
				list.push({
					reservationStartTime: `${dateStr} 23:00:00`,
					reservationEndTime: `${nextDate} 10:00:00`,
					reservationStatus: '0'
				});
			}
			return list;
		},
		// 按业务版相同的转换规则，将预约记录转换为禁用时间段
		buildTimeSlotFromLogList(rows) {
			return (rows || [])
				// 第一步：过滤出 reservationStatus 等于 '0' 的数据
				.filter(item => item.reservationStatus === '0')
				// 第二步：对过滤后的数据处理时间，生成禁用时间段
				.map(item => {
					const startTime = moment(item.reservationStartTime).format('YYYY-MM-DD HH:mm:ss');
					let endTime = moment(item.reservationEndTime);
					const currentTime = moment();
					// 如果结束时间晚于当前时间前1小时，则调整为当前时间前1小时
					if (endTime.isAfter(currentTime.subtract(1, 'hours'))) {
						endTime = endTime.subtract(1, 'hours');
					}
					return [startTime, endTime.format('YYYY-MM-DD HH:mm:ss')];
				});
		},
		// 查询模拟数据：全量占坑记录 + 我已约记录
		queryMockLogList(dateInfo) {
			const dateStr = dateInfo?.selectedDate || '';
			if (!dateStr) {
				return;
			}
			this.appointConfig.disableTimeSlot = this.buildTimeSlotFromLogList(this.mockAllReservationLogList(dateStr));
			this.appointConfig.myAppointTimeSlot = this.buildTimeSlotFromLogList(this.myMockLogMap[dateStr] || []);
		},
		// 重置本地演示数据
		handleResetMockData() {
			uni.showModal({
				title: "重置演示数据",
				content: "确定清空本地已提交的演示预约记录吗？",
				success: (res) => {
					if (res.confirm) {
						this.myMockLogMap = {};
						uni.removeStorageSync(MOCK_MY_LOG_STORAGE_KEY);
						this.queryMockLogList(this.nowDateInfo);
						this.clearFormParams();
						this.$refs.prettyTimes && this.$refs.prettyTimes.clearSelected();
						uni.showToast({
							title: "演示数据已重置！",
							icon: "none",
							duration: 1998,
						});
					}
				}
			});
		},
		// 清空表单选择
		clearFormParams() {
			this.formParams.reservationStartTime = null;
			this.formParams.reservationEndTime = null;
			this.isOvernightSelected = false;
		},
		// 包夜变化事件处理
		handleOvernightChange(overnightData) {
			if (overnightData) {
				this.isOvernightSelected = true;
				this.formParams.reservationStartTime = overnightData.start;
				this.formParams.reservationEndTime = moment(overnightData.end).subtract(1, 'h').format('YYYY-MM-DD HH:mm:ss');
			} else {
				this.isOvernightSelected = false;
				this.formParams.reservationStartTime = null;
				this.formParams.reservationEndTime = null;
			}
		},
		// 时间范围点击监听
		handleTimeChange(timeArr) {
			// 选择普通时间时，取消包夜标记
			this.isOvernightSelected = false;

			let startTime = timeArr?.beginTime || '';
			let endTime = timeArr?.endTime || '';

			this.formParams = {
				...this.formParams,
				reservationStartTime: startTime,
				reservationEndTime: endTime,
			}
		},
		// 日期切换监听
		handleDateChange(dateInfo) {
			this.nowDateInfo = dateInfo;
			this.queryMockLogList(dateInfo);
		},
		// 提交预约 - 添加防抖处理
		handleSubmitReservation() {
			// 调用防抖函数
			this.debouncedSubmitReservation();
		},

		// 实际的提交预约逻辑（原handleSubmitReservation方法内容）
		_realHandleSubmitReservation() {
			// 如果已经通过包夜提交事件处理，则不再重复处理
			if (this.isOvernightSelected && this.formParams.reservationStartTime && this.formParams.reservationEndTime) {
				this.submitReservation();
				return;
			}

			// 检查时间是否为空
			if (!this.formParams.reservationStartTime || !this.formParams.reservationEndTime) {
				uni.showToast({
					title: "请选择完整的预约时间段！",
					icon: "none",
					duration: 1998,
				});
				return; // 阻止提交
			}

			// 处理时间逻辑
			const start = moment(this.formParams.reservationStartTime);
			const end = moment(this.formParams.reservationEndTime);

			// 如果开始时间晚于结束时间，则自动对调
			if (start.isAfter(end)) {
				// 交换时间值
				[this.formParams.reservationStartTime, this.formParams.reservationEndTime] =
					[this.formParams.reservationEndTime, this.formParams.reservationStartTime];
			}

			this.submitReservation();
		},
		// 统一的提交方法：模拟请求耗时后写入本地缓存并刷新时段状态
		submitReservation() {
			// 提交预约时显示加载状态
			this.loading = true;
			// 模拟请求耗时
			setTimeout(() => {
				const dateStr = this.formParams.reservationStartTime.split(' ')[0];
				// 与业务版保持一致：普通预约的结束时间含1小时缓冲，包夜统一按23:00~次日10:00存储
				let recordEndTime;
				if (this.isOvernightSelected) {
					recordEndTime = moment(this.formParams.reservationStartTime).add(11, 'h');
				} else {
					recordEndTime = moment(this.formParams.reservationEndTime).add(1, 'h');
				}
				const record = {
					reservationStartTime: this.formParams.reservationStartTime,
					reservationEndTime: recordEndTime.format('YYYY-MM-DD HH:mm:ss'),
					reservationStatus: '0'
				};
				const myLogList = this.myMockLogMap[dateStr] || [];
				myLogList.push(record);
				this.myMockLogMap[dateStr] = myLogList;
				uni.setStorageSync(MOCK_MY_LOG_STORAGE_KEY, this.myMockLogMap);

				// 重新渲染当前日期的时段状态
				this.queryMockLogList(this.nowDateInfo);
				this.clearFormParams();
				this.loading = false;
				// 通过ref获取组件实例，调用清除方法
				this.$refs.prettyTimes.clearSelected();
				uni.showToast({
					title: "提交预约订单成功！",
					icon: "none",
					duration: 1998,
				});
			}, 888);
		}
	},
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
	padding-bottom: 220rpx;
	box-sizing: border-box;
}

.fx67ll-reservation-box {
	/* 确保容器占满页面，按钮自然下沉到文档流底部 */
	width: 100%;
	display: flex;
	flex-direction: column;
}

/* 演示说明与操作区 */
.demo-tip-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20rpx 30rpx 0;
	padding: 20rpx 24rpx;
	border-radius: 12rpx;
	background-color: rgba(46, 204, 113, 0.08);
	border: 1rpx solid rgba(46, 204, 113, 0.25);

	.demo-tip-text {
		flex: 1;
		font-size: 24rpx;
		line-height: 1.6;
		color: #1e8449;
	}

	.demo-tip-btn {
		flex-shrink: 0;
		margin-left: 20rpx;
		padding: 8rpx 24rpx;
		border-radius: 24rpx;
		background-color: #2ecc71;
		color: #ffffff;
		font-size: 24rpx;
		transition: all 0.25s ease;

		&:active {
			background-color: #1e8449;
			transform: scale(0.95);
		}
	}
}

/* 提交按钮容器（放入文档流，通过margin-top自动填充剩余空间） */
.submit-btn-container {
	width: 100%;
	padding: 20rpx 30rpx;
	padding-bottom: 220rpx;
	box-sizing: border-box;
}

/* 提交按钮样式 */
.submit-btn {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #2ecc71;
	color: #ffffff;
	font-size: 32rpx;
	border-radius: 40rpx; // 圆角样式

	&:active {
		background-color: #1e8449;
	}
}

/* 全局遮罩层样式 */
.loading-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}

.loading-content {
	background-color: #ffffff;
	padding: 40rpx 60rpx;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.loading-text {
	font-size: 32rpx;
	color: #333333;
}
</style>
