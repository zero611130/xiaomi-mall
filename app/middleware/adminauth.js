const url = require("url");

module.exports = (options) => {
  return async function adminauth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    const path = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      ctx.state.prevPage = ctx.request.headers["referer"] || "/";
      ctx.state.userinfo = ctx.session.userinfo; //用户信息全局保存
      await next();
    } else {
      if (["/admin/login", "/admin/dologin", "/admin/verify"].includes(path)) {
        await next();
      } else {
        ctx.redirect("/admin/login");
      }
    }
  };
};
