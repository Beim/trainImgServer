const path = require('path')
const Sequelize = require('sequelize')

const sequelize = require(path.resolve(__dirname, '../lib/sequelize'))

const Image = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: Sequelize.STRING, // "10147-鬼脸"
        allowNull: false,
        unique: true,
    },
    projectId: {
        type: Sequelize.INTEGER, // foreign key
        allowNull: false,
    },
    fetchImageTaskId: {
        type: Sequelize.INTEGER, // foreign key
        allowNulL: false,
    },
    isTrained: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
})

Image.sync({ force: true })

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

module.exports = Image