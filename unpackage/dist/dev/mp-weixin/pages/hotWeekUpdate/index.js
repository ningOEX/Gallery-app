"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  ImageCard();
}
const ImageCard = () => "../../components/home/image-card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const images = common_vendor.reactive([
      {
        src: "https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg",
        avatar: "../../static/banner/banner_1.jpg",
        username: "花无**歇",
        views: 686
      },
      {
        src: "../../static/banner/banner_2.jpg",
        avatar: "../../static/banner/banner_2.jpg",
        username: "闻哥**",
        views: 232
      },
      {
        src: "../../static/banner/banner_3.jpg",
        avatar: "../../static/banner/banner_3.jpg",
        username: "范**冰",
        views: 281
      },
      {
        src: "https://pic.616pic.com/photoone/00/01/28/618ced352f5335310.jpg",
        avatar: "../../static/banner/banner_1.jpg",
        username: "V**",
        views: 109
      }
      // 更多图片...
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(2, (col, i, i0) => {
          return {
            a: common_vendor.f(images.filter((_, idx) => idx % 2 === i), (item, j, i1) => {
              return {
                a: j,
                b: "5860da28-0-" + i0 + "-" + i1,
                c: common_vendor.p({
                  image: item
                })
              };
            }),
            b: i
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5860da28"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/hotWeekUpdate/index.js.map
