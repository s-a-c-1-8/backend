const express = require("express");
const router = express.Router();

router.post("/get-list-data", controller.getProductList);

module.exports = router;
