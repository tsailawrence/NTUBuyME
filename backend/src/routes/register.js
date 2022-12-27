import { UserModel } from '../models/BuyMe'

exports.UserRegister = async (req, res) => {
    const {
        user: { name, id, password, bankaccount },
    } = req.body

    const user = await UserModel.findOne({ user_id: id }).exec()

    if (!user) {
        const user = new UserModel({
            user_id: id,
            name: name,
            password: password,
            bankaccount: bankaccount,
        })
        await user.save()
        res.status(200).send({
            message: 'success',
            content: 'Account created!',
        })
    } else {
        res.send({
            message: 'error',
            content: 'User already exists!',
        })
    }
}
