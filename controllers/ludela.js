const { exec } = require('child_process')

const ludela = {
    state: 0,
    doSetEightHour: async function () {
        return this._doSendCommand('BTN_8')
    },
    doSetPowerOn: async function () {
        return new Promise((resolve, reject) => {
            this._doSendCommand('KEY_POWER').then(_ => {
                ludela.state = 1
                resolve()
            }).catch(_ => {
              reject(new Error())
            })
        })
    },
    doSetPowerOff: async function () {
        return new Promise((resolve, reject) => {
            this._doSendCommand('KEY_PAUSE').then(_ => {
                ludela.state = 0
                resolve()
            }).catch(_ => {
                reject(new Error())
            })
        })
    },
    _doSendCommand: function (command) {
        return new Promise((resolve, reject) => {
            console.log(`EXECUTING ${command}`)
            exec(`irsend SEND_ONCE ludela ${command}`, (err, stdout) => {
                console.log(stdout)
                if (err) {
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = ludela
