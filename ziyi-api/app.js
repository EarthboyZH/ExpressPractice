const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminArticleRouter = require('./routes/admin/articles');
const adminCategoryRouter = require('./routes/admin/categories');
const adminSettingRouter = require('./routes/admin/settings');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/articles', adminArticleRouter);
app.use('/admin/categories', adminCategoryRouter);
app.use('/admin/settings', adminSettingRouter);

module.exports = app;
