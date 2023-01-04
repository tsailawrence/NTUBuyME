import React, { useState, useEffect } from 'react'
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    DownOutlined,
    DownCircleOutlined,
} from '@ant-design/icons'
import {
    Avatar,
    List,
    Space,
    Button,
    Dropdown,
    Typography,
    Card,
    Divider,
} from 'antd'
import instance from '../api'
import CreateTaskModal from './CreateTaskModal'
import { useApp } from '../UseApp'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

const items = [
    {
        key: 'Due Start Time',
        label: 'Due Start Time',
    },
    {
        key: 'Fee',
        label: 'Fee ',
    },
    {
        key: 'Other',
        label: 'Other',
    },
]
const BuyMe = () => {
    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nPerPage, setNPerPage] = useState(7)
    const [maxPageN, setMaxPageN] = useState(10)
    const [filter, setFilter] = useState('allTasksByDuestart')
    const [CreateTaskModalOpen, setCreateTaskModalOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const { setStatus, id } = useApp()

    useEffect(() => {
        const twoDayTasks = getTaskNum()
        setMaxPageN(twoDayTasks / nPerPage)
    }, [])

    useEffect(() => {
        getAllTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage, filter])

    useEffect(() => {
        console.log('!')
        setTimeout(() => {
            getAllTasks(currentPage, nPerPage, maxPageN)
            setReload(!reload)
        }, 5000)
    }, [reload])

    const getAllTasks = async (currentPage, nPerPage, maxPageN) => {
        const {
            data: { allTasks },
        } = await instance.get(filter, {
            params: {
                currentPage,
                nPerPage,
                maxPageN,
            },
        })

        setTasks(allTasks)
    }

    const getTaskNum = async () => {
        const { data: taskNum } = await instance.get('taskNum')
    }

    const AddDummyTasks = async () => {
        const {
            data: { success },
        } = await instance.post('addTasks')
        getAllTasks(currentPage, nPerPage, maxPageN)
    }

    const acceptTask = async (taskId) => {
        // navigate to chatbox
        // set receiver
        // create chatroom
        const {
            data: { message, content },
        } = await instance.post('acceptTask', { id: taskId, receiver: id })

        setStatus({
            type: message,
            msg: content,
        })
        getAllTasks(currentPage, nPerPage, maxPageN)
    }

    const DeleteAllTasks = async () => {
        const {
            data: { success },
        } = await instance.post('delete')
        getAllTasks(currentPage, nPerPage, maxPageN)
    }

    const onClick = ({ key }) => {
        switch (key) {
            case 'Due Start Time':
                setFilter('allTasksByDueStart')
                break
            case 'Fee':
                setFilter('allTasksByFee')
                break
            case 'Other':
                setFilter('allTasksByDueStart')
                break
        }
    }

    const createTask = async (values) => {
        let title = values.title
        let restaurant = values.restaurant
        let fee = values.fee
        let arrivalStart = values.arrivalStart
        let arrivalEnd = values.arrivalEnd
        let taskContent = values.content
        const {
            data: { message, content },
        } = await instance.post('/createTask', {
            id,
            title,
            restaurant,
            fee,
            arrivalStart,
            arrivalEnd,
            taskContent,
        })

        getAllTasks(currentPage, nPerPage, maxPageN)
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1>BuyMe</h1>
                <Button
                    style={{
                        marginRight: 50,
                        backgroundColor: '#ffdaab',
                    }}
                    onClick={() => {
                        setCreateTaskModalOpen(true)
                    }}
                >
                    + Create New Task
                </Button>
                <CreateTaskModal
                    open={CreateTaskModalOpen}
                    onCreate={(values) => {
                        createTask(values)
                        setCreateTaskModalOpen(false)
                    }}
                    onCancel={() => setCreateTaskModalOpen(false)}
                    // item={onClickItem}
                />
                <Button
                    style={{
                        marginRight: 50,
                        backgroundColor: '#ffdaab',
                    }}
                    onClick={AddDummyTasks}
                >
                    + Add Dummy
                </Button>
                <Button
                    style={{
                        marginRight: 50,
                        backgroundColor: '#ffdaab',
                    }}
                    onClick={DeleteAllTasks}
                >
                    - Delete All
                </Button>
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['Due Start Time'],
                        onClick,
                    }}
                >
                    <Typography.Link onClick={(e) => e.preventDefault()}>
                        <Space>
                            Filter By
                            <DownOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        setCurrentPage(page)
                    },
                    pageSize: nPerPage,
                }}
                dataSource={tasks}
                renderItem={(item) => (
                    <Card style={{ marginTop: 20, display: 'flex' }}>
                        <DownCircleOutlined
                            style={{ fontSize: '15px', color: '#228B22' }}
                        />
                        <b style={{ fontSize: '15px' }}> {item.title}</b>
                        <Divider />
                        <Space
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            <Space>
                                <b>餐廳名稱: </b>
                                {item.restaurantName}
                            </Space>
                            <Space>
                                <b>任務內容: </b>
                                {item.taskContent}
                            </Space>
                            <Space>
                                <b>希望送達時間: </b>
                                {item.due_start}~{item.due_end}
                            </Space>
                            <Space>
                                <b>外送費: </b>
                                {item.fee}
                            </Space>
                        </Space>
                        <Divider />
                        <Button onClick={() => acceptTask(item._id)}>
                            接任務
                        </Button>
                    </Card>
                )}
            ></List>
        </>
    )
}

export default BuyMe
