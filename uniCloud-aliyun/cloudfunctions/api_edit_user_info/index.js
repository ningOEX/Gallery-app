'use strict'
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { uid, nickname, newPassword } = event

  const updateData = {}

  // 修改昵称
  if (nickname) {
    updateData.nickname = nickname
  }

  // 修改密码
  if (newPassword) {
    // 这里可以根据需要进行密码加密处理
    updateData.password = newPassword // 请确保密码安全性
  }

  try {
    // 更新用户信息
    const _id = uid
    const res = await db.collection('users').doc(_id).update(updateData)

    if (res.updated === 1) {
      return {
        code: 200,
        message: '更新成功',
      }
    } else {
      return {
        code: 400,
        message: '未找到用户或无更改',
      }
    }
  } catch (error) {
    return {
      code: 500,
      message: '更新失败',
      error: error.message,
    }
  }
}
