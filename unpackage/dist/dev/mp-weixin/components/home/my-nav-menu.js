"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-nav-menu",
  setup(__props) {
    const menuList = common_vendor.reactive([
      { menuTitle: "最新周更", menuIcon: "../../static/iconNavMenu/icon_menu_1.png" },
      { menuTitle: "精选壁纸", menuIcon: "../../static/iconNavMenu/icon_menu_2.png" },
      { menuTitle: "作品最佳", menuIcon: "../../static/iconNavMenu/icon_menu_3.png" },
      { menuTitle: "编辑发布", menuIcon: "../../static/iconNavMenu/icon_menu_4.png" },
      { menuTitle: "我要发布", menuIcon: "../../static/iconNavMenu/icon_menu_5.png" }
    ]);
    const clickMenuItem = (item) => {
      common_vendor.index.__f__("log", "at components/home/my-nav-menu.vue:35", "点击了菜单栏：", item);
      switch (item.menuTitle) {
        case "最新周更":
          common_vendor.index.navigateTo({ url: "/pages/hotWeekUpdate/index" });
          break;
        case "精选壁纸":
          common_vendor.index.showToast({
            title: "敬请期待",
            icon: "none"
          });
          break;
        case "作品最佳":
          common_vendor.index.showToast({
            title: "敬请期待",
            icon: "none"
          });
          break;
        case "编辑发布":
          common_vendor.index.showToast({
            title: "敬请期待",
            icon: "none"
          });
          break;
        case "我要发布":
          common_vendor.index.navigateTo({ url: "/pages/upload/index" });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(menuList, (item, index, i0) => {
          return {
            a: item.menuIcon,
            b: common_vendor.t(item.menuTitle),
            c: index,
            d: common_vendor.o(($event) => clickMenuItem(item), index)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d80d83b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home/my-nav-menu.js.map
