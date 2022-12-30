import loginRoute from './login'
import registerRoute from './register'
import accountRoute from './account'
import transferRoute from './transfer'
import buymeRoute from './task'

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2])

function main(app) {
    app.post('/api/login', wrap(loginRoute.UserLogin))
    app.post('/api/register', wrap(registerRoute.UserRegister))
    app.get('/api/account', wrap(accountRoute.GetUserAccount))
    app.post('/api/account', wrap(accountRoute.EditUserAccount))
    app.post('/api/changePassword', wrap(accountRoute.ChangePassword))
    app.get('/api/transfer', wrap(transferRoute.GetTransferAccount))
    app.get('/api/allTasksByDueStart', wrap(buymeRoute.FilterTasksByDueStart))
    app.get('/api/allTasksByFee', wrap(buymeRoute.FilterTasksByFee))
    app.post('/api/delete', wrap(buymeRoute.DeleteAllTasks))
    app.get('/api/taskNum', wrap(buymeRoute.GetTaskNum))
    app.get('/api/myTasks', wrap(buymeRoute.GetMyTasks))
    app.post('/api/addTasks', wrap(buymeRoute.AddDummyTasks))
}

export default main
