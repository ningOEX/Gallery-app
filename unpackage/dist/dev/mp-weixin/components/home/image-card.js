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
  __name: "image-card",
  props: {
    image: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: _ctx.image.src,
        b: _ctx.image.avatar,
        c: common_vendor.t(_ctx.image.username),
        d: common_vendor.p({
          type: "fire",
          size: "18",
          color: "#999"
        }),
        e: common_vendor.t(_ctx.image.views)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-096acdff"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/image-card.js.map
