"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
}
const mode = "round";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-top-banner",
  setup(__props) {
    const info = [{
      content: "https://picsum.photos/500?id=0"
    }, {
      content: "https://picsum.photos/500?id=1"
    }, {
      content: "https://picsum.photos/500?id=2"
    }];
    const current = common_vendor.ref(0);
    const swiperDotIndex = common_vendor.ref(0);
    const dotsStyles = {
      bottom: "16px"
    };
    const change = (event) => {
      current.value = Number(event.detail.current);
    };
    const clickItem = (e) => {
      swiperDotIndex.value = e;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(info, (item, index, i0) => {
          return {
            a: item.content,
            b: index
          };
        }),
        b: common_vendor.o(change),
        c: swiperDotIndex.value,
        d: common_vendor.o(clickItem),
        e: common_vendor.p({
          ["dots-styles"]: dotsStyles,
          info,
          current: current.value,
          field: "content",
          mode
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5989f462"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-top-banner.js.map
