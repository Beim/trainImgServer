const models = require('../model')

const datas = [
    {
        model: 'Project',
        data: [
            {
                name: 'qqimage',
                imgLocation: '/data/trainImgServer/qqimage',
            }
        ]
    },
    {
        model: 'FetchImageTask',
        data: [
            {
                fetchPath: `{ "id": 10147 }`,
                projectId: 1,
            }
        ]
    }
]

const resetDb = async () => {
    for (let item in models) {
        await models[item].sync({force: true})
    }
}

const insertData = async () => {
    for (let item of datas) {
        for (let data of item['data']) {
            await models[item['model']].create(data)
        }
    }
}

const initdb = async () => {
    await resetDb()
    await insertData()
}
initdb()


module.exports = {
    resetDb,
    insertData,
}