'use strict'
const db = uniCloud.database()
const userCollection = db.collection('users') // 假设您有一个用户集合

exports.main = async (event, context) => {
  const { password, phone } = event

  //  // 加密密码
  // const hashedPassword = await bcrypt.hash(password, 10);

  // 检查用户名是否已存在
  const existingUser = await userCollection.where({ phone }).get()
  if (existingUser.data.length > 0) {
    return {
      code: 400,
      message: '手机号已存在',
    }
  }

  // 插入新用户
  const res = await userCollection.add({
    phone,
    password,
    nickname: phone,
    createdAt: new Date(),
  })

  return {
    code: 200,
    message: '注册成功',
    uid: res.id,
  }
}
