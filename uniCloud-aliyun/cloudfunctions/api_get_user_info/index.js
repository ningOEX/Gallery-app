'use strict'

// 云函数 getUserInfo.js
const db = uniCloud.database();
const jwt = require('jsonwebtoken');
const key = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	// const token = context.USER_INFO ? context.USER_INFO.token : null;
	const {token} = event

	if (!token) {
		return {
			code:401,
			message: '未授权'
		};
	}

	try {
		   // 验证 token
		const decoded = jwt.verify(token, key);
		const phone = decoded.phone;

		// 获取用户信息
		const userRecord = await db.collection('users').where({
			phone
		}).get();
		
		delete userRecord.data[0].password
		
		return {
			code: 200,
			user: userRecord.data[0]
		};
	} catch (error) {
		return {
			code: 400,
			message: '无效的 token'
		};
	}
};