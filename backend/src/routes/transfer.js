import { UserModel } from '../models/BuyMe'

exports.GetTransferAccount = async (req, res) => {
    const { userId } = req.query
    // console.log(userId)
    let user = await UserModel.findOne({ user_id: userId })
    if (!user) {
        // console.log('not found')
        res.status(200).send({
            message: 'error',
            content: 'Cannot find user with this ID!',
        })
    } else {
        res.status(200).send({
            message: 'success',
            content: {
                name: user.name,
                id: user.user_id,
            },
        })
    }
}
