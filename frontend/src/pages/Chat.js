import React from 'react'
import instance from '../api'
import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useApp } from '../UseApp'
import { Layout, Card, Input, Button } from 'antd'
import Message from '../containers/Message'
const { Header, Content } = Layout

const ChatBox = styled(Card)`
    width: 100%;
    height: 90%;
    background: #fcecca;
    border-radius: 50px;
    border: white solid 1px;
    overflow: auto;
    margin-bottom: 10px;
    height: 'calc(500px - 36px)';
`

const ChatBoxWrapper = styled.div`
    transform: translate(-30%, 0);
    height: calc(500px - 36px);
    width: 500px;
    background: #ffdaab;
    opacity: 0.95;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: 50px;
    padding: 25px;
    z-index: 15;
    margin: -100px 0 0 -150px;
`

const ChatRoomHeader = styled.div`
    width: 100%;
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: white 1.5px solid;
    background: #fcecca;
    padding: 5px;
    margin-bottom: 10px;
`

const FootRef = styled.div`
    height: 10px;
    width: 100%;
`

function Chat({ collapsed, setCollapsed }) {
    const [msgSent, setMsgSent] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [chatBoxName, setChatBoxName] = useState('')
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const msgFooter = useRef(null)
    const {
        id,
        me,
        setStatus,
        messages,
        setMessages,
        sendData,
        sendMessage,
        chats,
        setChats,
    } = useApp()

    useEffect(() => {
        getChats(id)
    }, [])

    const OnChatRoom = async (chatRoom) => {
        setChatOpen(true)
        setMessages(chatRoom.messages)
        setChatBoxName(chatRoom.name)
        setTitle(chatRoom.title)
        await getChats(id)
        sendData(['CHAT', { name: chatRoom.name }])
    }

    const getChats = async (id) => {
        const {
            data: { chatRooms },
        } = await instance.get('getChat', { params: { id: id } })
        setChats(chatRooms)
    }

    const displayChat = (chat) => (
        <ChatBox>
            {chat.length === 0 ? (
                <p style={{ color: '#ccc' }}>No messages...</p>
            ) : (
                chat.map(({ sender, body }, i) => (
                    <Message
                        name={sender}
                        isMe={sender === me}
                        message={body}
                        key={i}
                    />
                ))
            )}
            <FootRef ref={msgFooter}></FootRef>
        </ChatBox>
    )

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }

    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])

    return (
        <Layout className="site-layout">
            <Content
                className="site-layout-background"
                style={{
                    // margin: '24px 16px',
                    padding: 24,
                    paddingTop: 50,
                    minHeight: 280,
                    borderRadius: 50,
                    marginTop: 50,
                    marginBottom: 50,
                    marginRight: '16%',
                    filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))',
                }}
            >
                <div>
                    <h1>Chat</h1>
                    {chats.length !== 0 &&
                        chats.map((element, key) => (
                            <Card
                                title={element.title}
                                style={{ margin: 20 }}
                                key={key}
                                hoverable="true"
                                onClick={() => OnChatRoom(element)}
                            >
                                <p>發起人： {element.from}</p>
                                <p>期間： {element.due_period}</p>
                                <p>費用: {element.fee}</p>
                            </Card>
                        ))}
                </div>
                {chatOpen && (
                    <div
                        style={{
                            display: 'flex',
                            width: '500px',
                            position: 'absolute',
                            zIndex: '15',
                            top: '50%',
                            left: '50%',
                            margin: '-15% 0 0 -10%',
                            filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))',
                        }}
                    >
                        <ChatBoxWrapper>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    type="Dashed"
                                    onClick={() => setChatOpen(false)}
                                    style={{
                                        position: 'fixed',
                                        right: '25px',
                                        // top: '13px',
                                    }}
                                >
                                    X
                                </Button>
                                <ChatRoomHeader>
                                    <p>{title}</p>
                                </ChatRoomHeader>
                            </div>

                            {displayChat(messages)}

                            <Input.Search
                                enterButton="Send"
                                placeholder="Type a message here..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                onSearch={(message) => {
                                    if (!message) {
                                        setStatus({
                                            type: 'error',
                                            msg: 'Please enter a message body.',
                                        })
                                        return
                                    }

                                    sendMessage(me, body, chatBoxName)
                                    setBody('')
                                    setMsgSent(true)
                                }}
                            />
                        </ChatBoxWrapper>
                    </div>
                )}
            </Content>
        </Layout>
    )
}

export default Chat
