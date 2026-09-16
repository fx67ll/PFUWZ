/**
 * 路由拦截工具
 * 参考 MCDPC 项目中 vue-router 的通配 404 兜底逻辑（path: '*' -> redirect: '/404'），
 * 在 uni-app 中通过 uni.addInterceptor 拦截 navigateTo / redirectTo / reLaunch / switchTab，
 * 当目标页面未在 pages.json 中注册时，统一重定向到 404 通用拦截页面。
 *
 * uni-app 没有 vue-router 的通配路由，原生 API 跳转不存在的页面会直接报错并停留原地，
 * 因此这里以 pages.json 的 pages 数组作为「已注册页面集合」做兜底拦截。
 *
 * 注意：pages.json 含注释（JSONC），不能直接作为 JS 模块 import，
 * 因此这里手动维护一份已注册页面清单，新增页面时请同步更新此处与 pages.json。
 */

// 404 兜底页面路径
const NOT_FOUND_PAGE = '/pages/404';

// 已注册页面路径清单（来源：pages.json，新增页面时需同步维护）
const registeredPages = new Set([
  '/pages/index',
  '/pages/JTCEE/index/scan_qr_for_index',
  '/pages/LTOFE/index/index',
  '/pages/LTOFE/scan/scan_qr',
  '/pages/mahjong/reservation/index',
  '/pages/JTCEE/login/login',
  '/pages/JTCEE/login/forget_password',
  '/pages/JTCEE/notice/notice_catagory',
  '/pages/JTCEE/notice/notice_index',
  '/pages/JTCEE/notice/notice_detail',
  '/pages/JTCEE/index/index',
  '/pages/JTCEE/index/express_bill',
  '/pages/JTCEE/index/help_service',
  '/pages/JTCEE/index/scan_qr',
  '/pages/JTCEE/user/user_index',
  '/pages/JTCEE/user/user_setting',
  '/pages/JTCEE/user/user_mail',
  '/pages/JTCEE/address/address_index',
  '/pages/JTCEE/address/address_add',
  '/pages/JTCEE/invoice/invoice_index',
  '/pages/JTCEE/invoice/invoice_detail',
  '/pages/JTCEE/invoice/invoice_qr',
  '/pages/JTCEE/express/express_send',
  '/pages/JTCEE/express/express_address',
  '/pages/JTCEE/goods/goods_index',
  '/pages/JTCEE/goods/goods_add',
  '/pages/JTCEE/goods/goods_catagory',
  '/pages/JTCEE/goods/goods_detail',
  '/pages/JTCEE/goods/goods_choose',
  '/pages/JTCEE/package/package_add',
  '/pages/JTCEE/package/package_index',
  '/pages/JTCEE/package/package_detail',
  '/pages/404',
]);

/**
 * 判断给定 url 是否为已注册页面
 * 跳转参数 url 形如 "/pages/index?key=value"，需要先剥离 query 与 hash 再比对
 * @param {String} url 跳转参数
 * @returns {Boolean}
 */
function isRegisteredPage(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  // 剥离 query 参数与 hash
  const cleanPath = url.split('?')[0].split('#')[0];
  const normalized = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  // 404 页面本身、以及外部完整链接（http/https）放行
  if (normalized === NOT_FOUND_PAGE || /^https?:\/\//.test(url)) {
    return true;
  }
  return registeredPages.has(normalized);
}

/**
 * 安装路由拦截器
 * 应在应用入口（main.js）尽早调用，确保所有页面跳转都被拦截
 */
export function setupRouteInterceptor() {
  const methods = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

  methods.forEach(method => {
    uni.addInterceptor(method, {
      invoke(args = {}) {
        const url = args.url;
        if (isRegisteredPage(url)) {
          return args;
        }
        // 目标页面未注册，重定向到 404 页面
        uni.showToast({
          title: '页面不存在',
          icon: 'none',
          duration: 1500,
        });
        return { url: NOT_FOUND_PAGE };
      },
    });
  });
}

/**
 * H5 history 模式下，用户直接在地址栏访问不存在的路径时，
 * 浏览器整页加载，addInterceptor 无法拦截。
 * 这里在应用启动时校验当前地址，未注册则重定向到 404 页面。
 * 应在 App.vue 的 onLaunch 中以 H5 条件编译调用。
 */
export function handleH5DirectAccess() {
  // #ifdef H5
  const { origin, pathname, hash } = window.location;
  // 根路径或已注册页面放行
  if (pathname === '/' || pathname === '' || isRegisteredPage(pathname)) {
    return;
  }
  // 静默替换为 404 页面地址，避免留下无效的历史记录
  // 注意：必须直接跳到根路径下的 404 地址，绝不能在当前错误路径后追加，
  // 否则每次 onLaunch 都会在路径末尾累加 /pages/404 形成无限循环
  let notFoundUrl;
  // hash 模式：路由信息在 # 之后，需拼成 origin/pathname#/pages/404
  if (hash && hash.indexOf('#') === 0) {
    notFoundUrl = `${origin}${pathname}#${NOT_FOUND_PAGE}`;
  } else {
    // history 模式：直接使用根路径下的 404 地址
    notFoundUrl = `${origin}${NOT_FOUND_PAGE}`;
  }
  window.location.replace(notFoundUrl);
  // #endif
}
