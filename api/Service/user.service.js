const User = require("../Modal/user.modal");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const securePasswordHandler = async (password) => {
  try {
    const securePassword = await bcrypt.hash(password, 10);
    return securePassword;
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.create = async (file, user) => {
  try {
    const existUser = await User.findOne({ email: user.email.trim() });

    if (existUser) {
      return {
        success: false,
        message: "User already exists",
        data: null,
      };
    }

    // http://localhost:8080/api/v1/user/profile-picture/user-1683742609681.png
    console.log("file",file);

    const protectPass = await securePasswordHandler(user.password);
    let uuidString = uuidv4();
    const info = new User({
      fullName: user.fullName,
      email: user.email,
      userId: uuidString,
      phoneNumber: user.phoneNumber,
      password: protectPass,
      dob: new Date(user.dob).toISOString(),
      userImg: `http://localhost:8080/api/v1/user/profile-picture/${file.filename}`,
    });

    const userData = await info.save();

    if (userData) {
      return {
        success: true,
        message: "User created successfully",
        data: userData,
      };
    } else {
      await User.findByIdAndDelete(userData.id);
      return {
        success: false,
        message: "Something_went_wrong",
        data: {},
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "ERROR_USER_",
      data: err.message,
    };
  }
};

exports.list = async (name) => {
  try {
    console.log("name", name);
    const response = name
      ? await User.find({
          $or: [{ fullName: { $regex: ".*" + name + ".*", $options: "i" } }],
        })
      : await User.find();

    console.log("resPonse", response);
    if (response) {
      return {
        success: true,
        message: "User Data found!",
        data: response,
      };
    } else {
      return {
        success: false,
        message: "User data not found!",
        data: response,
      };
    }
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
      message: err,
      data: null,
    };
  }
};


exports.findOne = async (id) => {
  try {
    const response = await User.findOne({
      userId: id
    });
    // const response = await User.find({
    //   userId: id
    // });
    console.log("response",response)
    if (response) {
      return {
        success: true,
        message: "SINGLE_DATA",
        data: response,
      };
    } else {
      return {
        success: false,
        message: "INVALID_ID",
        data: {},
      };
    }
  } catch (err) {
    console.log("inside userService catch", err);
    return {
      success: false,
      message: "unsuccessful",
      data: {},
    };
  }
};
