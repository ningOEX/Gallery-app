'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {_id} = event
	
	if(!_id){
		return{
			code:404,
			message:'信息走丢了'
		}
	}
	
	try {
		const result = await db.collection("users").where({_id}).get()
		
		delete result.data[0].password
		return{
			code:200,
			data:result.data,
			message:"获取成功"
		}
		
	} catch (error) {
		//TODO handle the exception
		return {
		  code: 500,
		  message: '获取失败',
		}
	}
	
};
