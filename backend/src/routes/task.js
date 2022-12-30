import { TaskModel } from '../models/BuyMe'
import { UserModel } from '../models/BuyMe'

exports.GetAllTasks = async (req, res) => {
    // console.log(req.query)
    const currentPage = req.query.currentPage
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const allTasks = await TaskModel.find()//status: 'open'
                                    .sort({ created_at: -1 })
                                    // .limit( maxPageN*nPerPage+1 )
                                    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = allTasks.length === maxPageN*nPerPage+1 
    console.log(taskOverload)

    res.send({ allTasks, taskOverload })

}

exports.GetTaskNum = async (_, res) => {
    const taskNum = TaskModel.estimatedDocumentCount();

    // console.log(taskNum)
}

exports.GetMyTasks = async (req, res) => {
    const currentPage = req.query.currentPage
    const nPerPage = req.query.nPerPage
    const maxPageN = req.query.maxPageN

    const myUserModel = await UserModel.find({ user_id: req.query.me })
    const myTasks = await TaskModel.find({ sender: myUserModel })//status: 'open'
                                    .sort({ created_at: -1 })
                                    // .limit( maxPageN*nPerPage+1 )
                                    // .skip( currentPage > 0 ? ( ( currentPage - 1 ) * nPerPage ) : 0 )

    const taskOverload = myTasks.length === maxPageN*nPerPage+1 
    console.log(taskOverload)

    res.send({ myTasks, taskOverload })

}