/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1602041807781_7103";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // ejs-模版引擎配置
  config.view = {
    mapping: {
      ".html": "ejs",
    },
  };

  config.middleware = ["adminauth"];
  config.adminauth = {
    match: "/admin/*",
  };

  return {
    ...config,
    ...userConfig,
  };
};
