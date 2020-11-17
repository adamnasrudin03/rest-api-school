const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./app/models");
const Role = database.role;
const Lesson = database.lesson;
const Student = database.student;
const Teacher = database.teacher;
const User = database.user;
const Op = database.Sequelize.Op;
const { authJwt } = require("./app/middlewares");

const studentRouter = require("./app/routers/studentRouter");
const teacherRouter = require("./app/routers/teacherRouter");
const lessonRouter = require("./app/routers/lessonRouter");
const scoreRouter = require("./app/routers/scoreRouter");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Generated database
database.sequelize.sync().then(() => {
  console.log(" re-sync db.");
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}

function addDatabase() {
  User.create({
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: "$2a$08$gGyG1DOLtqElFIydO/dmGuAd.IPj.J8Xz.xTsXmkg7ub/V2tCs88.",
    roles: ["admin"],
  }).then((user) => {
      Role.findAll({
        where: {
          name: {
            [Op.or]:  ["admin"],
          },
        },
      }).then((roles) => {
        user.setRoles(roles).then(() => {
          console.log("admin was registered successfully!");
        });
      });
    
  });
  User.create({
    id: 2,
    username: "user",
    email: "user@gmail.com",
    password: "$2a$08$gGyG1DOLtqElFIydO/dmGuAd.IPj.J8Xz.xTsXmkg7ub/V2tCs88.",
    roles: ["user"],
  }).then((user) => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ["user"],
        },
      },
    }).then((roles) => {
      user.setRoles(roles).then(() => {
        console.log("User was registered successfully!");
      });
    });
  
});

  Lesson.create({
    id: 1,
    kodeLesson: "MK001",
    name: "IPA",
    total_chapter: 35,
    description: "Ilmu Pengetahuan Alam",
  });
  Lesson.create({
    id: 2,
    kodeLesson: "MK002",
    name: "IPS",
    total_chapter: 35,
    description: "Ilmu Pengetahuan Sosial",
  });
  Lesson.create({
    id: 3,
    kodeLesson: "MK003",
    name: "MTK",
    total_chapter: 50,
    description: "Matematika",
  });
  Lesson.create({
    id: 4,
    kodeLesson: "MK004",
    name: "Bahasa Inggris",
    total_chapter: 30,
    description: "ilmu bahas inggris",
  });
  Lesson.create({
    id: 5,
    kodeLesson: "MK005",
    name: "Bahasa Indonesia",
    total_chapter: 30,
    description: "ilmu bahas Indonesia",
  });
  Lesson.create({
    id: 6,
    kodeLesson: "MK006",
    name: "Penjaskes",
    total_chapter: 65,
    description: "Pendidikan Jasmani dan kesehatan",
  });

  Student.create({
    id: 1,
    npm: "18171065001",
    name: "Cewek 1",
    gender: "Perempuan",
    class: "k1",
    address: "Jl. Masa kini , Kota Bogor",
  });
  Student.create({
    id: 2,
    npm: "18171065002",
    name: "Cowok 1",
    gender: "Laki-laki",
    class: "k1",
    address: "Jl. Masa depan , Kota bekasi",
  });
  Student.create({
    id: 3,
    npm: "18171065003",
    name: "Cowok 2",
    gender: "Laki-laki",
    class: "k1",
    address: "Jl. Masa masa indah , Kota bekasi",
  });
  Student.create({
    id: 4,
    npm: "18171065004",
    name: "Cewek 2",
    gender: "Perempuan",
    class: "k2",
    address: "Jl. Masa depan , Kota tanggerang",
  });
  Student.create({
    id: 5,
    npm: "18171065005",
    name: "Cewek 3",
    gender: "Perempuan",
    class: "k1",
    address: "Jl. Masa sih , Kota jakarta",
  });
  Student.create({
    id: 6,
    npm: "18171065006",
    name: "Cowok 3",
    gender: "Laki-laki",
    class: "k2",
    address: "Jl. Masa hari tua , Kota bekasi",
  });
  Student.create({
    id: 7,
    npm: "18171065007",
    name: "Cowok 4",
    gender: "Laki-laki",
    class: "k1",
    address: "Jl. Masa masa remaja , Kota bekasi",
  });

  Teacher.create({
    id: 1,
    nip: "20171065001",
    name: "Guru cowok 1",
    gender: "Laki-laki",
    address: "Jl. universitas indonesia , Kota bekasi",
  });
  Teacher.create({
    id: 2,
    nip: "20171065002",
    name: "Guru cewek 2",
    gender: "Perempuan",
    address: "Jl. universitas negeri jakarta , Kota bogor",
  });
  Teacher.create({
    id: 3,
    nip: "20171065003",
    name: "Guru  cewek 1",
    gender: "Perempuan",
    address: "Jl. universitas veteran jakarta , Kota bogor",
  });
}

// activate the function below to add data automatically
// database.sequelize
//   .sync({ force: true })
//   .then(() => {
//     initial();
//     addDatabase();
//     console.log("Drop and re-sync db successfully");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//routes
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/lessons", lessonRouter);
app.use("/assessments", scoreRouter);

require("./app/routers/authRouter")(app);
require("./app/routers/userRouter")(app);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  next();
});

app.use([authJwt.verifyToken], function (req, res, next) {
  res.status(404).send({
    message: "Unable to find the requested resource!",
  });
});
