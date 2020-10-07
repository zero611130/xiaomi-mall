"use strict";

const Controller = require("egg").Controller;
class LoginController extends Controller {
  async index() {
    // console.log("================== LoginController =================");
    await this.ctx.render("/admin/login");
  }

  async doLogin() {
    console.log("=== doLogin ===", this.ctx.request.body);
  }
}

module.exports = LoginController;
