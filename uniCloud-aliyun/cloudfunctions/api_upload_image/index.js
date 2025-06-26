'use strict'

const db = uniCloud.database()

const jwt = require('jsonwebtoken');
const SECRET_KEY = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	console.log('[event]', event);
	const {
		token,
		title,
		description,
		images,
		views = 0,
		type,
		typeName,
		dowlodURL,
		createdAt,
		timestamp
	} = event // 从请求中获取数据

	if (!token) {
		return {
			code: 401,
			message: '未授权'
		};
	}

	// 检查必填字段
	if (!title || !description || !images || !type) {
		return {
			code: 400,
			message: '请填写完整~',
		}
	}

	try {
		// 验证token
		const decoded = jwt.verify(token, SECRET_KEY)
		const phone = decoded.phone;

		// 获取用户信息
		const userRecord = await db.collection('users').where({
			phone
		}).get();

		const articleData = {
			title,
			description,
			images,
			nickname: userRecord.data[0].nickname,
			views,
			uid: userRecord.data[0]._id,
			type,
			typeName,
			dowlodURL,
			createdAt,
			timestamp,
		}

		await db.collection('images_list').add(articleData)
		
		return {
			code: 200,
			message: '发布成功',
			uid:userRecord.data[0]._id
		}

	} catch (error) {
		//TODO handle the exception
		return {
			code: 401,
			message: error.message,
		}
	}
	
}