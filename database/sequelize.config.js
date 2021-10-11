require('dotenv/config')

module.exports = {
  test: {
    dialect: process.env.TEST_DB_DIALECT,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST
  },
}
