import { ChatBoxModel, UserModel, TaskModel } from '../models/BuyMe'

exports.GetChat = async (req, res) => {
    const id = req.query.id
    const user = await UserModel.findOne({ user_id: id })
    const chatRooms = await ChatBoxModel.find({
        $or: [
            {
                sender: user,
            },
            {
                receiver: user,
            },
        ],
    }).populate('messages')
    res.send({ chatRooms: chatRooms })
}

exports.FulfillOrder = async (req, res) => {
    const senderID = req.body.senderID
    const receiverID = req.body.receiverID
    const userID = req.body.userID

    try {
        await TaskModel.findOneAndDelete({
            sender: senderID,
            receiver: receiverID,
        })
    } catch (e) {
        console.log(e)
    }

    const user = await UserModel.findOne({ user_id: userID })
    const chatRooms = await ChatBoxModel.find({
        $or: [
            {
                sender: user,
            },
            {
                receiver: user,
            },
        ],
    }).populate('messages')
    res.send({ chatRooms: chatRooms })
}
