module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const defaultTime = new Date().getTime();

  const schema = new Schema({
    username: { type: String },
    password: { type: String },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId },
    add_time: {
      type: Number,
      default: defaultTime,
    },
    is_super: { type: Number },
  });
  return mongoose.model("Admin", schema, "admin");
};
