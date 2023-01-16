const { response } = require("../helpers/common");
const {
  registerUser,
  findEmail,
  verification,
  changePassword,
  updateUser,
} = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const {
  generateToken,
  generateRefreshToken,
  decodeToken,
} = require("../helpers/auth");
const email = require("../middlewares/mailer");
const cloudinary = require("../configs/clouds");

const Port = process.env.PORT;
const Host = process.env.HOST;

const usersController = {
  register: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 400, false, "Email already use");
    }

    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      fullname: req.body.fullname,
      email: req.body.email,
      password,
      role: req.body.role,
      otp,
    };

    try {
      const result = await registerUser(data);
      if (result) {
        let verifyUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifyUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "Email not send") {
          return response(res, 400, false, null, "Register failed");
        } else {
          response(res, 200, true, { email: data.email }, "Register success");
        }
      }
    } catch (err) {
      response(res, 404, false, err, "Register failed");
    }
  },

  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, "Email not found");
    }

    if (users.otp == otp) {
      const result = await verification(req.body.email);
      return response(
        res,
        200,
        true,
        req.body.email,
        "Verification email success"
      );
    }

    return response(res, 400, false, null, "OTP invalid");
  },

  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, "Email not found");
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 400, false, null, "Invalid password");
    }

    if (users.verif == 0) {
      return response(res, 400, false, null, "Email not verified");
    }

    delete users.password;
    delete users.status;
    delete users.otp;
    let payload = {
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      role: users.role,
    };
    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    users.token = accessToken;
    users.refreshToken = refToken;
    response(res, 200, true, users, "Login success");
  },

  forgotPassword: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, "Email not found");
    }

    let payload = {
      email: req.body.email,
    };
    const token = generateToken(payload);

    let text = `Hello ${users.fullname} \n please click link below to reset password http://${Host}:${Port}/users/reset/${token}`;
    const subject = `Reset password`;
    let sendEmail = email(req.body.email, subject, text);
    if (sendEmail == "Email not send") {
      return response(res, 400, false, null, "Send email failed");
    }
    return response(res, 200, true, null, "Send email success");
  },

  resetPassword: async (req, res) => {
    const token = req.params.token;
    const decoded = decodeToken(token);
    const {
      rows: [users],
    } = await findEmail(decoded.email);
    if (!users) {
      return response(res, 404, false, null, "Token not found");
    }
    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result.body, "Change password success");
  },

  profile: async (req, res, next) => {
    const { email } = req.payload;
    console.log(email);
    try {
      const {
        rows: [users],
      } = await findEmail(email);

      if (users === undefined) {
        res.json({
          message: "Invalid token",
        });
        return;
      }
      delete users.password;
      delete users.otp;
      delete users.status;
      response(res, 200, true, users, "Get profile success");
    } catch (error) {
      console.log(error);
      response(res, 400, false, "Get profile failed");
    }
  },

  update: async (req, res, next) => {
    try {
      const { fullname, alamat, phone } = req.body;
      const { id } = req.payload;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const dataProfile = {
        id,
        fullname,
        alamat,
        phone,
        photo: image.url,
      };

      await updateUser(dataProfile);
      response(res, 200, true, dataProfile, "Update profile success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "Update profile failed");
    }
  },
};

exports.usersController = usersController;
