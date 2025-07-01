/**
 * 正则手机号
 * @param {string} phoneNumber
 * @return
 */
export const validatePhoneNumber = (phoneNumber : string) => {
	const phoneRegex = /^1[3-9]\d{9}$/
	return phoneRegex.test(phoneNumber)
}

/**
 * 正则密码长度
 * @param {string} password
 * @return
 */
export const validatePassword = (password : string) => {
	const passwordRegex = /^.{6,18}$/
	return passwordRegex.test(password)
}

/**
 * 手机号打码中间四位
 */
export const maskPhoneNumber = (phoneNumber : string) => {
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
export const maskName = (name : string) => {
	if (name.length <= 2) {
		return name // 如果名字长度小于等于2，不做处理
	}

	const firstChar = name.charAt(0)
	const lastChar = name.charAt(name.length - 1)
	const maskedPart = '*'.repeat(name.length - 2) // 中间部分打码

	return `${firstChar}${maskedPart}${lastChar}`
}

/**
 * 获取年月日时分秒
 */
export const getCurrentDateTime = () => {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const timestamp = now.getTime(); // 获取当前时间的时间戳（毫秒）

	return {
		year,
		month,
		day,
		hours,
		minutes,
		seconds,
		timestamp, // 返回时间戳
		formatted: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	};
}

/**
 * 判断是否时间戳大于7天
 * @param publishTime 时间戳
 * @param isConfine 是否作判断
 */
export const isPublishedMoreThanSevenDaysAgo = (publishTime : number,isConfine : boolean) => {
	if(isConfine){
		const now = Date.now(); // 当前时间（毫秒）
		const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7天的毫秒数
		
		// 判断当前时间是否大于发布时间7天
		return now > (publishTime + sevenDaysInMilliseconds);
	}
	return false
}

/**
 * 获取胶囊距离顶部距离
 */
export const getStatusBarHeight = () => {
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
  // console.log(menuButtonInfo);
  return `padding-top:${menuButtonInfo.top}px;`
}

export const parseDate = (dateString: string): Date => {
  // 尝试多种格式
  const formats = [
    dateString.replace(/-/g, '/'), // yyyy/MM/dd HH:mm:ss
    dateString.replace(' ', 'T') + 'Z', // ISO格式
    dateString.split(' ')[0].replace(/-/g, '/') // 仅日期部分
  ];
  
  for (const format of formats) {
    const date = new Date(format);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  // 如果都不行，手动解析
  const parts = dateString.split(/[- :]/);
  return new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2]),
    parts[3] ? parseInt(parts[3]) : 0,
    parts[4] ? parseInt(parts[4]) : 0,
    parts[5] ? parseInt(parts[5]) : 0
  );
}
