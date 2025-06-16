"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        common_vendor.index.showToast({
          title: "请输入账号密码",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      const res = await common_vendor.nr.callFunction({
        name: "api_login",
        data: {
          username: username.value,
          password: password.value
        }
      });
      if (res.result.code === 200) {
        common_vendor.index.__f__("log", "at pages/login/index.vue:53", "登录成功:", res.result.user);
        common_vendor.index.showToast({
          title: res.result.message,
          icon: "none"
        });
        common_vendor.index.setStorageSync("user", res.result.user);
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.showToast({
          title: res.result.message,
          icon: "none"
        });
      }
      common_vendor.index.hideLoading();
    };
    const goToRegister = () => {
      common_vendor.index.redirectTo({
        url: "/pages/register/index"
        // 注册页面路径
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => username.value = $event),
        c: common_vendor.p({
          type: "number",
          ["placeholder-style"]: "font-size:30rpx;",
          maxlength: "11",
          ["input-border"]: false,
          placeholder: "请输入手机号",
          modelValue: username.value
        }),
        d: common_assets._imports_1,
        e: common_vendor.o(($event) => password.value = $event),
        f: common_vendor.p({
          type: "password",
          ["placeholder-style"]: "font-size:30rpx;",
          maxlength: "18",
          ["input-border"]: false,
          placeholder: "请输入密码",
          modelValue: password.value
        }),
        g: common_vendor.o(handleLogin),
        h: common_vendor.o(goToRegister)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
