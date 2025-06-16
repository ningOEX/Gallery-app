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
  __name: "index",
  setup(__props) {
    const app = getApp();
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
    const user = common_vendor.ref({});
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at pages/user/index.vue:77", "user onShow!");
      app.globalData.getUser();
      user.value = app.globalData.user;
    });
    const exitHandle = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否退出登录？",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("user");
            common_vendor.index.reLaunch({
              url: "/pages/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.t(user.value.username),
        c: common_vendor.t(user.value.id),
        d: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index
          };
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
        }),
        i: common_assets._imports_1$1,
        j: common_vendor.p({
          type: "right",
          size: "20"
        }),
        k: common_vendor.o(exitHandle)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
