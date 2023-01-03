import { ChatBoxModel, MessageModel, UserModel } from './models/BuyMe'

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data))
}

const chatBoxes = {} // chatBoxes[chatBoxName] = ws

export default {
    onMessage: (wss, ws) => async (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case 'MESSAGE': {
                const { who, body, name } = payload
                const message = new MessageModel({ sender: who, body })
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

                chatBoxes[ws.box].forEach((ws) =>
                    sendData(['message', { sender: who, body }], ws)
                )
                break
            }

            case 'CHAT': {
                const { name } = payload
                ws.box = name
                if (!chatBoxes[ws.box]) {
                    chatBoxes[ws.box] = [ws]
                } else if (!chatBoxes[ws.box].includes(ws)) {
                    chatBoxes[ws.box].push(ws)
                }
                break
            }
        }
    },
}