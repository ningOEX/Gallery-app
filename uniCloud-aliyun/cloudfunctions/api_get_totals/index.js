'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {uid} = event
	
	if (!uid) {
		return {
			code:400,
			message: '缺少参数'
		};
	}
	
	try{
		// 作品发布
		const worksTotal = await db.collection("images_list").where({uid}).count()
		
		// 历史头像 
		const oldAvatar = await db.collection("abandon_avatar_list").where({uid}).get()
		return {
			code : 200,
			message: "获取成功",
			data:{
				worksTotal: worksTotal.total,
				oldAvatar : oldAvatar.data
			}
		}
	}catch (error){
		return {
			code: 500,
			message: '获取失败'
		};
	}
	
	
	
};
