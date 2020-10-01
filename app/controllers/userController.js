const db = require("../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.updateById = (req, res) => {
  const id = req.params.id;
  User.findOne({
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

      User.update(dataUpdate, { where: { id: id } })
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

  User.destroy({ where: { id: id } })
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

  User.findByPk(id)
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: `Data with id ${id}, not found`,
        });
      } else {
        res.send({
          message: `Find by id ${id} successfully`,
          data: {
            id: data.id,
            username: data.username,
            email: data.email,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
      }
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
