'use strict';
const base='/api'
module.exports = app => {
  app.resources('task', `${base}/task`, app.controller.task);
};