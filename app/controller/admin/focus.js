"use strict";
const path = require("path");
const fs = require("fs");

const pump = require("mz-modules/pump");

var BaseController = require("./base.js");

class FocusController extends BaseController {
  async index() {
    var result = await this.ctx.model.Focus.find({});
    await this.ctx.render("admin/focus/index", {
      list: result || [],
    });
  }

  async add() {
    await this.ctx.render("admin/focus/add");
  }

  async doAdd() {
    let parts = this.ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; //file表单的名字

      //上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    let focus = new this.ctx.model.Focus(Object.assign(files, parts.field));

    var result = await focus.save();

    await this.success("/admin/focus", "增加轮播图成功");
  }

  async edit() {
    var id = this.ctx.request.query.id;
    console.log("============ id  ============", id);
    var result = await this.ctx.model.Focus.find({ _id: id });
    await this.ctx.render("admin/focus/edit", {
      list: result[0],
    });
  }

  async doEdit() {
    let parts = this.ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname; //file表单的名字

      //上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    //修改操作
    var id = parts.field.id;
    var updateResult = Object.assign(files, parts.field);
    let result = await this.ctx.model.Focus.updateOne(
      { _id: id },
      updateResult
    );
    await this.success("/admin/focus", "修改轮播图成功");
  }

  async deletefocus() {
    console.log("=====================================");
    const { id, model } = this.ctx.request.query;
    await this.delete(id, model);
  }
}

module.exports = FocusController;
