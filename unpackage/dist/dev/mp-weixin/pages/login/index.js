"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = () => {
    };
    const goToRegister = () => {
      common_vendor.index.redirectTo({
        url: "/pages/register/index"
        // 注册页面路径
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact",
          size: "30"
        }),
        b: username.value,
        c: common_vendor.o(($event) => username.value = $event.detail.value),
        d: common_vendor.p({
          type: "contact",
          size: "30"
        }),
        e: password.value,
        f: common_vendor.o(($event) => password.value = $event.detail.value),
        g: common_vendor.o(handleLogin),
        h: common_vendor.o(goToRegister)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
