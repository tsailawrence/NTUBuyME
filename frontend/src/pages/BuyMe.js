import React, { useState, useEffect } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space, Button } from 'antd'
import instance from '../api'
import { all } from 'axios'


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
function BuyMe() {
    const createTask = () => {}
    const [ tasks, setTasks ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ nPerPage, setNPerPage] = useState(3)
    const [ maxPageN, setMaxPageN ] = useState(2)
    const [ taskOverload, setTaskOverload ] = useState(false)

    useEffect(()=>{
        // getTaskNum()
    })

    useEffect(() => {
        getAllTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage]);

    const getAllTasks = async( currentPage, nPerPage, maxPageN ) => {
        const { data: {allTasks, taskOverload} }
        = await instance.get('allTasks', { params:{
            currentPage, nPerPage, maxPageN
        }})
        // console.log(allTasks)
        // console.log(taskOverload)
        setTasks(allTasks)
        setTaskOverload(taskOverload)
    }

    const getTaskNum = async() => {
        const {
            data: taskNum
        } = await instance.get('taskNum')
        // console.log(taskNum)
    }

    const acceptTask = (id) => {
        console.log(id)
        // navigate to chatbox
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
                    onClick={createTask}
                >
                    + Add New Task
                </Button>
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
                    <List.Item style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row',}}>
                        <Space style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',}}>
                        <b>{item.items}</b>
                        {item.note}
                        </Space>
                        <Button onClick={() => acceptTask(item._id)}>Accept Task</Button>
                    </List.Item>
                )}
            />
        </>
    )
}

export default BuyMe
