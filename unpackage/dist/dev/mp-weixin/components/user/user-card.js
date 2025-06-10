"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user-card",
  setup(__props) {
    const tabList = [{
      text: "作品",
      path: "",
      link: ""
    }, {
      text: "收藏",
      path: "",
      link: ""
    }, {
      text: "足迹",
      path: "",
      link: ""
    }, {
      text: "点赞",
      path: "",
      link: ""
    }];
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index
          };
        }),
        c: common_assets._imports_1$1,
        d: common_vendor.p({
          type: "right",
          size: "20"
        }),
        e: common_assets._imports_1$1,
        f: common_vendor.p({
          type: "right",
          size: "20"
        }),
        g: common_assets._imports_1$1,
        h: common_vendor.p({
          type: "right",
          size: "20"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f228f5b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/user/user-card.js.map
