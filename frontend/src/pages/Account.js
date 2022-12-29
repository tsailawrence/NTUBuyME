import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, List, Button, Space } from 'antd'
import instance from '../api'
import { useState, useEffect } from 'react'
import ChangePwdModal from './ChangePwdModal'
import EditAccModal from './EditAccModal'
const { Header, Content } = Layout

const Account = ({ collapsed, setCollapsed, me }) => {
    const [accountInfo, setAccountInfo] = useState('')
    const [ChangePwdModalOpen, setChangePwdModalOpen] = useState(false)
    const [EditAccModalOpen, setEditAccModalOpen] = useState(false)
    const [onClickItem, setOnClickItem] = useState('')

    // Get Account
    useEffect(() => {
        getAccount(me)
    })

    const getAccount = async (user_id) => {
        const { data: account } = await instance.get('/account', {
            params: {
                user_id,
            },
        })
        setAccountInfo(account.data)
    }

    // Edit Account
    const editAccount = async (user_id, item, newValue) => {
        const {
            data: { message, content },
        } = await instance.post('/account', {
            user_id,
            item,
            newValue,
        })
    }

    // Change Password
    const bcrypt = require('bcryptjs')
    const saltRounds = 10

    const encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    const changePassword = async (user_id, value) => {
        const {
            data: { message, content },
        } = await instance.post('/login', {
            userId: user_id,
        })

        switch (message) {
            default:
                break

            case 'error':
                alert(content)
                break
            case 'success': {
                // check current password
                const result = bcrypt.compareSync(
                    value.user.currentpassword,
                    content.password
                )
                if (result) {
                    // check new password === retype new password
                    if (
                        value.user.newpassword === value.user.newpasswordcheck
                    ) {
                        // update new password
                        const newPasswordEncrypted = await encryptPassword(
                            value.user.newpassword
                        )
                        const {
                            data: { message, content },
                        } = await instance.post('/changePassword', {
                            user_id,
                            newPasswordEncrypted,
                        })
                        console.log(message)
                        console.log(content)
                    } else {
                        window.alert(
                            'Retype new password does not match new password!'
                        )
                    }
                } else {
                    window.alert('Current password is not correct!')
                }
                break
            }
        }
    }

    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    }
                )}
            </Header>
            <Content
                className="site-layout-background"
                style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}
            >
                <h1>Account</h1>
                <List size="large" bordered>
                    <List.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space direction="column">
                            <b>Student ID</b>
                            {accountInfo.user_id}
                        </Space>
                    </List.Item>

                    <List.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space direction="column" align="center">
                            <b>Name</b>
                            {accountInfo.name}
                            <Button
                                onClick={() => {
                                    setEditAccModalOpen(true)
                                    setOnClickItem('name')
                                }}
                            >
                                Edit
                            </Button>
                        </Space>
                    </List.Item>

                    <List.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space direction="column" align="center">
                            <b>Bank Account</b>
                            {accountInfo.bankaccount}
                            <Button
                                onClick={() => {
                                    setEditAccModalOpen(true)
                                    setOnClickItem('bankaccount')
                                }}
                            >
                                Edit
                            </Button>
                        </Space>
                    </List.Item>

                    <List.Item>
                        <Button onClick={() => setChangePwdModalOpen(true)}>
                            Change Password
                        </Button>
                    </List.Item>
                </List>
            </Content>
            <EditAccModal
                user={accountInfo}
                open={EditAccModalOpen}
                onCreate={(values) => {
                    editAccount(
                        me,
                        Object.keys(values.user)[0],
                        Object.values(values.user)[0]
                    )
                    setEditAccModalOpen(false)
                }}
                onCancel={() => setEditAccModalOpen(false)}
                item={onClickItem}
            />
            <ChangePwdModal
                user_id={me}
                open={ChangePwdModalOpen}
                onCreate={(value) => {
                    changePassword(me, value)
                    setChangePwdModalOpen(false)
                }}
                onCancel={() => setChangePwdModalOpen(false)}
            />
        </Layout>
    )
}

export default Account
