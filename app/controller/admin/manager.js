"use strict";

const md5 = require("md5");
const BaseController = require("./base");

class ManagerController extends BaseController {
  async index() {
    // this.ctx.body='管理员列表'
    // const { username } = this.ctx.session.userinfo;
    const managerData = await this.ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: "role",
          localField: "role_id",
          foreignField: "_id",
          as: "role",
        },
      },
    ]);

    await this.ctx.render("admin/manager/index", { list: managerData });
  }

  async add() {
    const roleResult = await this.ctx.model.Role.find({});
    await this.ctx.render("admin/manager/add", {
      roleResult: roleResult || [],
    });
  }
  async addManager() {
    const {
      username,
      password,
      mobile,
      email,
      role_id,
    } = this.ctx.request.body;
    const uniqueUsername = await this.ctx.model.Admin.find({
      username,
    });
    if (uniqueUsername.length) {
      return await this.error("/admin/manager/add", "用户名重复 0....0");
    }
    const legalUserDate = Object.keys(this.ctx.request.body).every((item) => {
      return Boolean(this.ctx.request.body[item]);
    });
    if (!legalUserDate) {
      return await this.error("/admin/manager/add", "填写信息有误");
    }
    const newUser = new this.ctx.model.Admin({
      username,
      password: md5(password),
      mobile,
      email,
      role_id,
    });
    let res = await newUser.save();
    res && (await this.success("/admin/manager", "新增管理员成功"));
  }

  async edit() {
    const { id } = this.ctx.request.query;
    const oldInfo = await this.ctx.model.Admin.find({
      _id: id,
    });
    const roleEmun = await this.ctx.model.Role.find({});
    await this.ctx.render("admin/manager/edit", {
      adminResult: oldInfo[0],
      roleResult: roleEmun,
    });
  }

  async doEdit() {
    const { id, ...rest } = this.ctx.request.body;
    //todo  数据验证。
    const updateRes = await this.ctx.model.Admin.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...rest,
      }
    );

    updateRes && (await this.success("/admin/manager", "编辑管理员成功"));
  }

  async deleteManager() {
    const { id, model } = this.ctx.request.query;
    await this.delete(id, model);
  }
}

module.exports = ManagerController;
