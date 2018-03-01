const request = require('request')
const path = require('path')
const fs = require('fs')

const caffemodelPath = path.resolve(__dirname, 'QQ.png')

const formData = {
    caffemodel: fs.createReadStream(caffemodelPath)
}

request.post({
    url: 'http://localhost:8888/caffemodel/1',
    formData: formData
}, (err, httpResponse, body) => {
    if (err) {
        return console.error('upload failed:', err)
    }
    console.log('Upload successful!  Server responded with:', body)
})
