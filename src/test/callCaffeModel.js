const fs = require('fs')
const path = require('path')
const http = require('http')
const querystring = require('querystring')

const buf = fs.readFileSync('./kankanbumai.png')
const postData = querystring.stringify({
    image: buf.toString('base64')
})

const options = {
    hostname: 'localhost',
    port: 20001,
    path: '/caffe/1',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

console.log(options)

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