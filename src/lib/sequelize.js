const Sequelize = require('sequelize')
const path = require('path')

const config = require(path.resolve(__dirname, '../config'))
const DBConfig = config.DB

const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    host: DBConfig.host,
    port: DBConfig.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
})

sequelize.authenticate()
    .then(() => {
        console.log('MySQL connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

module.exports = sequelize