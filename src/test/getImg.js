const fs = require('fs')
const path = require('path')
const http = require('http')

const url = 'http://localhost:3000/image/raw?projectId=1&&labelNo=1&&imgname=1519462045983'

http.get(url, (res) => {
    let data = ''
    res.setEncoding('utf8')
    res.on('data', chunk => {
        data = data + chunk
    })
    res.on('end', () => {
        data = JSON.parse(data)
        let imgBuffer = Buffer.from(data['data'], 'base64')
        fs.writeFileSync('./qq2.png', imgBuffer)
        console.log('done')
    })
}).on('error', e => {
    console.log(`Got error: ${e.message}`)
})
