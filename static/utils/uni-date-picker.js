// 所有日期选择组件最早多少年前开始
const yearGap = 10;

// 弹框picker组件函数开始
export function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
};

export const currentDate = getDate({
	format: true
});

import moment from '@/node_modules/moment';
let nowYear = moment().format('YYYY');
let yearArray = [];

for (var i = 0 - yearGap; i < 1; i++) {
	yearArray.push(Number.parseInt(nowYear) + i)
}

export const dateArray = [yearArray, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']];
export const dateIndex = [yearGap, moment().month()];
// 弹框picker组件函数结束


// 弹框picker组件面板显示开始
const pickerViewDate = new Date();
const pickerViewYears = [];
const pickerViewYear = pickerViewDate.getFullYear();
const pickerViewMonths = [];
export const pickerViewMonth = pickerViewDate.getMonth() + 1;
for (let i = pickerViewDate.getFullYear() - yearGap; i <= pickerViewDate.getFullYear(); i++) {
	pickerViewYears.push(i);
}
for (let i = 1; i <= 12; i++) {
	pickerViewMonths.push(i);
}
export const dataYears = pickerViewYears;
export const dataMonths = pickerViewMonths;
// 弹框picker组件面板显示结束