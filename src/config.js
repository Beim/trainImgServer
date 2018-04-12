const dev_config = {
    system: {
        server_port: '8888',
        db_type: 'mysql',
        storagePath: '/data/trainImgServer',
    },
    DB: {
        host: '118.126.113.33',
        port: 3306,
        username: 'root',
        password: '123123',
        database: 'trainimgsdev',
    },
}

const pro_config = {
    system: {
        server_port: '8888',
        db_type: 'mysql',
        storagePath: '/data/trainImgServer',
    },
    DB: {
        host: '118.126.113.33',
        port: 3306,
        username: 'root',
        password: '123123',
        database: 'trainimgs',
    },
}

console.log('NODE_ENV = ', process.env.NODE_ENV)
const config = process.env.NODE_ENV === 'pro' ? pro_config : dev_config
module.exports = config

