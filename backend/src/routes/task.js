import { TaskModel } from '../models/BuyMe'
import { UserModel } from '../models/BuyMe'

exports.FilterTasksByDueStart = async (req, res) => {
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN
    const allTasks = await TaskModel.find({ status: 'open' }) //status: 'open'
        .sort({ due_start: 1 })
        .limit(maxPageN * nPerPage)

    res.send({ allTasks })
}

exports.FilterTasksByFee = async (req, res) => {
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const allTasks = await TaskModel.find({ status: 'open' })
        .sort({ fee: -1 })
        .limit(maxPageN * nPerPage)

    res.send({ allTasks })
}

exports.DeleteAllTasks = async (_, res) => {
    await TaskModel.deleteMany({})
    res.send({ success: true })
}

exports.GetTaskNum = async (_, res) => {
    const offset = new Date(Date.now())
    const DayRange = 2
    offset.setDate(offset.getDate() - DayRange)
    console.log(offset)
    const taskNum = await TaskModel.find({
        status: 'open',
        created_at: { $gt: offset },
    }).count()
    console.log(taskNum)
    res.send({ taskNum })
}

exports.AddDummyTasks = async (_, res) => {
    const person = await UserModel.findOne({ user_id: 'R11725051' })
    const D = new Date(Date.now())

    for (let i = 0; i < 1; i++) {
        const t = new TaskModel({
            sender: person,
            created_at: new Date(Date.now()),
            title: 'Dummy',
            restaurantName: 'Dummy Restaurant',
            taskContent: 'Dummy Task',
            due_start: D.setDate(D.getDate() - 4),
            due_end: new Date(Date.now()),
            fee: 10000,
            status: 'open',
        })
        await t.save()
    }

    res.send({ success: true })
}

exports.GetMyAddedTasks = async (req, res) => {
    const currentPage = req.query.currentPage
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const myUserModel = await UserModel.findOne({ user_id: req.query.me })
    // console.log(req.query.me)
    /*
    const model = await new TaskModel({sender: myUserModel,
        created_at: '2022-11-10T16:00:00.000+00:00',
        title: 'task10',
        restaurantName: 'MissEnergy',
        taskContent: 'content',
        due_start: '2022-12-10T16:00:00.000+00:00',
        due_end: '2022-12-10T16:00:00.000+00:00',
        fee: 50 ,
        status: 'completed',}).save()*/
    const myTasks = await TaskModel.find({
        sender: myUserModel,
        status: { $in: ['accepted', 'completed'] },
    }) //
        .sort({ status: 1, due_end: 1 })
    // .limit( maxPageN*nPerPage+1 )
    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = myTasks.length === maxPageN * nPerPage + 1
    res.send({ myTasks, taskOverload })
}

exports.GetMyAcceptedTasks = async (req, res) => {
    const currentPage = req.query.currentPage
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const myUserModel = await UserModel.findOne({ user_id: req.query.me })
    /*
    const model = await new TaskModel({sender: myUserModel,
        created_at: '2022-11-10T16:00:00.000+00:00',
        title: 'task10',
        restaurantName: 'MissEnergy',
        taskContent: 'content',
        due_start: '2022-12-10T16:00:00.000+00:00',
        due_end: '2022-12-10T16:00:00.000+00:00',
        fee: 50 ,
        status: 'completed',}).save()*/
    const myTasks = await TaskModel.find({
        receiver: myUserModel,
        status: { $in: ['accepted', 'completed'] },
    }) //
        .sort({ status: 1, due_end: 1 })
    // .limit( maxPageN*nPerPage+1 )
    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = myTasks.length === maxPageN * nPerPage + 1
    res.send({ myTasks, taskOverload })
}
