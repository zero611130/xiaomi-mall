const { Controller } = require("egg");

/**
 * 公共 controler基类  为子类对象提供公共方法
 */
class BaseController extends Controller {
  async success() {
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
}

module.exports = BaseController;
