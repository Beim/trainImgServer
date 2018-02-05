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
    labelNo: {
        type: Sequelize.INTEGER, // 0 / 1 / 2 / 3
        allowNull: false,
    },
    projectId: {
        type: Sequelize.INTEGER, // foreign key
        allowNull: false,
        reference: {
            model: 'project',
            key: 'id',
        }
    },
    fetchImageTaskId: {
        type: Sequelize.INTEGER, // foreign key
        allowNull: false,
        reference: {
            model: 'fetchimagetask',
            key: 'id',
        }
    },
    isTrained: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
})

module.exports = Image