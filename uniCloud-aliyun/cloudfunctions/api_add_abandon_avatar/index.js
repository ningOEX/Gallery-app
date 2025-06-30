'use strict';

const db = uniCloud.database()

// 历史头像
exports.main = async (event, context) => {
	const {_id,avatar,timestamp} = event
	
	if (!_id || !avatar) {
		return {
			code: 401,
			message: '缺少参数'
		};
	}
	
	try {
		const result = await db.collection('abandon_avatar_list').add({
			uid:_id,
			avatar,
			timestamp,
			createdAt: new Date() // 添加时间戳
		})
		
		return{
			code: 200,
			message:"保存成功"
		}
		
	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '保存失败',
		};
	}
	
};
