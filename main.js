import App from './App'
import messages from './locale/index'

let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

// #ifndef VUE3
import Vue from 'vue'

import fx67llVueUI from 'fx67ll-vue-ui';
Vue.use(fx67llVueUI)

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createI18n
} from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	return {
		app
	}
}
// #endif


Vue.prototype.showTestToast = function(type) {
	uni.showToast({
		title: `${type === 1?'页面':'功能'}开发中，敬请期待！`,
		icon: 'none',
		duration: type === 1 ? 5000 : 1998
	});
}
