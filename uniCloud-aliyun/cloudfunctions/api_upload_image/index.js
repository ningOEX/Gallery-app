'use strict';

const db = uniCloud.database();
const { file } = require('uni-cloud');

exports.main = async (event, context) => {
    const { title, description, src,username,views = 0,uid } = event; // 从请求中获取数据

    // 检查必填字段
    if (!title || !content || !src || !uid | !username) {
        return {
            code: 400,
            message: '请填写完整~'
        };
    }

    // 存储文章到数据库
    const articleData = {
        title,
        description,
        src,
		username,
		views,
		uid,
        createdAt: new Date()
    };

    await db.collection('images_list').add(articleData);

    return {
        code: 200,
        message: '发布成功',
        data: articleData
    };
};
