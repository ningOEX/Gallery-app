"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-tab-nav",
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const scrollLeft = common_vendor.ref(0);
    const current = common_vendor.ref(0);
    const isMove = common_vendor.ref(false);
    const scrollLeftView = common_vendor.ref(0);
    const scrolltoupper = () => {
      scrollLeft.value = 0;
      isMove.value = false;
      scrollLeftView.value = 0;
    };
    const changeTab = (index) => {
      if (index !== 0 && index % 6 === 0 || index % 7 === 0) {
        isMove.value = true;
      }
      if (isMove.value) {
        if (index >= current.value) {
          scrollLeft.value = scrollLeft.value + 50;
        }
        if (index < current.value) {
          scrollLeft.value = scrollLeft.value - 50;
        }
      }
      current.value = index;
      emit("change", `标签${index}`);
    };
    const onScroll = (e) => {
      scrollLeftView.value = e.detail.scrollLeft;
    };
    const more = () => {
      common_vendor.index.__f__("log", "at components/home/my-tab-nav.vue:55", "more");
      isMove.value = true;
      scrollLeft.value = scrollLeftView.value + 100;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(15, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(current.value === index ? "active" : ""),
            c: index,
            d: common_vendor.o(($event) => changeTab(index), index)
          };
        }),
        b: common_vendor.o(onScroll),
        c: common_vendor.o(scrolltoupper),
        d: scrollLeft.value,
        e: common_vendor.o(more)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe435c2b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-tab-nav.js.map
