/**
 * 浏览器环境判断与自适应窗口打开工具
 * 提供 H5 端「移动端/桌面端」环境判断、按可视高度挑选窗口尺寸，
 * 以及在新页签/居中悬浮小窗口中自适应打开指定页面（或外部链接）的能力。
 *
 * 参考 FODCA 项目 utils/browser.js，适配 PFUWZ 的 history 模式路由（无 #）。
 */

/**
 * 判断当前 H5 环境是否为「真实」手机移动端浏览器
 * 注意：Chrome F12 设备模拟模式会改写 navigator.userAgent 为机型 UA，
 * 但一般不改写 navigator.platform（桌面机仍为 Win32/MacIntel）。
 * 因此仅凭 UA 关键字会把 F12 移动模拟误判成真机——
 * 这里额外校验 platform：UA 含移动关键字但 platform 仍是桌面 OS 时，
 * 判定为 F12 模拟（按桌面处理，走居中悬浮小窗口）。
 * @returns {Boolean}
 */
export function isMobileBrowser() {
	// #ifdef H5
	const ua = navigator.userAgent || "";
	const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
	if (!hasMobileUA) {
		// UA 本身无移动关键字：常规桌面浏览器（含未切移动模式的 F12）
		return false;
	}
	// UA 命中移动关键字，进一步用 platform 排除 F12 设备模拟
	const platform =
		navigator.platform ||
		(navigator.userAgentData && navigator.userAgentData.platform) ||
		"";
	// 桌面 OS 的 platform 标识：命中其一即认为是桌面机在模拟移动端
	const isDesktopPlatform = /Win32|Win64|MacIntel|Macintosh|MacPowerPC|Linux x86_64|Linux i686|Linux x86/i.test(
		platform
	);
	// 桌面 platform + 移动 UA → F12 移动模拟，按桌面处理
	return !isDesktopPlatform;
	// #endif
	// #ifndef H5
	return true;
	// #endif
}

/**
 * 根据当前浏览器可视高度，从预设的 iPhone 机型宽高中挑选最合适的一组
 * 选择规则（默认取最小宽高）：
 *   1. 当前可视高度 <= 最小高度        → 取最小宽高
 *   2. 当前可视高度 >  最大高度        → 取最大宽高
 *   3. 其它（介于最小与最大之间）       → 取「heightPx <= 当前可视高度」中最接近的一项
 * @returns {{ width: number, height: number }} 选中的宽高，单位 px
 */
export function pickSize() {
	// 预设的 iPhone 机型宽高（逻辑像素），按需替换为实际值
	const iphoneList = [
		{ model: "iPhone 4", widthPx: 320, heightPx: 480 },
		{ model: "iPhone 5/SE(GEN1)", widthPx: 320, heightPx: 568 },
		{ model: "iPhone 6/7/8/SE(GEN2/3)", widthPx: 375, heightPx: 667 },
		{ model: "iPhone 6/7/8 Plus", widthPx: 540, heightPx: 960 },
		{ model: "iPhone X/XS/11 Pro", widthPx: 562.5, heightPx: 1218 },
		{ model: "iPhone XR/11", widthPx: 414, heightPx: 896 },
		{ model: "iPhone XS/11 Pro Max", widthPx: 621, heightPx: 1344 },
		{ model: "iPhone 12/13 mini", widthPx: 540, heightPx: 1170 },
		{ model: "iPhone 12/13/14", widthPx: 585, heightPx: 1266 },
		{ model: "iPhone 12/13 Pro Max + 14 Plus", widthPx: 642, heightPx: 1389 },
		{ model: "iPhone 14/15/16", widthPx: 589.5, heightPx: 1278 },
		{ model: "iPhone 14/15 Pro Max + Plus", widthPx: 645, heightPx: 1398 },
		{ model: "iPhone 16 Pro", widthPx: 603, heightPx: 1311 },
		{ model: "iPhone 16 Pro Max", widthPx: 660, heightPx: 1434 }
	];
	// 按 heightPx 升序排列，便于按高度分档选择（不修改原数组）
	const sorted = [...iphoneList].sort((a, b) => a.heightPx - b.heightPx);
	const currentHeight = window.innerHeight; // 当前浏览器可视区域高度
	const minHeight = sorted[0].heightPx;
	const maxHeight = sorted[sorted.length - 1].heightPx;
	// 默认取最小宽高（对应规则 1）
	let target = sorted[0];
	if (currentHeight > maxHeight) {
		// 规则 3：超过最大高度 → 取最大宽高
		target = sorted[sorted.length - 1];
	} else if (currentHeight > minHeight) {
		// 规则 2：高于最小高度 → 取「heightPx <= 当前可视高度」中最接近的一项
		// 在所有满足 heightPx <= currentHeight 的机型里，挑 heightPx 最大的那个
		target = sorted.reduce((acc, cur) => {
			return cur.heightPx <= currentHeight && cur.heightPx > acc.heightPx ? cur : acc;
		}, sorted[0]);
	}
	return { width: target.widthPx, height: target.heightPx };
}

