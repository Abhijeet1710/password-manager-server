const mongoose = require("mongoose");

// Author Schema
const UserSchema = mongoose.Schema({
  id: Number,
  userName: {
    required: true,
    type: String,
  },
  masterPassword: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  data: [
    {
      siteName: String,
      sitePassword: String,
    },
  ],
});

// Author Model
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
