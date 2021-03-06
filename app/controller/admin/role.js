"use strick";
const BaseController = require("./base");
class RoleController extends BaseController {
  async index() {
    const roleData = await this.ctx.model.Role.find({});
    await this.ctx.render("admin/role/index", {
      roleData: roleData,
    });
  }

  async add() {
    await this.ctx.render("admin/role/add");
  }

  async edit() {
    const { id } = this.ctx.request.query;
    const roleItemData = await this.ctx.model.Role.find({
      _id: id,
    });
    await this.ctx.render("admin/role/edit", {
      list: roleItemData[0] || {},
    });
  }

  async deleteRole() {
    const { id } = this.ctx.request.query;
    await this.delete("Role", id);
  }

  async addRole() {
    const { title, description } = this.ctx.request.body;
    const newRole = new this.ctx.model.Role({ title, description });
    const res = await newRole.save();
    await this.success("/admin/role", "增加新角色成功 0……0");
  }

  async editRole() {
    const { title, description, _id } = this.ctx.request.body;
    const res = await this.ctx.model.Role.findOneAndUpdate(
      {
        _id,
      },
      {
        title,
        description,
      }
    );
    res && (await this.success("/admin/role", "更新角色信息成功"));
  }

  async authpage() {
    const { id } = this.ctx.request.query;

    const allAccess = await this.service.admin.getNavlist(
      this.ctx.session.userinfo
    );
    await this.ctx.render("admin/role/auth", {
      list: allAccess,
      role_id: id,
    });
  }

  async doAuth() {
    const { access_node, role_id } = this.ctx.request.body;
    //清空上次的保存记录
    await this.ctx.model.RoleAccess.deleteMany({
      role_id: role_id,
    });
    for (const nodeItem of access_node) {
      const newRoleAccessItem = new this.ctx.model.RoleAccess({
        access_id: this.app.mongoose.Types.ObjectId(nodeItem),
        role_id: this.app.mongoose.Types.ObjectId(role_id),
      });

      await newRoleAccessItem.save();
    }
    await this.success("/admin/role", "权限修改成功");
  }
}

module.exports = RoleController;
