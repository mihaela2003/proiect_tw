const express = require("express");
const router = require("./routes");
const cors = require("cors");
//const connection = require("./models").connection;
// In loc de "const connection = require('./models').connection;"
const { sequelize } = require('./models');
const PORT = 5001;
const app = express();


app.use(express.json());
// app.use(cors());


app.use(
  cors({
      origin: ["http://localhost:3000"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
      credentials: true,
      enablePreflight: true
  })
);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/reset", (req, res) => {
  connection
    .sync({ force: true })
    .then(() => {
      res.status(200).send({ message: "Database reset completed!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Database reset failed!" });
    });
});


app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});
// app.js (sau server.js)

//const express = require('express');
//const { sequelize } = require('./models'); // importăm sequelize din index.js
// Mai importă routere, etc.

// Facem sincronizarea cu baza de date (crează tabelele dacă nu există):
sequelize.sync({ force: false }) // force: true rescrie tabelele
  .then(() => {
    console.log('Tabelele au fost sincronizate cu succes.');
  })
  .catch(err => {
    console.error('Eroare la sincronizarea cu baza de date:', err);
  });

// restul codului pentru server
