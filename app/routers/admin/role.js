module.exports = (app) => {
  const { router, controller } = app;
  router.get("/admin/role", controller.admin.role.index);
  router.get("/admin/role/add", controller.admin.role.add);
  router.get("/admin/role/edit", controller.admin.role.edit);
};
