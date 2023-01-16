const pool = require("../configs/db");

const registerUser = (data) => {
  const { id, fullname, email, password, role, otp } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users
            (id, fullname, email, password, role, otp)
            VALUES
            ('${id}', '${fullname}', '${email}', '${password}', '${role}', '${otp}')`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users
            WHERE email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const verification = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
            SET verif = 1
            WHERE email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const changePassword = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
            SET password='${password}'
            WHERE email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateUser = (data) => {
  const { id, fullname, phone, alamat, photo } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
            SET fullname = '${fullname}', phone = '${phone}', alamat = '${alamat}', photo = '${photo}'
            WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  registerUser,
  findEmail,
  verification,
  changePassword,
  updateUser,
};
