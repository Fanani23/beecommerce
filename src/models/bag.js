const pool = require("../configs/db");

const createBag = (data) => {
  const { id_product, amount, id_users } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO bag
            (id_product, amount, id_users)
            VALUES ('${id_product}', '${amount}', '${id_users}')`,
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

const getBag = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT bag.id, bag.id_users, bag.id_product, bag.amount, item.name as product_name, item.price as price, item.photo as photo
            FROM bag as bag
            INNER JOIN products as item
            ON bag.id_product = item.id
            WHERE bag.id_users = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
          console.log(err);
        }
      }
    );
  });
};

const deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM bag
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

const deleteAllCart = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM bag
            WHERE id_users = '${id}'`,
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
  createBag,
  getBag,
  deleteCart,
  deleteAllCart,
};
