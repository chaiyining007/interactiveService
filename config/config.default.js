'use strict';
const database = "interactive";
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1510644517177_9035';

  // add your config here
  config.middleware = ['serverTime', 'errorHandler'],

    config.mysql = { // mysql 配置
      client: {
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        passsword: "",
        database: database
      }
    };

  config.sequelize = { // egg-sequelize 配置
    dialect: "mysql", // db type
    database: database,
    host: "127.0.0.1",
    port: "3306",
    username: "root",
    password: "",
    timezone:"+8:00"
  };
  return config;
};
