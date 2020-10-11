// const { Service } = require("egg");

const Service = require("egg").Service;
var url = require("url");

class AdminService extends Service {
  async checkAuth() {
    // 获取到当前用户的权限id 数组

    const { role_id, is_super } = this.ctx.session.userinfo;

    //当前用户（所属角色）拥有的所有权限id
    const currentUserAccess = await this.ctx.model.RoleAccess.find({
      role_id: role_id,
    });
    // 当前用户（所属角色）拥有的所有权限id 数组容器
    const currentUserAccessList = [];

    currentUserAccess.forEach((accItem) => {
      currentUserAccessList.push(accItem.access_id.toString());
    });

    const vistingUrl = url.parse(this.ctx.request.url).pathname;

    //获取访问当前 url 所需要的权限 id
    const vistingUrlAccess = await this.ctx.model.Access.find({
      url: vistingUrl,
    });

    //忽略权限判断的地址    is_super表示是管理员
    var ignoreUrl = [
      "/admin/login",
      "/admin/doLogin",
      "/admin/verify",
      "/admin/logout",
    ];
    //不需要进行访问验证

    if (ignoreUrl.includes(vistingUrl || is_super === 1)) {
      return true;
    }
    // 当前用户拥有这个权限
    if (vistingUrlAccess.length) {
      const { _id } = vistingUrlAccess[0];
      if (currentUserAccessList.includes(_id.toString())) {
        return true;
      }
      return false;
    }
    return false;
  }

  async getNavlist(userInfo) {
    const { role_id } = userInfo;

    //获取当前用户拥有的 权限数组 start
    const currentUserAccessContainer = [];
    const currentUserAccess = await this.ctx.model.RoleAccess.find({
      role_id: role_id,
    });
    currentUserAccess.forEach((accitem) => {
      currentUserAccessContainer.push(accitem.access_id.toString());
    });

    //获取当前用户拥有的 权限数组 end

    const allAccessInfo = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: "access",
          localField: "_id",
          foreignField: "module_id",
          as: "items",
        },
      },
      {
        $match: { module_id: "0" },
      },
    ]);

    allAccessInfo.forEach((topItem) => {
      if (currentUserAccessContainer.includes(topItem._id.toString())) {
        topItem.checked = true;
      }

      topItem.items.forEach((secItem) => {
        if (currentUserAccessContainer.includes(secItem._id.toString())) {
          secItem.checked = true;
        }
      });
    });
    return allAccessInfo;
  }
}

module.exports = AdminService;
