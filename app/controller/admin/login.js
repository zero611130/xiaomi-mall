"use strict";

const md5 = require("md5");
const BaseController = require("./base.js");
class LoginController extends BaseController {
  async index() {
    await this.ctx.render("/admin/login");
  }
  async doLogin() {
    const { ctx } = this;
    const { username, password, verify } = ctx.request.body;
    const md5Password = md5(password);
    if (ctx.session.code.toLowerCase() === verify.toLowerCase()) {
      const userInfo = await this.ctx.model.Admin.find({
        username: username,
        password: md5Password,
      });

      if (Array.isArray(userInfo) && userInfo.length) {
        ctx.session.userinfo = userInfo[0];
        ctx.redirect("/admin/manager");
      } else {
        await this.error("/admin/login", "用户名或者密码不对");
      }
    } else {
      await this.error("/admin/login", "验证码不对");
    }
  }

  async logOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect("/admin/login");
  }
}

module.exports = LoginController;
