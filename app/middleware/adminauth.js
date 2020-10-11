const { truncate } = require("fs");
const md5 = require("md5");
const url = require("url");

module.exports = (options) => {
  return async function adminauth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers["referer"] || "/";
    const path = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo; //用户信息全局保存
      var hasAuth = await ctx.service.admin.checkAuth();
      if (hasAuth) {
        await next();
      } else {
        ctx.body = "您没有访问页面权限";
      }
    } else {
      if (["/admin/login", "/admin/dologin", "/admin/verify"].includes(path)) {
        await next();
      } else {
        ctx.redirect("/admin/login");
      }
    }
  };
};
