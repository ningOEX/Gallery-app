"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/index.js";
  "./pages/register/index.js";
  "./pages/user/index.js";
  "./pages/upload/index.js";
  "./pages/hotWeekUpdate/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
    this.globalData.getTodayWeekDay();
    this.globalData.getUser();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:9", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:12", "App Hide");
  },
  globalData: {
    currentDay: -1,
    // 获取当前星期几
    getTodayWeekDay() {
      const date = /* @__PURE__ */ new Date();
      this.currentDay = date.getDay();
    },
    getUser() {
      const user = common_vendor.index.getStorageSync("user");
      if (!user) {
        common_vendor.index.reLaunch({
          url: "/pages/login/index"
        });
        return;
      }
      this.user = user;
    },
    update() {
      const updateManager = common_vendor.wx$1.getUpdateManager();
      common_vendor.index.__f__("log", "at App.vue:38", "[updateManager]: ", updateManager);
      updateManager.onCheckForUpdate(function(res) {
        common_vendor.index.__f__("log", "at App.vue:41", "是否有新版本：", res.hasUpdate);
      });
      updateManager.onUpdateReady(function() {
        updateManager.applyUpdate();
      });
      updateManager.onUpdateFailed(function() {
      });
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
