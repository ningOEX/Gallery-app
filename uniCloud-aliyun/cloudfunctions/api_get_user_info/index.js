'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {uid} = event
	try {
		const _id = uid
		const result = await db.collection('users').doc(_id).get()
		
		result.data.forEach(person => {
		  delete person.password;
		});
		
		//返回数据给客户端
		return {
			code:200,
			message: '获取成功',
			data: result.data
		}
	} catch (error) {
		//TODO handle the exception
		return {
		  code: 500,
		  message: '获取失败',
		}
	}
	
};
