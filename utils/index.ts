/**
 * 正则手机号
 * @param {string} phoneNumber
 * @return
 */
export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phoneNumber)
}

/**
 * 正则密码长度
 * @param {string} password
 * @return
 */
export const validatePassword = (password: string) => {
  const passwordRegex = /^.{6,18}$/
  return passwordRegex.test(password)
}

/**
 * 手机号打码中间四位
 */
export const maskPhoneNumber = (phoneNumber: string) => {
  // 确保电话号码格式正确
  const regex = /^(\d{3})(\d{4})(\d{4})$/
  const match = phoneNumber.match(regex)

  if (match) {
    // 替换中间四位为星号
    return `${match[1]}****${match[3]}`
  } else {
    throw new Error('电话号码格式不正确')
  }
}

/**
 * 名称打码 长度大于3才做处理
 */
export const maskName = (name: string) => {
  if (name.length <= 2) {
    return name // 如果名字长度小于等于2，不做处理
  }

  const firstChar = name.charAt(0)
  const lastChar = name.charAt(name.length - 1)
  const maskedPart = '*'.repeat(name.length - 2) // 中间部分打码

  return `${firstChar}${maskedPart}${lastChar}`
}
