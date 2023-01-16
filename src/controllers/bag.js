const { response } = require("../helpers/common");
const {
  createBag,
  getBag,
  deleteCart,
  deleteAllCart,
} = require("../models/bag");

const bagController = {
  create: async (req, res, next) => {
    try {
      const id_users = req.payload.id;

      const { id_product, amount } = req.body;

      const data = {
        id_users,
        id_product,
        amount,
      };
      console.log(data);
      await createBag(data);
      response(res, 200, true, data, "Create bag success");
    } catch (err) {
      response(res, 400, false, err, "Create bag failed");
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.payload;
      console.log(id);
      const result = await getBag(id);
      response(res, 200, true, result.rows, "Get bag success");
    } catch (err) {
      response(res, 400, false, err, "Get bag failed");
    }
  },

  delete: async (req, res, next) => {
    try {
      await deleteCart(req.params.id);
      response(res, 200, true, null, "Delete cart success");
    } catch (err) {
      return response(res, 400, false, err, "Delete cart failed");
    }
  },

  deleteAll: async (req, res, next) => {
    try {
      const { id } = req.payload;
      await deleteAllCart(id);
      response(res, 200, true, null, "Delete all cart success");
    } catch (err) {
      return response(res, 400, false, err, "Delete all cart failed");
    }
  },
};

exports.bagController = bagController;
