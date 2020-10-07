"use strict";
var svgCaptcha = require("svg-captcha");
const Service = require("egg").Service;

class ToolsService extends Service {
  /**
   * 生成验证码并将验证码信息挂载到session
   */
  async captcha() {
    var captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966",
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }
}

module.exports = ToolsService;
