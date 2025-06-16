'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	try{
		const result = await db.collection('type_list').get()
		//返回数据给客户端
		return {
		  code: 200,
		  message: '获取成功',
		  data: result.data, // 包含图片记录
		}
	}catch(error){
		return {
		  code: 500,
		  message: '获取失败',
		}
	}
};
