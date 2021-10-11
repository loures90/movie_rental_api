module.exports = {
    username: 'process.env.DB_USER',
    password: 'process.env.DB_PASSWORD',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
};