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
    console.log("=====id=====", id);
    // const allAccess = this.model
    //查询现有所有权限

    const allAccess = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: "access",
          localField: "_id",
          foreignField: "module_id",
          as: "items",
        },
      },
      {
        $match: {
          module_id: "0",
        },
      },
    ]);

    const currentRoleAccess = await this.ctx.model.RoleAccess.find({
      role_id: id,
    });

    const roleAccessContainer = [];

    currentRoleAccess.forEach((item) => {
      roleAccessContainer.push(item.access_id.toString());
    });

    allAccess.forEach((topAccitem) => {
      if (roleAccessContainer.includes(topAccitem._id.toString())) {
        topAccitem.checked = true;
      }
      topAccitem.items.forEach((secAccitem) => {
        if (roleAccessContainer.includes(secAccitem._id.toString())) {
          secAccitem.checked = true;
        }
      });
    });

    // console.log("====currentRoleAccess  ====", currentRoleAccess);
    // this.ctx.body = { ...currentRoleAccess };
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
