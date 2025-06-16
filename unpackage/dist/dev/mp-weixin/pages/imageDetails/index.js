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
  __name: "index",
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const imageData = {
      src: "https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg",
      avatar: "../../static/banner/banner_1.jpg",
      username: "靓**仔",
      style: "科技",
      size: "750x1024",
      desc: "可爱的小猫头鹰，动感的姿势，阳光洒入的森林背景，超细节，复杂的细节，立体照明，写实，逆光，摄影，数字艺术，8k"
    };
    const actions = [
      { icon: "eye", text: "726" },
      { icon: "heart", text: "收藏" },
      { icon: "download", text: "下载" },
      { icon: "redo", text: "分享" }
    ];
    return (_ctx, _cache) => {
      return {
        a: imageData.src,
        b: common_vendor.p({
          type: "back",
          size: "24",
          color: "#fff"
        }),
        c: common_vendor.o(goBack),
        d: imageData.avatar,
        e: common_vendor.t(imageData.username),
        f: common_vendor.t(imageData.style),
        g: common_vendor.t(imageData.size),
        h: common_vendor.t(imageData.desc),
        i: common_vendor.f(actions, (item, i, i0) => {
          return {
            a: "20ae70b3-1-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "22",
              color: "#fff"
            }),
            c: common_vendor.t(item.text),
            d: i
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20ae70b3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/imageDetails/index.js.map
