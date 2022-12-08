import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
})

const UserModel = mongoose.model('User', UserSchema)

const TaskSchema = Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    fee: { type: Number, required: true },
    items: { type: String, required: true },
    note: { type: String, required: true },
    created_at: { type: Date, required: true },
})

const TaskModel = mongoose.model('Task', TaskSchema)

export { UserModel, TaskModel }
