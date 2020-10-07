"use strict";

const Controller = require("egg").Controller;
class LoginController extends Controller {
  async index() {
    console.log("================== LoginController =================");
    await this.ctx.render("/admin/login");
  }
}

module.exports = LoginController;
