"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-item-card",
  setup(__props) {
    const cardList = [{
      name: "我是标题",
      path: "#"
    }, {
      name: "我是标题",
      path: "#"
    }, {
      name: "我是标题",
      path: "#"
    }, {
      name: "我是标题",
      path: "#"
    }, {
      name: "我是标题",
      path: "#"
    }, {
      name: "我是标题",
      path: "#"
    }];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cardList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-06a15efa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-item-card.js.map
