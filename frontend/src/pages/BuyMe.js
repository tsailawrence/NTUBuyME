import React, { useState } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space, Button } from 'antd'
<<<<<<< Updated upstream

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))
=======
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
>>>>>>> Stashed changes
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)
function BuyMe() {
    const createTask = () => {}
<<<<<<< Updated upstream
=======
    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nPerPage, setNPerPage] = useState(3)
    const [maxPageN, setMaxPageN] = useState(2)
    const [taskOverload, setTaskOverload] = useState(false)
    const [CreateTaskModalOpen, setCreateTaskModalOpen] = useState(false)

    useEffect(() => {
        // getTaskNum()
    })

    useEffect(() => {
        getAllTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage])

    const getAllTasks = async (currentPage, nPerPage, maxPageN) => {
        const {
            data: { allTasks, taskOverload },
        } = await instance.get('allTasks', {
            params: {
                currentPage,
                nPerPage,
                maxPageN,
            },
        })
        // console.log(allTasks)
        // console.log(taskOverload)
        setTasks(allTasks)
        setTaskOverload(taskOverload)
    }

    const getTaskNum = async () => {
        const { data: taskNum } = await instance.get('taskNum')
        // console.log(taskNum)
    }

    const acceptTask = (id) => {
        console.log(id)
        // navigate to chatbox
    }

>>>>>>> Stashed changes
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
                    pageSize: 3,
                }}
                dataSource={data}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
<<<<<<< Updated upstream
                        key={item.title}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                            />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
=======
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                        }}
                    >
                        <Space
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            <b>{item.items}</b>
                            {item.note}
                        </Space>
                        <Button onClick={() => acceptTask(item._id)}>
                            Accept Task
                        </Button>
>>>>>>> Stashed changes
                    </List.Item>
                )}
            />
        </>
    )
}

export default BuyMe
