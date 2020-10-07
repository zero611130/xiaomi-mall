"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/admin/login", controller.admin.login.index);

  //管理员管理
  require("./routers/admin/manager.js")(app);
  //角色管理
  require("./routers/admin/role.js")(app);
  //分类管理
  require("./routers/admin/access.js")(app);
};