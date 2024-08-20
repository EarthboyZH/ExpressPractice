const express = require('express');
const router = express.Router();
const { Article } = require('/Users/huizi/ExpressPractice/models');

router.get('/', async function (req, res) {
    // 查询数据
    const articles = await Article.findAll();
  
    // 返回查询结果
    res.json({
      status: true,
      message: '查询文章列表成功。',
      data: {
        articles
      }
    });
  });

module.exports = router;