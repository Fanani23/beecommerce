const { response } = require("../helpers/common");
const {
  createOrder,
  getDetailOrder,
  getOrder,
  getOrderToko,
  updateStatusDeliver,
  updateStatusOrder,
  updateStatusDone,
  updateStatusShipping,
  findToko,
  findStatus,
} = require("../models/order");
const { getBySeller } = require("../models/products");

const orderController = {
  create: async (req, res, next) => {
    try {
      const id_users = req.payload.id;

      const { id_product, total, amount } = req.body;
      const {
        rows: [toko],
      } = await findToko(id_product);

      const id_toko = toko.id_toko;
      const data = {
        id_users,
        total,
        id_product,
        amount,
        id_toko,
      };
      console.log(data);
      await createOrder(data);
      response(res, 200, true, data, "Order success");
    } catch (err) {
      response(res, 400, false, err, "Order failed");
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getDetailOrder(id);
      response(res, 200, true, result.rows, "Get success");
    } catch (err) {
      response(res, 400, false, err, "Get failed");
      console.log(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const result = await getOrder(id);
      response(res, 200, true, result.rows, "Get success");
    } catch (err) {
      response(res, 400, false, err, "Get failed");
      console.log(err);
    }
  },

  getBySeller: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const result = await getOrderToko(id);
      response(res, 200, true, result.rows, "Get success");
    } catch (err) {
      response(res, 400, false, err, "Get failed");
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        rows: [order],
      } = await findStatus(id);
      const status = order.status;
      if (status === 0) {
        await updateStatusOrder(id);
        response(res, 200, true, [], "Payment done");
      } else if (status === 1) {
        await updateStatusDeliver(id);
        response(res, 200, true, [], "Order delivered");
      } else if (status === 2) {
        await updateStatusShipping(id);
        response(res, 200, true, [], "Order send");
      } else {
        await updateStatusDone(id);
        response(res, 200, true, [], "Order done");
      }
    } catch (err) {
      response(res, 400, false, err, "Order failed");
    }
  },
};

exports.orderController = orderController;
