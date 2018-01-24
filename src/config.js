const dev_config = {
    system: {
        server_port: '3000',
        db_type: 'mysql',
    },
    DB: {
        host: '119.29.160.85',
        port: 3306,
        username: 'root',
        password: '123123',
        database: 'trainimgsdev',
    },
}

const pro_config = {
    system: {
        server_port: '3000',
        db_type: 'mysql',
    },
    DB: {
        host: '119.29.160.85',
        port: 3306,
        username: 'root',
        password: '123123',
        database: 'trainimgs',
    },
}

const config = process.env.NODE_ENV === 'pro' ? pro_config : dev_config
module.exports = config

