'use strict';
const base = '/api'
module.exports = app => {
  const middlewares = app.middlewares;
  const mustLogIn = middlewares.mustLogIn();
  app.resources('task', `${base}/tasks`, app.controller.api.tasks);
  app.resources('user', `${base}/user`, app.controller.api.users);
  app.post(`${base}/login`, app.controller.api.users.login);

  app.get(`${base}/user/tasks`, mustLogIn, app.controller.api.users.tasks);
  app.get(`${base}/tasks/:id/receive`, mustLogIn, app.controller.api.tasks.receive);
  app.get(`${base}/tasks/:id/carry_out`, mustLogIn, app.controller.api.tasks.carry_out)
};