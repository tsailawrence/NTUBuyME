import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema(
    {
        user_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
        bankaccount: {
            bank_id: { type: String },
            bankaccount_id: { type: String },
        },
    },
    { timestamps: true }
)

const UserModel = mongoose.model('User', UserSchema)

const TaskSchema = Schema(
    {
        sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        receiver: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
<<<<<<< HEAD
=======
            required: false,
>>>>>>> 7c7bae093942a371bd1d7a0892cd14bc4dc0a5a7
        },

        created_at: { type: Date, required: true },
        title: { type: String, required: true },
        restaurantName: { type: String, required: true },
        taskContent: { type: String, required: true },
        due_start: { type: Date, required: true },
        due_end: { type: Date, required: true },
        fee: { type: Number, required: true },
<<<<<<< HEAD
        status: { type: String, required: true },
=======
        status: { type: String, required: true }, // 'open', 'accepted', 'completed'
>>>>>>> 7c7bae093942a371bd1d7a0892cd14bc4dc0a5a7
    },
    { timestamps: true }
)

const TaskModel = mongoose.model('Task', TaskSchema)

export { UserModel, TaskModel }
