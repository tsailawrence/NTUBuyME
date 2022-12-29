# NTUBuyME

## TODO:

1. Status modal
<<<<<<< Updated upstream
=======
2. Transfer modal，前後端串起來了，但是還要想辦法讓 db 顯示圖片
3. Chat modal
>>>>>>> Stashed changes

## Done

1. Login + Register

## Bug
登入以後要能記住 status

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
