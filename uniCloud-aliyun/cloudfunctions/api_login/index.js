'use strict'

const { log } = require('console')

const db = uniCloud.database()

exports.main = async (event, context) => {
  const { phone, password } = event

  // 查询用户
  const res = await db
    .collection('users')
    .where({
      phone,
    })
    .get()

  // 检查用户是否存在
  if (res.data.length === 0) {
    return {
      code: 404,
      message: '用户不存在',
    }
  }

  const user = res.data[0]

  // 检查密码
  if (user.password !== password) {
    return {
      code: 401,
      message: '密码错误',
    }
  }

  delete user.password

  // 登录成功，返回用户信息
  return {
    code: 200,
    message: '登录成功',
    userInfo: { ...user },
  }
}
