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
import { all } from 'axios'
import CreateTaskModal from './CreateTaskModal'

// const data = Array.from({ length: 23 }).map((_, i) => ({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://joeschmoe.io/api/v1/random',
//     description:
//         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }))
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
function BuyMe() {
    const createTask = () => {
        console.log('create task')
    }
    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nPerPage, setNPerPage] = useState(7)
    const [maxPageN, setMaxPageN] = useState(10)
    const [filter, setFilter] = useState('allTasksByDuestart')
    const [CreateTaskModalOpen, setCreateTaskModalOpen] = useState(false)
    // const [taskOverload, setTaskOverload] = useState(false)

    useEffect(() => {
        const twoDayTasks = getTaskNum()
        setMaxPageN(twoDayTasks / nPerPage)
    }, [])

    useEffect(() => {
        console.log(filter)
        getAllTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage, filter])

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
        // setTaskOverload(taskOverload)
    }

    const getTaskNum = async () => {
        const { data: taskNum } = await instance.get('taskNum')
        // console.log(taskNum)
    }

    const AddDummyTasks = async () => {
        const {
            data: { success },
        } = await instance.post('addTasks')
        console.log(success)
    }

    const acceptTask = (id) => {
        console.log(id)
        // navigate to chatbox
    }

    const DeleteAllTasks = async () => {
        const {
            data: { success },
        } = await instance.post('delete')
        console.log(success)
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
                <CreateTaskModal
                    // user={accountInfo}
                    // open={EditAccModalOpen}
                    onCreate={(values) => {
                        // editAccount(
                        //     me,
                        //     Object.keys(values.user),
                        //     Object.values(values.user)
                        // )
                        CreateTaskModalOpen(false)
                    }}
                    onCancel={() => CreateTaskModalOpen(false)}
                    // item={onClickItem}
                />
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
                    <Card>
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
                                <b>Restaurant Name: </b>
                                {item.restaurantName}
                            </Space>
                            <Space>
                                <b>Task: </b>
                                {item.taskContent}
                            </Space>
                            <Space>
                                <b>Due Time: </b>
                                {item.due_start}~{item.due_end}
                            </Space>
                            <Space>
                                <b>Fee: </b>
                                {item.fee}
                            </Space>
                        </Space>
                        <Divider />
                        <Button onClick={() => acceptTask(item._id)}>
                            Accept Task
                        </Button>
                    </Card>
                )}
            ></List>
        </>
    )
}

export default BuyMe
