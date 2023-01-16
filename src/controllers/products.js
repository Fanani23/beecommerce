const { response } = require("../helpers/common");
const {
  createProduct,
  getProduct,
  getBySeller,
  updateProduct,
  deleteProduct,
  archiveProduct,
  activateProduct,
  getProductArchive,
  getProductById,
  findStatus,
  getBySold,
} = require("../models/products");
const cloudinary = require("../configs/clouds");

const productController = {
  create: async (req, res, next) => {
    try {
      const { stock, price, description, name, category } = req.body;
      const id_toko = req.payload.id;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const data = {
        stock,
        price,
        name,
        category,
        photo: image.url,
        description,
        id_toko,
      };
      console.log(data);
      await createProduct(data);
      return response(res, 200, true, data, "Create product success");
    } catch (err) {
      return response(res, 400, false, err, "Create product failed");
    }
  },

  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const result = await getProduct({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(res, 200, true, result.rows, "Get product success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Get products failed");
    }
  },

  getSeller: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { id } = req.payload;
      const result = await getBySeller({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        id,
      });
      response(res, 200, true, result.rows, "Get products success");
    } catch (error) {
      console.log(error);
      response(res, 400, false, null, "Get products failed");
    }
  },

  getArchive: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { id } = req.payload;
      const result = await getProductArchive({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        id,
      });
      response(res, 200, true, result.rows, "Get products success");
    } catch (error) {
      console.log(error);
      response(res, 400, false, null, "Get products failed");
    }
  },

  getSold: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;

      const { id } = req.payload;
      const result = await getBySold({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
        id,
      });
      response(res, 200, true, result.rows, "Get products success");
    } catch (error) {
      console.log(error);
      response(res, 400, false, null, "Get products failed");
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const data = {
        id,
        stock: req.body.stock,
        price: req.body.price,
        product_name: req.body.product_name,
        category: req.body.category,
        photo: image.url,
      };

      await updateProduct(data);
      response(res, 200, true, data, "Update product success");
    } catch (error) {
      console.log(error);
      response(res, 400, false, "Update product failed");
    }
  },

  delete: async (req, res, next) => {
    try {
      await deleteProduct(req.params.id);
      response(res, 200, true, null, "Delete product success");
    } catch (err) {
      return response(res, 400, false, err, "Delete product failed");
    }
  },

  getById: async (req, res, next) => {
    try {
      const result = await getProductById(req.params.id);
      response(res, 200, true, result.rows, "Delete product success");
    } catch (err) {
      return response(res, 400, false, err, "Delete product failed");
    }
  },

  archive: async (req, res, next) => {
    try {
      await archiveProduct(req.params.id);
      response(res, 200, true, null, "Archive product success");
    } catch (err) {
      return response(res, 400, false, err, "Archive product failed");
    }
  },

  activate: async (req, res, next) => {
    try {
      await activate(req.params.id);
      response(res, 200, true, null, "Activate product success");
    } catch (err) {
      return response(res, 400, false, err, "Activate product failed");
    }
  },
};

exports.productController = productController;
