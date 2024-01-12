const manager = require("../manager/manager");

let creatUser = async (req, res, next) => {
  return manager
    .creatProducts(req)
    .then((data) => {
      let result = {
        status: 200,
        data: data,
        allProducts: data.totalData,
        duplicates: data.duplicate,
        newData: data.newData,
      };
      return res.json(result);
    })
    .catch(next);
};
