'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {token,_id} = event
	
	if (!token) {
		return {
			code: 401,
			message: '未授权'
		};
	}
	
	// 根据 id 查询数据表数据
	try {
		const details = await db.collection("images_list").where({_id}).get()
		
		return {
		  code: 200,
		  message: '获取成功',
		  data: details.data, // 包含图片记录
		}
	} catch (error) {
		//TODO handle the exception
		return {
		  code: 500,
		  message: '获取失败',
		}
	}
	
	//返回数据给客户端
	return event
};
