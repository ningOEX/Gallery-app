'use strict';

const db = uniCloud.database()

// 获取我的作品
exports.main = async (event, context) => {
	const {
		uid,
		page = 1,
		pageSize = 10
	} = event

	if (!uid) {
		return {
			code: 400,
			message: '缺少参数'
		};
	}

	const skip = (page - 1) * pageSize;

	try {

		const result = await db.collection("images_list").where({
			uid
		}).skip(skip).limit(pageSize).orderBy("views","desc").get()

		return {
			code: 200,
			message: "获取成功",
			data: result.data
		}
	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '获取失败',
		};
	}

};