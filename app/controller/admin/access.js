"use strict";

const BaseController = require("./base");

const Controller = require("egg").Controller;

class AccessController extends BaseController {
  async index() {
    //自关联表 查询 菜单和操作 的  module_id  === 其父级模块的ID
    const result = await this.ctx.model.Access.aggregate([
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

    await this.ctx.render("admin/access/index", {
      list: result,
    });
  }
  async add() {
    var result = await this.ctx.model.Access.aggregate([
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

    await this.ctx.render("admin/access/add", {
      moduleList: [...result],
    });
  }
  async addPermission() {
    const formData = this.ctx.request.body;
    const { module_id } = formData;
    if (module_id !== "0") {
      formData.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }
    const newData = new this.ctx.model.Access({
      ...formData,
    });
    await newData.save();
    await this.success("/admin/access", "增加权限成功");
  }

  async edit() {
    const editModelId = this.ctx.request.query.id;
    const editItem = await this.ctx.model.Access.find({
      _id: editModelId,
    });
    var result = await this.ctx.model.Access.find({ module_id: "0" });

    await this.ctx.render("admin/access/edit", {
      moduleList: result,
      list: editItem[0],
    });
  }

  async doEdit() {
    const formdata = this.ctx.request.body;
    const id = this.ctx.request.body.id;
    if (formdata.module_id !== "0") {
      formdata.module_id = this.app.mongoose.Types.ObjectId(formdata.module_id);
    }

    const res = await this.ctx.model.Access.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...formdata,
      }
    );
    await this.success("/admin/access", "修改权限成功");
  }

  async deleteAccess() {
    const { id, model } = this.ctx.request.query;
    await this.delete(model, id);
  }
}

module.exports = AccessController;
