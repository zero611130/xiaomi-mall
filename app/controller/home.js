"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "功能暂未开放 0.0";
  }
}

module.exports = HomeController;
