"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (mySearchNavBar + myTopBanner + myNavMenu + myGoodCard + myTabNav + myTabContentView)();
}
const mySearchNavBar = () => "../../components/home/my-search-nav-bar.js";
const myTopBanner = () => "../../components/home/my-top-banner.js";
const myNavMenu = () => "../../components/home/my-nav-menu.js";
const myGoodCard = () => "../../components/home/my-good-card.js";
const myTabNav = () => "../../components/home/my-tab-nav.js";
const myTabContentView = () => "../../components/home/my-tab-content-view.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const searchHandle = (value) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:21", value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(searchHandle)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
