"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _component_uni_easyinput = common_vendor.resolveComponent("uni-easyinput");
  _component_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const once_passwrod = common_vendor.ref("");
    const blurUsername = () => {
      if (!utils_index.validatePhoneNumber(username.value)) {
        common_vendor.index.showToast({
          title: "请输入正确手机号",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const blurPassword = () => {
      if (!utils_index.validatePassword(password.value)) {
        common_vendor.index.showToast({
          title: "输入密码长度过短！",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const registerUser = async () => {
      if (!username.value || !password.value) {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return;
      }
      if (password.value !== once_passwrod.value) {
        common_vendor.index.showToast({
          title: "密码不一致，重新输入！",
          icon: "none"
        });
        return;
      }
      if (utils_index.validatePhoneNumber(username.value) && utils_index.validatePassword(password.value)) {
        common_vendor.index.showLoading({
          title: "注册中..."
        });
        const res = await common_vendor.nr.callFunction({
          name: "api_register",
          data: {
            username: username.value,
            password: password.value
          }
        });
        common_vendor.index.__f__("log", "at pages/register/index.vue:92", res);
        if (res.result.code === 200) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "成功注册，正在为您登录...",
            icon: "none"
          });
          const user = {
            username: username.value,
            id: res.result.userId
          };
          common_vendor.index.setStorageSync("user", user);
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        } else {
          common_vendor.index.showToast({
            title: res.result.message,
            icon: "none"
          });
        }
      }
    };
    const goToLogin = () => {
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(blurUsername),
        c: common_vendor.o(($event) => username.value = $event),
        d: common_vendor.p({
          type: "number",
          ["placeholder-style"]: "font-size:30rpx;",
          maxlength: "11",
          ["input-border"]: false,
          placeholder: "请输入手机号",
          modelValue: username.value
        }),
        e: common_assets._imports_1,
        f: common_vendor.o(blurPassword),
        g: common_vendor.o(($event) => password.value = $event),
        h: common_vendor.p({
          type: "password",
          ["placeholder-style"]: "font-size:30rpx;",
          maxlength: "18",
          ["input-border"]: false,
          placeholder: "请输入密码",
          modelValue: password.value
        }),
        i: common_assets._imports_2,
        j: common_vendor.o(($event) => once_passwrod.value = $event),
        k: common_vendor.p({
          type: "password",
          ["placeholder-style"]: "font-size:30rpx;",
          maxlength: "18",
          ["input-border"]: false,
          placeholder: "再次输入密码",
          modelValue: once_passwrod.value
        }),
        l: common_vendor.o(registerUser),
        m: common_vendor.o(goToLogin)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46a64346"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/index.js.map
