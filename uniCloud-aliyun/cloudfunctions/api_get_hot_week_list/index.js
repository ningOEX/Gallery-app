'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
    const { page = 1, pageSize = 10 } = event;

    // 计算一周前的时间戳
    // const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime();

    const skip = (page - 1) * pageSize;

    try {
        const result = await db.collection('images_list')
            .skip(skip)
            .limit(pageSize)
            .get();
		const countResult = await db.collection("images_list").count()
        return {
            code: 200,
            message: '获取成功',
            data: result.data,
            total: countResult.total
        };
    } catch (error) {
        console.error('查询失败:', error);
        return {
            code: 500,
            message: '查询失败',
        };
    }
};