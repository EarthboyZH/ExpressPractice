const express = require('express');
const router = express.Router();
const { Setting } = require('/Users/huizi/ExpressPractice/models');
const { NotFoundError, success, failure } = require('../../utils/response');


/**
 * GET /admin/settings
 */
router.get('/', async function (req, res) {
  try {
    const setting = await getSetting();
    success(res, 'Query setting success', { setting });
  } catch (error) {
    failure(res, error);
  }
});


/**
 * PUT /admin/settings
 */
router.put('/', async function (req, res) {
  try {
    const setting = await getSetting();
    const body = filterBody(req);

    await setting.update(body);
    success(res, 'Update setting success', { setting });
  } catch (error) {
    failure(res, error);
  }
});


/**
 */
async function getSetting() {

  const setting = await Setting.findOne();
  if (!setting) {
    throw new NotFoundError(`ID: Setting${ id } not found`)
  }

  return setting;
}

/**
 * @param req
 * @returns {{name, copyright: (string|string|DocumentFragment|*)}}
 */
function filterBody(req) {
  return {
    name: req.body.name,
    copyright: req.body.copyright
  };
}

module.exports = router;
