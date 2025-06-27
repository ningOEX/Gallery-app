'use strict';

const db = uniCloud.database()

const jwt = require('jsonwebtoken');
const key = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	const {token,introduction} = event
	
	if (!token) {
		return {
			code: 401,
			message: '未授权'
		};
	}
	
	try {
		// 验证token
		const decoded = jwt.verify(token, key);
		const phone = decoded.phone; // token 中包含手机号
		
		// 查询用户信息
		const userRecord = await db.collection("users").where({
			phone
		}).get()
		
		if (userRecord.data.length === 0) {
			return {
				code: 404,
				message: '用户不存在'
			};
		}
		
		const user = userRecord.data[0];
		
		// 若nickname有值，修改昵称
		
		if(introduction.trim() && introduction.length > 0){
			await db.collection('users').doc(user._id).update({
				introduction:introduction.trim(),
			});
			
			return {
				code:200,
				message:"修改成功"
			}
		}
		
	} catch (error) {
		//TODO handle the exception
		return {
			code: 500,
			message: '获取失败',
		}
	}



};