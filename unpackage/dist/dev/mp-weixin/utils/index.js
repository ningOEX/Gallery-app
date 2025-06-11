"use strict";
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phoneNumber);
};
const validatePassword = (password) => {
  const passwordRegex = /^.{6,18}$/;
  return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
exports.validatePhoneNumber = validatePhoneNumber;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/index.js.map
