import { ChatBoxModel, UserModel } from '../models/BuyMe'

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
    })
        .populate('messages')
        .select([
            'title',
            'messages',
            'description',
            'sender',
            'receiver',
            'name',
        ])
    res.send({ chatRooms: chatRooms })
}
