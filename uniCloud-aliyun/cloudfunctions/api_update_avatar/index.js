'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		avatar,
		_id
	} = event

	if (!_id || !avatar) {
		return {
			code: 400,
			message: '缺少参数'
		};
	}

	try {
		const result = await db.collection("users").doc(_id).update({
			avatar
		})

		if (result.updated > 0) {
			return {
				code: 200,
				message: '更新成功'
			};
		} else {
			return {
				code: 404,
				message: '未找到用户或未进行任何更改'
			};
		}

	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '头像更新失败',
			error: error.message
		};
	}
};