/**
 * 将页面路径拼成 H5 端可访问的完整 URL
 * 自动识别当前路由模式：hash 模式拼 `#${pagePath}`，history 模式直接拼 `pagePath`。
 * 这样抽离后，调用方无需关心路由模式差异。
 * @param {String} pagePath 要打开的页面路径，如 "/pages/index"
 * @returns {String} 完整 H5 URL
 */
function buildH5PageUrl(pagePath) {
	const { origin, pathname, hash } = window.location;
	// hash 模式：当前地址已带 #，则继续走 hash 路由
	if (hash && hash.indexOf("#") === 0) {
		return `${origin}${pathname}#${pagePath}`;
	}
	// history 模式：直接拼接路径
	return `${origin}${pathname === "/" ? "" : pathname}${pagePath}`;
}

/**
 * H5 端按环境打开指定 URL 的统一实现（内部复用，不区分内页/外链）
 * 移动端浏览器全屏新页签打开；
 * PC 桌面浏览器按可视高度挑选 iPhone 宽高，相对显示屏居中悬浮小窗口打开（沉浸式展示）；
 * 被拦截时降级为当前页打开。
 * @param {String} url 完整的 H5 URL
 */
function openUrlAdaptive(url) {
	try {
		let newTab;
		if (isMobileBrowser()) {
			// 移动端浏览器：全屏新页签打开
			newTab = window.open(url, "_blank");
		} else {
			// PC 桌面浏览器：按可视高度挑选 iPhone 宽高，相对显示屏居中悬浮小窗口打开
			const { width, height } = pickSize();
			let left = (window.screen.width - width) / 2;
			let top = (window.screen.height - height) / 2;
			// 钳制非负，避免越界被浏览器强制移到屏幕左上角
			left = Math.max(0, Math.round(left));
			top = Math.max(0, Math.round(top));
			const features = [
				`width=${width}`,
				`height=${height}`,
				`left=${left}`,
				`top=${top}`,
				"resizable=yes", // 允许用户调整窗口大小
				"scrollbars=yes", // 显示滚动条
			].join(",");
			newTab = window.open(url, "_blank", features);
		}
		if (!newTab) {
			// 拦截时降级：当前页打开
			window.location.href = url;
		}
	} catch (e) {
		uni.showToast({ title: "浏览器禁止打开新标签", icon: "none" });
	}
}

/**
 * 自适应打开指定页面
 * H5 端：移动端浏览器全屏新页签打开；
 *        PC 桌面浏览器按可视高度挑选 iPhone 宽高，相对显示屏居中悬浮小窗口打开（沉浸式展示）；
 * APP/小程序端：走标准页面栈跳转（默认 uni.navigateTo）
 * @param {String} pagePath 要打开的页面路径，如 "/pages/index"
 * @param {Function} [navigateToFn] APP/小程序端跳转函数，默认走 uni.navigateTo
 */
export function openAdaptiveWindow(pagePath, navigateToFn) {
	// #ifdef H5
	const url = buildH5PageUrl(pagePath);
	openUrlAdaptive(url);
	// #endif
	// #ifndef H5
	if (navigateToFn) {
		navigateToFn(pagePath);
	} else {
		uni.navigateTo({ url: pagePath });
	}
	// #endif
}

/**
 * 自适应打开外部链接（完整 http/https URL）
 * H5 端：与 openAdaptiveWindow 一致，按环境新页签/居中小窗口打开；
 * APP-PLUS 端：唤起系统浏览器；
 * 小程序端：暂不支持直接打开外链，提示用户复制链接。
 * @param {String} url 完整的 http/https 链接
 */
export function openExternalUrl(url) {
	// 校验链接合法性
	if (!/^https?:\/\/.+/.test(url)) {
		uni.showToast({ title: "链接格式错误", icon: "none" });
		return;
	}

	// #ifdef H5
	openUrlAdaptive(url);
	// #endif

	// #ifdef APP-PLUS
	// App端：唤起系统浏览器（自动开新窗口/新标签）
	plus.runtime.openURL(url, () => {
		uni.showToast({ title: "无法打开浏览器", icon: "none" });
	});
	// #endif

	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU
	// 小程序端：无新页签且受域名白名单限制，仅提示复制
	uni.setClipboardData({
		data: url,
		success: () => {
			uni.showToast({ title: "链接已复制", icon: "none" });
		}
	});
	// #endif
}
