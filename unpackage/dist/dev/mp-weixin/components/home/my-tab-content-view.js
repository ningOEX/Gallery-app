"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-tab-content-view",
  setup(__props) {
    common_vendor.ref(0);
    const imgList = common_vendor.ref([1, 2, 3, 4, 5, 6, 7, 8]);
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44c5939f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-tab-content-view.js.map
