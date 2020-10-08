module.exports = (app) => {
  const { router, controller } = app;
  router.get("/admin/manager", controller.admin.manager.index);
  router.get("/admin/manager/add", controller.admin.manager.add);
  router.get("/admin/manager/edit", controller.admin.manager.edit);
  router.post("/admin/manager/addmanager", controller.admin.manager.addManager);
  router.post("/admin/manager/doEdit", controller.admin.manager.doEdit);
  router.get("/admin/manager/delete", controller.admin.manager.deleteManager);
};
