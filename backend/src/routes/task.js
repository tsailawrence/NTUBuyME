import { TaskModel } from '../models/BuyMe'
import { UserModel } from '../models/BuyMe'

exports.GetAllTasks = async (req, res) => {
    // console.log(req.query)
    const currentPage = req.query.currentPage
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const allTasks = await TaskModel.find({ status: 'open'})//status: 'open'
                                    .sort({ created_at: -1 })
                                    // .limit( maxPageN*nPerPage+1 )
                                    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = allTasks.length === maxPageN*nPerPage+1 
    // console.log(taskOverload)

    res.send({ allTasks, taskOverload })

}

exports.GetTaskNum = async (_, res) => {
    const taskNum = TaskModel.estimatedDocumentCount();

    // console.log(taskNum)
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
    const myTasks = await TaskModel.find({ sender: myUserModel, status: {$in:['accepted','completed']} })//
                                    .sort({ status: 1, due_end: 1, })
                                    // .limit( maxPageN*nPerPage+1 )
                                    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = myTasks.length === maxPageN*nPerPage+1 
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
    const myTasks = await TaskModel.find({ receiver: myUserModel, status: {$in:['accepted','completed']} })//
                                    .sort({ status: 1, due_end: 1, })
                                    // .limit( maxPageN*nPerPage+1 )
                                    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = myTasks.length === maxPageN*nPerPage+1 
    res.send({ myTasks, taskOverload })

}