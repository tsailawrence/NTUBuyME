import { ChatBoxModel, MessageModel, UserModel } from './models/BuyMe'

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws)
}

const sendMessage = (ws, data, status) => {
    sendData(data, ws)
    sendStatus(status, ws)
}

const makeName = (name, to) => {
    return [name, to].sort().join('_')
}

const chatBoxex = {} // chatBoxex[chatBoxName] = ws

export default {
    onMessage: (wss, ws) => async (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case 'MESSAGE': {
                const { who, body, name } = payload
                ws.box = name
                const message = new MessageModel({ who, body })
                try {
                    await message.save()
                } catch (e) {
                    throw new Error('Message DB server error: ' + e)
                }
                const chatBox = await ChatBoxModel.findOne({
                    name: name,
                })

                chatBox.messages = [...chatBox.messages, message]
                await chatBox.save()

                console.log(chatBoxex[ws.box])

                chatBoxex[ws.box].forEach((ws) =>
                    sendData(['message', { name: who, body }], ws)
                )
                break
            }

            case 'CHAT': {
                const { name } = payload
                ws.box = name
                if (!chatBoxex[ws.box]) {
                    chatBoxex[ws.box] = [ws]
                } else if (!chatBoxex[ws.box].includes(ws)) {
                    chatBoxex[ws.box].push(ws)
                }
                console.log(chatBoxex[ws.box])
                break
            }
        }
    },
}
