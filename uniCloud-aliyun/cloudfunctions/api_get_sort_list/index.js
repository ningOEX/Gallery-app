'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {type,page,pageSize} = event
	
	const skip = (page - 1) * pageSize;
	
	try {
		// 获取分类
		const sortResult = await db.collection("images_list").where({type}).skip(skip).limit(pageSize).get()
		// 获取长度
		const countResult = await db.collection("images_list").where({type}).count()
		return{
			code:200,
			message:"获取成功",
			data:sortResult.data,
			total:countResult.total
		}
		
	} catch (error) {
		return {
		  code: 500,
		  message: '获取失败',
		}
	}
};
