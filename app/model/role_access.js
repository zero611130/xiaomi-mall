const { mongoose } = require("../../config/plugin");

module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const RoleAccessSchema = new Schema({
    access_id: { type: Schema.Types.ObjectId },
    role_id: { type: Schema.Types.ObjectId },
  });

  return mongoose.model("RoleAccess", RoleAccessSchema, "role_access");
};
