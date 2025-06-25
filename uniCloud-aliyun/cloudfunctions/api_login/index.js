'use strict'

const db = uniCloud.database()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

exports.main = async (event, context) => {
	const {
		phone,
		password
	} = event

	// 查询用户
	const userRecord = await db
		.collection('users')
		.where({
			phone,
		})
		.get()

	// 检查用户是否存在
	if (userRecord.data.length === 0) {
		return {
			code: 404,
			message: '用户不存在',
		}
	}

	const user = userRecord.data[0]

	// 验证密码
	const isPasswordValid = bcrypt.compareSync(password, user.password)
	if (!isPasswordValid) {
		return {
			code: 401,
			message: "密码错误"
		}
	}

	// 生成token
	const token = jwt.sign({
		phone
	}, key, {
		expiresIn: "7d"
	})
	
	// 登录成功，返回用户信息
	return {
		code: 200,
		message: "登录成功",
		token,
	}
}