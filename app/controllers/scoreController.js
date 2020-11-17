const db = require("../models");
const Model = db.score;
const Op = db.Sequelize.Op;

exports.addOne = (req, res) => {
  if (
    !req.body.score ||
    !req.body.lessonId ||
    !req.body.teacherId||
    !req.body.studentId
  ) {
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
  Model.findAll({
    include: ["lesson",  "student", "teacher"],
  })
    .then((data) => {
      res.send({
        message: "Find All successfully",
        data: data,
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

  Model.findByPk(id, {
    include: ["lesson",  "student", "teacher"],
  })
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
