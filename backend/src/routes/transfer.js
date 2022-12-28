import { UserModel } from '../models/BuyMe'

exports.GetTransferAccount = async (req, res) => {
    const { userId } = req.query
    // console.log(userId)
    let user = await UserModel.findOne({ user_id: userId })
    if (!user) {
        console.log('not found')
        // throw new Error('User ID not found!')
    }
    res.send({ data: user })
}
