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
  __name: "my-search-nav-bar",
  emits: ["search"],
  setup(__props, { emit: __emit }) {
    const menuBtnTop = common_vendor.ref("");
    const emit = __emit;
    const getStatusBarHeight = () => {
      const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      menuBtnTop.value = `padding-top:${menuButtonInfo.top}px;`;
    };
    const confirmHandle = (value) => {
      emit("search", value == null ? void 0 : value.detail.value);
    };
    common_vendor.onShow(() => {
      getStatusBarHeight();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "18",
          color: "#999"
        }),
        b: common_vendor.o(confirmHandle),
        c: common_vendor.s(menuBtnTop.value)
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-search-nav-bar.js.map
