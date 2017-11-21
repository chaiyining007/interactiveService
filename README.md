# interactiveService



## 命名规范
1.controller：复数

2.model：单数

3.service：单数
## cli
```bash
#安装全局命令
npm install foundation-project -g

#创建初始化代码
#包含：controller，model，service
create 类名 --package_name=egg
```
## migrations
```bash
$ npm run migrate:new
$ npm run migrate:up
$ npm run migrate:down
```

## 部署

```bash
$ npm run start
$ npm run stop
$ npm run debug
$ npm run dev
$ npm run test
```

## 工具文档

1.[egg](https://eggjs.org/zh-cn/)

2.[sequelizejs](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)

3.[foundation-project](https://www.npmjs.com/package/foundation-project)