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
    const imagesForm = common_vendor.ref({
      title: "",
      description: "",
      date: "",
      images: ""
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: imagesForm.value.title,
        b: common_vendor.o(($event) => imagesForm.value.title = $event.detail.value),
        c: common_vendor.t(imagesForm.value.title.length),
        d: imagesForm.value.description,
        e: common_vendor.o(($event) => imagesForm.value.description = $event.detail.value),
        f: common_vendor.t(imagesForm.value.description.length),
        g: common_vendor.t(imagesForm.value.date || "请选择日期"),
        h: imagesForm.value.date,
        i: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.onDateChange && _ctx.onDateChange(...args)
        ),
        j: common_vendor.f(imagesForm.value.images, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => _ctx.removeImage(index), index),
            c: index
          };
        }),
        k: imagesForm.value.images.length < 9
      }, imagesForm.value.images.length < 9 ? {
        l: common_vendor.p({
          type: "plusempty",
          size: "30",
          color: "#999"
        }),
        m: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.chooseImage && _ctx.chooseImage(...args)
        )
      } : {}, {
        n: !_ctx.canSubmit ? 1 : "",
        o: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.handleSubmit && _ctx.handleSubmit(...args)
        ),
        p: !_ctx.canSubmit
      });
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/upload/index.js.map
