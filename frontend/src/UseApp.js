import { createContext, useContext, useState, useEffect } from 'react'
import { message } from 'antd'

const AppContext = createContext({
    status: {},
    me: '',
    signIn: false,
    // getAccount: () => {},
})

const LOCALSTORAGE_KEY = 'save-me'
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

const AppProvider = (props) => {
    const [me, setMe] = useState(savedMe || '')
    const [signIn, setSignIn] = useState(false)
    const [status, setStatus] = useState([])
    const [id, setId] = useState('')

    // const getAccount = (me) => {
    //     if(!me) throw new Error('Account ID required!');

    // }

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s
            const status = {
                content: msg,
                duration: 1,
            }
            switch (type) {
                case 'success':
                    message.success(status)
                    break
                case 'error':
                default:
                    message.error(status)
                    break
            }
        }
    }

    useEffect(() => {
        console.log(status)
        displayStatus(status)
    }, [status])

    useEffect(() => {
        if (signIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me)
        }
    }, [signIn])

    return (
        <AppContext.Provider
            value={{
                me,
                setMe,
                id,
                setId,
                signIn,
                setSignIn,
                status,
                setStatus,
            }}
            {...props}
        />
    )
}

const useApp = () => useContext(AppContext)
export { AppProvider, useApp }
