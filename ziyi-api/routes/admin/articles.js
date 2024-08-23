const express = require('express');
const router = express.Router();
const { Article } = require('/Users/huizi/ExpressPractice/models');
const { Op } = require('sequelize');

router.get('/:id', async function (req, res) {
    try {
      // 获取文章 ID
      const { id } = req.params;
  
      // 查询文章
      const article = await Article.findByPk(id);
  
      if (article) {
        res.json({
          status: true,
          message: '查询文章成功。',
          data: article
        });
      } else {
        res.status(404).json({
          status: false,
          message: '文章未找到。',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: '查询文章失败。',
        errors: [error.message]
      });
    }
  });

  function filterBody(req){
    return {
        title: req.body.title,
        content: req.body.content
      };
  }
  router.post('/', async function (req, res) {
    try {
        const body = filterBody(req);
      // 使用 req.body 获取到用户通过 POST 提交的数据，然后创建文章
      const article = await Article.create(body);
  
      res.status(200).json({
        status: true,
        message: '创建文章成功。',
        data: article
      });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(e => e.message);
          
            res.status(400).json({
              status: false,
              message: '请求参数错误。',
              errors
            });
          } else {
            res.status(500).json({
              status: false,
              message: '创建文章失败。',
              errors: [error.message]
            });
          }
    }
  });
  router.delete('/:id', async function (req, res){
    try{
        const { id } = req.params;  // Extracting the id from req.params
        const article = await Article.findByPk(id);

        if(article) {
            await article.destroy();

            res.json({
                status: true,
                message: 'Delete article successfully.'
            });
        }else{
            res.status(404).json({
                status: false,
                message: 'Article not found.'
            });
        }
    }catch(error){
        res.status(500).json({
            status:false,
            message: 'Delete article failed.',
            errors: [error.message]
        });
    }
  });
  
  router.put('/:id', async function (req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);
  
      if (article) {
        await article.update(req.body);
  
        res.json({
          status: true,
          message: '更新文章成功。',
          data: article
        });
      } else {
        res.status(404).json({
          status: false,
          message: '文章未找到。',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: '更新文章失败。',
        errors: [error.message]
      });
    }
  });

  router.get('/', async function (req, res) {
    try {
      // 获取查询参数
      const query = req.query;
      const currentPage = Math.abs(Number(query.currentPage)) || 1;
      const pageSize = Math.abs(Number(query.pageSize)) || 10;
      // 定义查询条件
      const condition = {
        order: [['id', 'DESC']],
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
      };
  
      // 如果有 title 查询参数，就添加到 where 条件中
      if(query.title) {
        condition.where = {
          title: {
            [Op.like]: `%${query.title}%`
          }
        };
      }
  
      // 查询数据
      const articles = await Article.findAll(condition);
  
      // 返回查询结果
      res.json({
        status: true,
        message: '查询文章列表成功。',
        data: {
          articles
        }
      });
    } catch (error) {
      // 返回错误信息
      res.status(500).json({
        status: false,
        message: '查询文章列表失败。',
        errors: [error.message]
      });
    }
  });

module.exports = router;