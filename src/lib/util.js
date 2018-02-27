const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

class Util {

    saveFile(imgStr, location) {
        let imgBuffer = Buffer.from(imgStr, 'base64')
        this.mkdirSync(path.dirname(location))
        fs.writeFileSync(location, imgBuffer)
        return true
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

    exec(cmd) {
        return new Promise((resolve, reject) => {
          let out = exec(cmd)
          let data = ''
          out.stdout.on('data', (v) => {
            data += v
          })
          out.on('exit', (code) => {
            if (code === 0) {
              resolve(data.trim())
            }
            else {
              resolve(-1)
            }
          })
        })
    }
}

module.exports = new Util()