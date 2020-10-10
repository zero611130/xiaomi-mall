module.exports = (app) => {
  const { router, controller } = app;
  router.get("/admin/role", controller.admin.role.index);
  router.get("/admin/role/add", controller.admin.role.add);
  router.post("/admin/role/addrole", controller.admin.role.addRole);
  router.get("/admin/role/delete", controller.admin.role.deleteRole);

  router.post("/admin/role/doEdit", controller.admin.role.editRole);
  router.get("/admin/role/edit", controller.admin.role.edit);
  // /admin/role/auth
  router.get("/admin/role/auth", controller.admin.role.authpage);
  router.post("/admin/role/doAuth", controller.admin.role.doAuth);
};
