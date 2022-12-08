import { UserModel } from '../models/BuyMe'

exports.UserLogin = async (req, res) => {
    const { userId } = req.body

    const user = await UserModel.findOne({ user_id: userId })

    if (!user) {
        res.status(200).send({
            message: 'error',
            content: 'User does nor exist!',
        })
    } else {
        res.status(200).send({
            message: 'success',
            content: user.password,
        })
    }
}
