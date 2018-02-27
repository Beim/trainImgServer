const fs = require('fs')
const path = require('path')
const http = require('http')
const querystring = require('querystring')

const buf = fs.readFileSync('./QQ.png')
const postData = querystring.stringify({
    image: buf.toString('base64')
})

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/caffe/1',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', c => {
        console.log(`BODY: ${c}`)
    })
    res.on('end', () => {
        console.log('end')
    })
})

req.write(postData)
req.end()