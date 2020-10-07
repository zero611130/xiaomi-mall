const { Controller } = require("egg");

/**
 * 公共 controler基类  为子类对象提供公共方法
 */
class BaseController extends Controller {
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
