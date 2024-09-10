const express = require('express');
const router = express.Router();
const { Article } = require('/Users/huizi/ExpressPractice/models');
const { Op } = require('sequelize');
const { NotFoundError, success, failure } = require('../../utils/response');


/**
 * GET /admin/articles
 */
router.get('/', async function (req, res) {
  try {
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;

    const condition = {
      order: [['id', 'DESC']],
      limit: pageSize,
      offset: offset
    };

    if (query.title) {
      condition.where = {
        title: {
          [Op.like]: `%${ query.title }%`
        }
      };
    }

    const { count, rows } = await Article.findAndCountAll(condition);
    success(res, 'Query article success', {
      articles: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize,
      }
    });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * GET /admin/articles/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const article = await getArticle(req);
    success(res, 'Query article success', { article });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * POST /admin/articles
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);

    const article = await Article.create(body);
    success(res, 'Create article success', { article }, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * PUT /admin/articles/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const article = await getArticle(req);
    const body = filterBody(req);

    await article.update(body);
    success(res, 'Update article success', { article });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * DELETE /admin/articles/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const article = await getArticle(req);

    await article.destroy();
    success(res, 'Delete article success');
  } catch (error) {
    failure(res, error);
  }
});

/**
 */
async function getArticle(req) {
  const { id } = req.params;

  const article = await Article.findByPk(id);
  if (!article) {
    throw new NotFoundError(`ID: Article${ id } not found`)
  }

  return article;
}

/**
 * @param req
 * @returns {{title, content: (string|string|DocumentFragment|*)}}
 */
function filterBody(req) {
  return {
    title: req.body.title,
    content: req.body.content
  };
}

module.exports = router;
