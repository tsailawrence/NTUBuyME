// * ////////////////////////////////////////////////////////////////////////
// *
import loginRoute from './login'
import registerRoute from './register'

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2])

function main(app) {
    app.post('/api/login', wrap(loginRoute.UserLogin))
    app.post('/api/register', wrap(registerRoute.UserRegister))
}

export default main
