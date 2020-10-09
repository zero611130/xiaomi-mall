module.exports = (app) => {
  const { router, controller } = app;
  router.get("/admin/access", controller.admin.access.index);
  router.get("/admin/access/add", controller.admin.access.add);
  router.get("/admin/access/edit", controller.admin.access.edit);
  router.post("/admin/access/doAdd", controller.admin.access.addPermission);
  router.post("/admin/access/doEdit", controller.admin.access.doEdit);
  // /admin/access/delete
  router.get("/admin/access/delete", controller.admin.access.deleteAccess);
};
