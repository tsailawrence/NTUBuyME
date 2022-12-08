import { UserModel, TaskModel } from '../models/BuyMe'

exports.UserLogin = async (req, res) => {
    const { userId, password } = req.body

    const user = await UserModel.findOne({ user_id: userId })
    console.log(user)
    if (!user) {
        res.status(400).send({
            messge: 'error',
            content: 'User does nor exist!',
        })
    } else {
        if (user.user_id !== userId)
            res.status(400).send({
                message: 'error',
                content: 'Wrong password!',
            })
        else {
            res.status(200).send({
                message: 'success',
                content: 'Login successfully!',
            })
        }
    }
}
