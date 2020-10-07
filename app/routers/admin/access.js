module.exports = (app) => {
  const { router, controller } = app;
  router.get("/admin/access", controller.admin.access.index);
  router.get("/admin/access/add", controller.admin.access.add);
  router.get("/admin/access/edit", controller.admin.access.edit);
};
