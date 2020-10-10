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
      "/admin/loginOut",
    ];
    //不需要进行访问验证
    if (ignoreUrl.includes(vistingUrl || is_super === 1)) {
      return;
    }
    // 当前用户拥有这个权限

    // console.log("====== vistingUrlAccess   =============", vistingUrlAccess);

    if (vistingUrlAccess.length) {
      const { _id } = vistingUrlAccess[0];
      if (currentUserAccessList.includes(_id.toString())) {
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = AdminService;
