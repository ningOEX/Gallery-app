'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		uid,
		nickname
	} = event

	try {
		await db.collection('images_list').where({uid}).update({
			nickname,
		})
		return{
			code:200,
			message:"更新成功"
			
		}

	} catch (error) {
		//TODO handle the exception
		return {
			code: 401,
			message: error.message,
		}
	}
};