import React from 'react'
import { useState } from 'react'
import { useApp } from '../UseApp'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import instance from '../api'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

const bcrypt = require('bcryptjs')
const saltRounds = 10

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

const Register = ({ setLogin }) => {
    const [password, setPassword] = useState('')
    const { setStatus, setMe } = useApp()
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const navigateToMainPage = () => {
        navigate('/')
    }

    const onFinish = async (value) => {
        const password = value.user.password
        value.user.password = await encryptPassword(password)
        const {
            data: { message, content },
        } = await instance.post('/register', value)

        setStatus({
            type: message,
            msg: content,
        })
        if (message === 'success') {
            setMe(value.user.id)
            setLogin(true)
            navigateToMainPage()
        }
        form.resetFields()
    }
    return (
        <div className="loginFormContainer">
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'id']}
                    label="Id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                        {
                            type: 'password',
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item name={['user', 'bankaccount']} label="Bank account">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
