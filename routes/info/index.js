const Router = require("express").Router();

// Database Model
const UserModel = require("../../database/UserModel");

// /*
// Route           /
// Description     get user base on user _id
// Access          PUBLIC
// Parameters      NONE
// Method          POST
// Body            user _id
// */
Router.post("/", async (req, res) => {
    const oneUser = await UserModel.findOne({ _id : req.body.id });
    return res.json({ status: "Sucess", user: oneUser });
  });

/*
add new site data.
Route           /insert
Description     add site data in user data, based on user _id
Access          PUBLIC
Parameters      NONE
Method          POST
Body            site info and user _id
*/

Router.post("/insert", (req, res) => {
  const siteData = req.body.siteData;
  const userId = req.body.userId;
  UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { data: siteData } },
    function (error, _success) {
      if (error) return res.json({ status: "Failure" });
    }
  );
  return res.json({ status: "Sucess" });
});
/*
update existing site's data of user based on user _id.
Route           /update
Description     add site data in user data based on _id
Access          PUBLIC
Parameters      NONE
Method          POST
Body            new site info and user _id, site _id
*/
Router.post("/update", async (req, res) => {
  const { siteName, sitePassword } = req.body.siteData;
  const userId = req.body.userId;
  const siteId = req.body.siteId;
  await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        "data.$[o].siteName": siteName,
        "data.$[o].sitePassword": sitePassword,
      },
    },
    {
      arrayFilters: [{ "o._id": siteId }],
    },
    function (error, _success) {
      if (error) return res.json({ status: "Failure" });
    }
  );
  return res.json({ status: "Sucess" });
});

/*
delete particular site data from user data based on user _id
Route           /delete
Description     add site data in user data based on _id
Access          PUBLIC
Parameters      NONE
Method          POST
Body            site _id, user _id
*/
Router.post("/delete", async (req, res) => {
  const userId = req.body.userId;
  const siteId = req.body.siteId;
  await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        data: { _id: siteId },
      },
    },
    function (error, _success) {
      if (error) return res.json({ status: "Failure" });
    }
  );
  return res.json({ status: "Sucess" });
});

module.exports = Router;
