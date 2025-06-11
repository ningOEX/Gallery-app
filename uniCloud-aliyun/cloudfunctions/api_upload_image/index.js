'use strict';

const db = uniCloud.database();
const { file } = require('uni-cloud');

exports.main = async (event, context) => {
    const { title, content, image } = event; // 从请求中获取数据

    // 检查必填字段
    if (!title || !content || !image) {
        return {
            code: 400,
            message: '标题、内容和图片是必填项'
        };
    }

    // 上传图片到云存储
    const imageUrl = await uploadImage(image);

    // 存储文章到数据库
    const articleData = {
        title: title,
        content: content,
        image: imageUrl,
        createdAt: new Date()
    };

    await db.collection('images_list').add(articleData);

    return {
        code: 200,
        message: '文章上传成功',
        data: articleData
    };
};

// 上传图片的函数
async function uploadImage(image) {
    const fileName = `images/${Date.now()}.jpg`; // 自定义文件名
    const res = await file.saveFile({
        file: image,
        cloudPath: fileName
    });

    return res.fileID; // 返回图片的云存储 ID
}