const db = require("../models");
const Model = db.teacher;
const Op = db.Sequelize.Op;

exports.addOne = (req, res) => {
  if (!req.body.name || !req.body.gender || !req.body.address) {
    res.status(400).send({
      message: "Data cannot be empty!",
    });
    return null;
  }

  Model.create(req.body)
    .then((data) => {
      res.send({
        message: "Create successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;
  let offset = 0;
  if (currentPage == 1) {
    offset = 0;
  } else if (currentPage == 2) {
    offset = perPage;
  } else {
    offset = currentPage * perPage - perPage;
  }

  let nip = req.query.nip;
  let name = req.query.name;
  let gender = req.query.gender;
  let address = req.query.address;

  nip = nip ? { nip: { [Op.like]: `%${nip}%` } } : null;
  name = name ? { name: { [Op.like]: `%${name}%` } } : null;
  gender = gender ? { gender: { [Op.like]: `%${gender}%` } } : null;
  address = address ? { address: { [Op.like]: `%${address}%` } } : null;

  Model.findAndCountAll({
    limit: parseInt(perPage),
    offset: offset,
    where: nip || name || gender || address,
  })
    .then((data) => {
      res.send({
        message: "Find All successfully",
        data: data.rows,
        total_data: data.count,
        data_perPage: perPage,
        current_page: currentPage,
        total_page:
          Math.ceil(data.count / perPage) == 0
            ? currentPage
            : Math.ceil(data.count / perPage),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: `Data with id ${id}, not found`,
        });
      } else {
        res.send({
          message: `Find by id ${id} successfully`,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updateById = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Update id ${id} successfully`,
        });
      } else {
        res.status(404).send({
          message: `Data with id ${id}, not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;

  Model.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Delete id ${id} successfully`,
        });
      } else {
        res.status(404).send({
          message: `Data with id ${id}, not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
