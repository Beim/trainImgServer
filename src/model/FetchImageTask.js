const path = require('path')
const Sequelize = require('sequelize')

const sequelize = require(path.resolve(__dirname, '../lib/sequelize'))

const FetchImageTask = sequelize.define('fetchimagetask', {
    fetchPath: {
        type: Sequelize.TEXT,  // {"id": 10147}
        allowNull: false,
    },
    isFetched: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

// QQImage.sync({ force: true })

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