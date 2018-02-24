const fs = require('fs')
const path = require('path')

class Util {

    saveImg(imgStr, location) {
        let imgBuffer = Buffer.from(imgStr, 'base64')
        this.mkdirSync(path.dirname(location))
        fs.writeFileSync(location, imgBuffer)
        return 0
    }

    mkdirSync(dirpath) {
        if (!fs.existsSync(dirpath)) {
            let pathtmp = null
            dirpath.split(path.sep).filter(v => v).forEach((dirname) => {
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname)
                }
                else {
                    pathtmp = '/' + dirname
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false
                    }
                }
            })
        }
        return true
    }
}

module.exports = new Util()