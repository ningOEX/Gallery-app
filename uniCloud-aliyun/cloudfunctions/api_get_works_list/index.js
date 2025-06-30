'use strict';

const db = uniCloud.database()

// 获取我的作品
exports.main = async (event, context) => {
	const {uid} = event
	
	if (!uid) {
		return {
			code: 401,
			message: '缺少参数'
		};
	}
	
	try {
		
		const result = await db.collection("images_list").where({uid}).get()
		
		return{
			code:200,
			message: "获取成功",
			data:result.data
		}
	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '获取失败',
		};
	}
	
};
