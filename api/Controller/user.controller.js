const express = require("express");
const router = express.Router();
const multer = require("multer");
const userValidation = require("../validator/user.validator");
const userService = require("../Service/user.service");
const path = require("path");
const fs = require("fs");
const { verifyJWT } = require("../../helper/gaurd");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../../public/img/user"),
      function (error, success) {
        console.log("Err", error);
        if (error) {
          throw error;
        }
      }
    );
  },
  filename: function (req, file, cb) {
    cb(null, "user-" + Date.now() + ".png", function (error1, success) {
      console.log("Err1", error1);
      if (error1) {
        throw error1;
      }
    });
  },
});

const uploadImg = multer({ storage: storage });

router.post(
  "/register",
  uploadImg.single("userImg"),
  userValidation.register,
  async (req, res) => {
    try {
      let { success, message, data } = await userService.create(
        req.file,
        req.body
      );

      if (success) {
        return res.status(200).json({ success, message, data });
      } else {
        return res.status(400).json({ success, message, data });
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
);

router.get("/list",verifyJWT,async (req, res) => {
  try {
    const { search } = req.query;
    console.log("search",search);

    let { data, message, success } = await userService.list(search);

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/",verifyJWT,async (req, res) => {
  try {
    const { success, message, data } = await userService.findOne(
      req.user._id
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (err) {
    console.log("inside catch userController", err);
    return res.status(400).json({ message: err   });
  }
});

router.get("/profile-picture/:imageName",async(req,res)=>{
  res.sendFile(path.join(__dirname,`../../public/img/user/${req.params.imageName}`))
});

module.exports = router;
