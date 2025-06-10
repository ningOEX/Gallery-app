"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  myItemCard();
}
const myItemCard = () => "./my-item-card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-good-card",
  setup(__props) {
    const app = getApp();
    const currentDay = common_vendor.ref(-1);
    const dayImgList = [
      "/static/home/icon_monday.png",
      "/static/home/icon_tuesday.png",
      "/static/home/icon_ednesday.png",
      "/static/home/icon_thursday.png",
      "/static/home/icon_friday.png",
      "/static/home/icon_saturday.png",
      "/static/home/icon_sunday.png"
    ];
    common_vendor.onShow(() => {
      currentDay.value = app.globalData.currentDay;
    });
    return (_ctx, _cache) => {
      return {
        a: dayImgList[currentDay.value - 1]
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-160fa497"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-good-card.js.map
