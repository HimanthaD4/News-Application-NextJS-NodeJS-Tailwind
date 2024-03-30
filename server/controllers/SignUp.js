const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const Admin = require("../models/Admin");

const saltRounds = 10;

const validateSignupData = async (req, res) => {
  const { name, email, password } = req.body;

  if (name.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Name" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please Enter password" });
    return false;
  } else if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length is 6 characters" });
    return false;
  }

  // check if email exists in DB!
  const existingAdmin = await Admin.findOne({ email: email }).exec();
  if (existingAdmin) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Validate Inputs
  const isValid = await validateSignupData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const admin = await Admin.create({ name, email, password: hashedPassword }); // Fixed line
  
      return res.json({
        message: "Account Created Successfully",
        admin: { _id: admin._id, name: admin.name, email: admin.email }, // Also ensure this matches the fixed variable
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  }
};
