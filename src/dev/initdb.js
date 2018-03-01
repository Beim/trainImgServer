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
            },
            {
                fetchPath: `{ "id": 10148 }`,
                projectId: 1,
            },
        ]
    },
    {
        model: 'Image',
        data: [
            {
                label: '10147-未识别',
                labelNo: 0,
                projectId: 1,
                fetchImageTaskId: 0,
            },
            {
                label: '10147-看看不买',
                labelNo: 1,
                projectId: 1,
                fetchImageTaskId: 1,
            },
            {
                label: '10147-良心卖家',
                labelNo: 2,
                projectId: 1,
                fetchImageTaskId: 2,
            },
            {
                label: '10147-清购物车',
                labelNo: 3,
                projectId: 1,
                fetchImageTaskId: 3,
            },
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