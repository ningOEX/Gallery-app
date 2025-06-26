'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {views,_id,token} = event
	
	if (!token) {
		return {
			code: 401,
			message: '未授权'
		};
	}
	
	try {
		await db.collection("images_list").doc(_id).update({
			views,
		})
		return {
			code : 200,
			message:"更新成功"
		}
	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '更新失败',
			error: error.message,
		}
	}
	
	//返回数据给客户端
	return event
};
