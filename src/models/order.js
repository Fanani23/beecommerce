const pool = require("../configs/db");

const createOrder = (data) => {
  const { id_product, id_users, total, amount, id_toko } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO transactions
            (id_product, total, id_users, amount, status, id_toko)
            VALUES ('${id_product}', '${total}', '${id_users}', '${amount}', '0', '${id_toko}')`,
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

const updateStatusOrder = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE transactions
            SET status = '1'
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

const updateStatusDeliver = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE transactions
            SET status = '2'
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

const updateStatusShipping = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE transactions
            SET status = '3'
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

const updateStatusDone = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE transactions
            SET status = '4'
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

const findStatus = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM transactions
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

const findToko = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM products
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

const getOrder = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
      product.category as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
      INNER JOIN products as product ON orders.id_product = product.id
      INNER JOIN users as users ON orders.id_users = users.id 
      WHERE orders.id_users = '${id}'`,
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

const getDetailOrder = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT orders.id, orders.status, orders.total, orders.amount, product.name as product_name, product.price as price, product.category as category, product.photo as photo, users.alamat as alamat, users.fullname as username
            FROM transactions as orders
            INNER JOIN products as product
            ON orders.id_product = product.id
            INNER JOIN users as users
            ON orders.id_users = users.id
            WHERE orders.id = '${id}'`,
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

const getOrderToko = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT orders.id, orders.status, orders.total, orders.amount, product.name as product_name, product.price as price, product.category as category, product.photo as photo, users.alamat as alamat, users.fullname as username
            FROM transactions as orders
            INNER JOIN products as product
            ON orders.id_product = product.id
            INNER JOIN users as users
            ON orders.id_users = users.id
            WHERE orders.id_toko = '${id}'`,
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
  createOrder,
  updateStatusOrder,
  updateStatusDeliver,
  updateStatusShipping,
  updateStatusDone,
  findStatus,
  findToko,
  getOrder,
  getDetailOrder,
  getOrderToko,
};
