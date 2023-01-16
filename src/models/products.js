const pool = require("../configs/db");

const createProduct = (data) => {
  const { name, stock, price, category, photo, description, id_toko } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO products
            (name, stock, price, category, photo, status, description, id_toko)
            VALUES ('${name}', '${stock}', '${price}', '${category}','${photo}', '1', '${description}', '${id_toko}')`,
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

const getProduct = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status, products.stock
            FROM products as products
            WHERE products.status = '1'
            AND products.stock != '0'
            AND products.name
            ILIKE ('%${search}%')
            ORDER BY products.${sortBy} ${sortOrder}
            LIMIT ${limit}
            OFFSET ${offset}`,
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

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status, products.stock, products.description
            FROM products as products
            WHERE products.id = '${id}'`,
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
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status
            FROM products as products
            WHERE products.id = '${id}'`,
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

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM products
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

const getBySeller = ({ search, sortBy, sortOrder, limit, offset, id }) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status
            FROM products as products
            WHERE products.status = '1'
            AND products.name
            ILIKE ('%${search}%')
            AND products.id_toko = '${id}'
            ORDER BY products.${sortBy} ${sortOrder}
            LIMIT ${limit}
            OFFSET ${offset}`,
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

const getBySold = ({ search, sortBy, sortOrder, limit, offset, id }) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status, products.stock
            FROM products as products
            WHERE products.stock = '0'
            AND products.name
            ILIKE ('%${search}%')
            AND products.id_toko = '${id}'
            ORDER BY products.${sortBy} ${sortOrder}
            LIMIT ${limit}
            OFFSET ${offset}`,
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

const getProductArchive = ({
  search,
  sortBy,
  sortOrder,
  limit,
  offset,
  id,
}) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.id, products.category, products.name, products.price, products.photo, products.status, products.stock
            FROM products as products
            WHERE products.status = '0'
            AND products.name
            ILIKE ('%${search}%')
            AND products.id_toko = '${id}'
            ORDER BY products.${sortBy} ${sortOrder}
            LIMIT ${limit}
            OFFSET ${offset}`,
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

const updateProduct = (data) => {
  const { id, product_name, stock, price, category, photo } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE products
            SET name = '${product_name}', stock = '${stock}', price = '${price}', category = '${category}', photo = '${photo}'
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

const archiveProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE products
            SET status = '0'
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

const activateProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE products
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

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  archiveProduct,
  activateProduct,
  getBySeller,
  getProductArchive,
  findStatus,
  getBySold,
};
