
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('attendance_db', 'root', 'kawaii00', {
  host: 'localhost',   
  dialect: 'mariadb',
  logging: false       
});


sequelize.authenticate()
  .then(() => {
    console.log('Conexiunea la baza de date a reușit.');
  })
  .catch((err) => {
    console.error('Eroare la conectarea la baza de date:', err);
  });
module.exports = sequelize;