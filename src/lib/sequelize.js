const Sequelize = require('sequelize')
const path = require('path')

const config = require(path.resolve(__dirname, '../config'))
const DBConfig = config.DB

const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    host: DBConfig.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
})

// const User = sequelize.define('user', {
//     username: Sequelize.STRING,
//     birthday: Sequelize.DATE,
// })

// sequelize.sync()
//     .then(() => User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     .then(jane => {
//         console.log(jane.toJSON())
//     })

sequelize.authenticate()
    .then(() => {
        console.log('MySQL connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

module.exports = sequelize