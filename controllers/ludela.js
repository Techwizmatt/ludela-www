const { exec } = require('child_process')
lirc_node = require('lirc_node')
lirc_node.init()

const ludela = {
    timeout: null,
    state: 0,
    doSetEightHour: async function () {
        return new Promise((resolve, reject) => {
            this._doIrSend("BTN_8").then(_ => {
                resolve()
            })
        })
    },
    doSetPowerOn: async function () {
        return new Promise((resolve, reject) => {
            this._doIrSend("KEY_POWER").then(_ => {
                resolve()
                this.state = 1
                this._clearTimeout()
                this.timeout = setTimeout(() => {
                    this.doSetPowerOff()
                }, 28800 * 1000) // 8 Hours
            })
        })
    },
    doSetPowerOff: async function () {
        return new Promise((resolve, reject) => {
            this._doIrSend("KEY_PAUSE").then(_ => {
                resolve()
                this.state = 0
                this._clearTimeout()
            })
        })
    },
    _clearTimeout: function () {
        try {
            clearTimeout(this.timeout)
        } catch (e) {
            console.log('No timeout necassary')
        }
    },
    _doIrSend: async function (command) {
        return new Promise((resolve, reject) => {
            const promises = []

            for (let i = 0; i < 10; i++) {
                promises.push(new Promise((done) => {
                    lirc_node.irsend.send_once("ludela", command, setTimeout(function () {
                        console.log(`SENT COMMAND ${command}`)
                        resolve()
                    }, 1000))
                }))
            }

            Promise.all(promises).then(_ => {
                resolve()
            })
        })
    }
}

module.exports = ludela
