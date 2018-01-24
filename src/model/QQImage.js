const path = require('path')
const Sequelize = require('sequelize')

const sequelize = require(path.resolve(__dirname, '../lib/sequelize'))

const QQImage = sequelize.define('qqimage', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imgLocation: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isTrained: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    fetchPath: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
})

QQImage.sync({ force: true })

// User.sync().then(() => {
//     return User.create({
//         firstName: 'John123123',
//         lastName: 'Hancock321312',
//         label: 0,
//     })
// })

// User.findAll().then(users => {
//     console.log(users.length)
//     users[0].destroy()
// })

module.exports = QQImage