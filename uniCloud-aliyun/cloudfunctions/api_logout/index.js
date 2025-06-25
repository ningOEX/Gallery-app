'use strict';

const db = uniCloud.database()
const jwt = require('jsonwebtoken');
const key = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	console.log(event);
	//event为客户端上传的参数
	const {token} = event
	
	if (!token) {
		return {
			code:401,
			message: '未授权'
		};
	}
	
	try{
		// 验证 token
		const decoded = jwt.verify(token, key);
		const phone = decoded.phone;
		// 获取用户信息
		const userRecord = await db.collection('users').where({
			phone
		}).get();
		
		const uid = userRecord.data[0]._id
		
		// 删除用户 images_list 数据
		await db.collection("images_list").where({uid}).remove() 
		
		// 删除用户记录
		await db.collection("users").doc(uid).remove()
		
		return {
			code:200,
			message:"注销成功"
		}
		
	} catch (error) {
		return {
			code: 401,
			message: error.message
		};
	}
};
