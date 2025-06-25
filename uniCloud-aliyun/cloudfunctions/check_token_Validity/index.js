'use strict';
const db = uniCloud.database()

const jwt = require('jsonwebtoken');
const SECRET_KEY = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP"

// 
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {token} = event
	try {
		 const decoded = jwt.verify(token, SECRET_KEY);
		return { valid: true, decoded };
	} catch (error) {
		//TODO handle the exception
		return { valid: false, error: error.message };
	}
	//返回数据给客户端
	return event
};
