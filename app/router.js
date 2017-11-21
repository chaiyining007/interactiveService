'use strict';
const base='/api'
module.exports = app => {
  app.resources('task', `${base}/task`, app.controller.api.tasks);
  app.resources('user', `${base}/user`, app.controller.api.users);
};