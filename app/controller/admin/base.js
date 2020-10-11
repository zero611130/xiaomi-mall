const { Controller } = require("egg");

/**
 * 公共 controler基类  为子类对象提供公共方法
 */
class BaseController extends Controller {
  async success(redirectUrl, message) {
    await this.ctx.render("admin/public/success", {
      redirectUrl,
      message,
    });
  }

  async error(redirectUrl, message) {
    await this.ctx.render("admin/public/error", {
      redirectUrl,
      message,
    });
  }
  /**
   * 验证码接口
   */
  async verify() {
    let captcha = await this.service.tools.captcha();
    this.ctx.response.type = "image/svg+xml";
    this.ctx.body = captcha.data;
  }

  async delete(id, model) {
    // const { model, id } = this.ctx.request.query;
    let res = await this.ctx.model[model].findOneAndDelete({ _id: id });
    await this.ctx.redirect(this.ctx.state.prevPage);
  }

  async changeStatus() {
    var model = this.ctx.request.query.model; /*数据库表 Model*/
    var attr = this.ctx.request.query.attr; /*更新的属性 如:status is_best */
    var id = this.ctx.request.query.id; /*更新的 id*/

    var result = await this.ctx.model[model].find({ _id: id });

    if (result.length > 0) {
      if (result[0][attr] == 1) {
        var json = {
          /*es6 属性名表达式*/

          [attr]: 0,
        };
      } else {
        var json = {
          [attr]: 1,
        };
      }

      //执行更新操作
      var updateResult = await this.ctx.model[model].updateOne(
        { _id: id },
        json
      );

      if (updateResult) {
        this.ctx.body = { message: "更新成功", success: true };
      } else {
        this.ctx.body = { message: "更新失败", success: false };
      }
    } else {
      //接口
      this.ctx.body = { message: "更新失败,参数错误", success: false };
    }
  }
}

module.exports = BaseController;
