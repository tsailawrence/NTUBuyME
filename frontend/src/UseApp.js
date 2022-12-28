import { createContext, useContext, useState, useEffect } from 'react'


const AppContext = createContext({
    status: {},
    me: "",
    signIn: false,
    // getAccount: () => {},
})

const AppProvider = (props) => {
    const [me, setMe] = useState('')
    const [signIn, setSignIn] = useState(false)
    const [status, setStatus] = useState([])


    useEffect(() => {
        // console.log(status)
    }, [status])
    // const getAccount = (me) => {
    //     if(!me) throw new Error('Account ID required!');

    // }

    useEffect(() => {}, [status])

    return (
        <AppContext.Provider
            value={{
                me,
                setMe,
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
