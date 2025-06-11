/**
 * 正则手机号
 * @param {string} phoneNumber 
 * @return 
 */ 
export const validatePhoneNumber = (phoneNumber : string)=> {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}

/**
 * 正则密码长度
 * @param {string} password 
 * @return 
 */ 
export const validatePassword = (password : string)=> {
    const passwordRegex = /^.{6,18}$/;
    return passwordRegex.test(password);
}