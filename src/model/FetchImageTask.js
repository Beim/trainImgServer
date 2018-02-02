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
    },
    projectId: {
        type: Sequelize.INTEGER, // foreign key
        allowNull: false,
        reference: {
            model: 'project',
            key: 'id',
        }
    }
})

// FetchImageTask.sync( {force: true} )

module.exports = FetchImageTask