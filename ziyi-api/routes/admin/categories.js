const express = require('express');
const router = express.Router();
const { Category } = require('/Users/huizi/ExpressPractice/models');
const { Op } = require('sequelize');
const { NotFoundError, success, failure } = require('../../utils/response');


/**
 * GET /admin/categories
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

    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${ query.name }%`
        }
      };
    }

    const { count, rows } = await Category.findAndCountAll(condition);
    success(res, 'Query category success', {
      categories: rows,
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
 * GET /admin/categories/:id
 */
router.get('/:id', async function (req, res) {
  try {
    const category = await getCategory(req);
    success(res, 'Query category success', { category });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * POST /admin/categories
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);

    const category = await Category.create(body);
    success(res, 'Create category success', { category }, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * PUT /admin/categories/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const category = await getCategory(req);
    const body = filterBody(req);

    await category.update(body);
    success(res, 'Update category success', { category });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * DELETE /admin/categories/:id
 */
router.delete('/:id', async function (req, res) {
  try {
    const category = await getCategory(req);

    await category.destroy();
    success(res, 'Delete category success');
  } catch (error) {
    failure(res, error);
  }
});

/**
 */
async function getCategory(req) {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) {
    throw new NotFoundError(`ID: Category${ id } not found`)
  }

  return category;
}

/**
 * 
 * @param req 
 * @returns {{name,rank: (number|*)}} 
 */
function filterBody(req) {
  return {
    name: req.body.name,
    rank: req.body.rank
  };
}

module.exports = router;
