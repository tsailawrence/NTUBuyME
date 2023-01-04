import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import bodyParser from 'body-parser'
import http from 'http'
import wsConnect from './wsConnect'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
// app.use('/', routes);


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, PUT, DELETE, OPTIONS'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'NTUBuyMe',
    })
    .then((res) => {
        wss.on('connection', (ws) => {
            ws.box = ''
            ws.onmessage = wsConnect.onMessage(wss, ws)
            ws.on('error', (err) => {
                console.warn(`Client disconnected - reason: ${err}`)
            })
        })
    })

routes(app)
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

server.listen(8080, () => {
    console.log('listening on port 4000')
})
