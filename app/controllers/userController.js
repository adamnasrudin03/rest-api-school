const db = require("../models");
const Model = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.updateById = (req, res) => {
  const id = req.params.id;
  Model.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }

      const dataUpdate = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.newPassword, 8),
      };

      Model.update(dataUpdate, { where: { id: id } })
        .then((data) => {
          if (data == 1) {
            res.send({
              message: `Update user by id is  ${id}, successfully`,
            });
          } else {
            res.status(404).send({
              message: `Data by id is  ${id}, not found`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteById = (req, res) => {
  const id = req.params.id;

  Model.destroy({ where: { id: id } })
    .then((num) => {
      console.log("num : ", num);
      if (num == 1) {
        res.send({
          message: `Delete id ${id} successfully`,
        });
      } else {
        res.status(404).send({
          message: `data with id ${id}, not found`,
        });
      }
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
        var authorities = [];
        data.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.send({
            message: `Find by id ${id} successfully`,
            data: {
              id: data.id,
              username: data.username,
              email: data.email,
              roles: authorities,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            },
          });
        });
      }
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

  let username = req.query.username;
  let email = req.query.email;
  username = username ? { username: { [Op.like]: `%${username}%` } } : null;
  email = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Model.findAndCountAll({
    limit: parseInt(perPage),
    offset: offset,
    where: username || email,
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

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
