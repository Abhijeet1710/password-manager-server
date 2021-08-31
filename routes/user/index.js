const Router = require("express").Router();
const bcrypt = require("bcrypt");

// Database Model
const UserModel = require("../../database/UserModel");
const makeHash = require("../../database/security");
// /*
// Route           /
// Description     get all users
// Access          ADMIN
// Parameters      NONE
// Method          GET
// */
Router.get("/", async (req, res) => {
  const allUsers = await UserModel.find();
  return res.json({ users: allUsers });
});

/*
  Route           /new
  Description     add new user
  Access          PUBLIC
  Parameters      NONE
  Method          POST
  Body            userName, masterPassword, email

*/
Router.post("/new", async (req, res) => {
  try {
    const newUser = req.body;
    const userExist = await UserModel.findOne({ email: newUser.email });
    if (userExist)
      return res.json({ message: `Account with this email already exist` });
    const userpass = `${newUser.userName}${newUser.masterPassword}`;
    const hashedPassword = await bcrypt.hash(userpass, 12);
    // const hashedPassword = makeHash(newUser.userName, newUser.masterPassword);
    newUser.masterPassword = hashedPassword;
    await UserModel.create(newUser);
  } catch (e) {
    return res.json({ message: `Error ${e}` });
  }
  return res.json({ message: "Sucess" });
});

/*
  Route           /login
  Description     login user if user name with corosponding password exist
  Access          PUBLIC
  Parameters      NONE
  Method          POST
  Body            userName, masterPassword, email
*/
Router.post("/login", async (req, res) => {
  try {
    const {userName, masterPassword, email} = req.body;
    if(!userName || !masterPassword || !email) return res.json({ message: "fill all data" });
    const userpass = `${userName}${masterPassword}`;

    const userExist = await UserModel.findOne({
      email,
    });
    if(!userExist) return res.json({ message: "Account with this email not found" });
    const isMathch = await bcrypt.compare(userpass, userExist.masterPassword);
    if(isMathch) return res.json({ user: userExist });
    return res.json({ message: "Wrong user name or masterPassword" });

  } catch (e) {
    return res.json({ message: `${e}` });
  }
});

module.exports = Router;
