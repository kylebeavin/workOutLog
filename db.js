const Sequelize = require('sequelize');
const sequelize = new Sequelize('workOutLog', 'postgres','killab513', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log('Connected to workOutLog postgres database.');
    },
    (err) => {
        console.log(err);
    }
);

module.exports = sequelize;