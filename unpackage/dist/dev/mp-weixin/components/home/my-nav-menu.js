"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-nav-menu",
  setup(__props) {
    const goToUpload = () => {
      common_vendor.index.navigateTo({
        url: "/pages/upload/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$2,
        c: common_assets._imports_2$1,
        d: common_assets._imports_3,
        e: common_assets._imports_4,
        f: common_vendor.o(goToUpload)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d80d83b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-nav-menu.js.map
