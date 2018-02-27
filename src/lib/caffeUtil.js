const path = require('path')
const fs = require('fs')

const util = require('./util')

class CaffeUtil {

    async predict(modelPath, imagePath) {
        const predictPyScriptPath = path.resolve(__dirname, 'predict.py')
        const prototxtPath = path.resolve(__dirname, 'deploy.prototxt')
        const ret = await util.exec(`${predictPyScriptPath} ${prototxtPath} ${modelPath} ${imagePath}`)
        return ret
    }

}

module.exports = new CaffeUtil()