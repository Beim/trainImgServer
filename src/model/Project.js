const path = require('path')
const Sequelize = require('sequelize')

const sequelize = require(path.resolve(__dirname, '../lib/sequelize'))

const Project = sequelize.define('project', {
    name: {
        type: Sequelize.STRING, // 'qqimage'
        allowNull: true,
        unique: true,
    },
    imgLocation: {
        type: Sequelize.STRING, // /data/trainimg/qqimage
        allowNull: true,
        unique: true,
    },
})

Project.sync({force: true})

module.exports = Project