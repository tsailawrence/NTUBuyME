# NTUBuyME

## TODO:

1. Transfer modal 打 qr code 功能還沒做
2. Chat modal
3. my tasks 取回該 user 的 task
4. 介面美化


## Bug

1. 登入以後要能記住 status
2. buyme page refresh 不要登出

## Reminder Log

1. frontend 裡有一個 UseApp 的 Hook, 可以在裡面定義需要在 component 間傳送的 State, 裡面已經定義好的 State 有 :

`

    /* me: 目前登入的使用者
    /* status: 任何通知, 格式為以下

    {
        type: 'error' / 'success'
        msg: 'any message'
    }

`

2. 規定一下使用的 typing format，像是要 user_id, userID, userId 還是什麼
