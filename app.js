const app = require('express')()
const http = require('http')
const path = require('path')
const parser = require('body-parser')
const controllers = require(path.join(process.cwd(), '/controllers'))


app.use(parser.urlencoded({
    extended: true
}))

app.use(parser.json())

app.use('/', require(path.join(process.cwd(), '/routes')))

app.listen(3030, () => {
    console.log(`API RUNNING ON 3030`)
    controllers.ludela.doSetEightHour().then(data => {
        console.log('SET 8 HOUR TIMER')
    })
})
