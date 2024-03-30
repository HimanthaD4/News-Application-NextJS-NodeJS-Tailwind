const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // check if email exists in DB!
  const dbAdmin = await Admin.findOne({ email: email }).exec();
  if (dbAdmin) {
    const match = await bcrypt.compare(password, dbAdmin.password);

    if (match) {
      const token = jwt.sign(
        { _id: dbAdmin._id, name: dbAdmin.name, email },
        process.env.JWT_LOGIN_TOKEN,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
    }
  } else {
    res.status(400).json({ message: "Username or Password incorrect" });
  }
};
