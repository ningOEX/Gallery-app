'use strict'

const db = uniCloud.database()

exports.main = async (event, context) => {
  try {
    const result = await db.collection('images_list').get()

    // 返回获取的图片列表
    return {
      code: 200,
      message: '获取成功',
      data: result.data, // 包含图片记录
    }
  } catch (error) {
    console.error('查询失败:', error)
    return {
      code: 500,
      message: '查询失败',
    }
  }
}
