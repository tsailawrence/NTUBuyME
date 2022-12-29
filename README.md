# NTUBuyME

## TODO:

1. Status modal

2. Transfer modal，前後端串起來了，但是還要想辦法讓 db 顯示圖片
3. Chat modal
4. add new task
5. my tasks 取回該 user 的 task
6. 菜單欄顏色調整

## Done

1. Login + Register
2. Account

## Bug

1. 登入以後要能記住 status

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
