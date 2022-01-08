const path = require('path')
const router = require('express').Router()
const controllers = require(path.join(process.cwd(), '/controllers'))

router.post('/on', async (request, response) => {
    await controllers.ludela.doSetPowerOn().then(data => {
        response.status(200).json(data)
    }).catch(_ => {
        response.status(500).json({})
    })
})

router.post('/off', async (request, response) => {
    await controllers.ludela.doSetPowerOff().then(data => {
        response.status(200).json(data)
    }).catch(_ => {
        response.status(500).json({})
    })
})

router.get('/state', async (request, response) => {
    response.status(200).send(controllers.ludela.state.toString())
})

module.exports = router
