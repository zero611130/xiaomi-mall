"use strict";

const Controller = require("egg").Controller;

class ManagerController extends Controller {
  async index() {
    // this.ctx.body='管理员列表'
    const { username } = this.ctx.session.userinfo;
    await this.ctx.render("admin/manager/index", {
      username: username || "陌生人",
    });
  }

  async add() {
    await this.ctx.render("admin/manager/add");
  }

  async edit() {
    await this.ctx.render("admin/manager/edit");
  }
}

module.exports = ManagerController;
