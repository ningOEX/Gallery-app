'use strict'
const db = uniCloud.database()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	const {
		token,
		nickname,
		oldPwd,
		newPassword
	} = event

	if (!token) {
		return {
			code: 401,
			message: '未授权'
		};
	}

	try {
		// 验证 token
		const decoded = jwt.verify(token, key);
		const phone = decoded.phone; // token 中包含手机号

		// 查询用户信息
		const userRecord = await db.collection('users').where({
			phone
		}).get();
		if (userRecord.data.length === 0) {
			return {
				code: 404,
				message: '用户不存在'
			};
		}

		const user = userRecord.data[0];
		
		// 若nickname有值，修改昵称
		
		if(nickname && nickname.length > 0){
			await db.collection('users').doc(user._id).update({
				nickname:nickname.trim(),
			});
			
			return {
				code:200,
				message:"昵称修改成功"
			}
		}
		
		// 验证旧密码
		const isOldPasswordValid = bcrypt.compareSync(oldPwd, user.password);
		if (!isOldPasswordValid) {
			return {
				code: 401,
				message: '旧密码错误'
			};
		}

		// 检查新旧密码是否一致
		const isNewPasswordSame = bcrypt.compareSync(newPassword, user.password);
		if (isNewPasswordSame) {
			return {
				code: 400,
				message: '新密码与旧密码不能相同'
			};
		}

		// 加密新密码
		const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
		// 更新用户密码
		await db.collection('users').doc(user._id).update({
			password: hashedNewPassword
		});
		
		return { code: 200, message: '密码修改成功' };

	} catch (error) {
		return {
			code: 500,
			message: '更新失败',
			error: error.message,
		}
	}
}