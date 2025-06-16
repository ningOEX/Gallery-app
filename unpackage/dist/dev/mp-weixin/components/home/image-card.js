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
    const props = __props;
    const toImageDetails = () => {
      common_vendor.index.navigateTo({ url: `/pages/imageDetails/index?id=${props.image.id}` });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toImageDetails),
        b: _ctx.image.src,
        c: _ctx.image.avatar,
        d: common_vendor.t(_ctx.image.username),
        e: common_vendor.p({
          type: "fire",
          size: "18",
          color: "#999"
        }),
        f: common_vendor.t(_ctx.image.views)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-096acdff"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/image-card.js.map
