const url = require("url");

module.exports = (options) => {
  return async function adminauth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    const path = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
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
