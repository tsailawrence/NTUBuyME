import React, { useState, useEffect, useRef } from 'react'
import '../index.css'
import { useApp } from '../UseApp'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import instance from '../api'

const bcrypt = require('bcryptjs')

const Login = ({ setLogin, setCollapsed }) => {
    const { me, setMe, status, setStatus, id, setId } = useApp()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (id === '' || password === '')
    //         document.getElementById('submit').disabled = true
    //     else document.getElementById('submit').disabled = false
    // }, [id, password])

    const handleLogin = async () => {
        if (!id) {
            setStatus({
                type: 'error',
                msg: 'Missing student ID',
            })
        } else if (!password) {
            setStatus({
                type: 'error',
                msg: 'Missing password',
            })
            alert('Missing password')
        } else {
            const {
                data: { message, content },
            } = await instance.post('/login', {
                userId: id,
            })

            switch (message) {
                default:
                    break
                case 'error':
                    setStatus({
                        type: 'error',
                        msg: content,
                    })
                    alert(content)
                    break
                case 'success':
                    const result = bcrypt.compareSync(
                        password,
                        content.password
                    )
                    if (result) {
                        setMe(content.name)
                        setLogin(true)
                        setStatus({
                            type: 'success',
                            msg: 'Login successfully!',
                        })

                        setCollapsed(false)
                        navigate('/')
                    } else {
                        setStatus({
                            type: 'error',
                            msg: 'Wrong password!',
                        })
                    }
                    break
            }
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <div className="loginFormContainer">
                <img
                    src={require('../img/LogoTitle.png')}
                    alt="Logo"
                    style={{
                        width: '300px',
                        marginTop: '-100px',
                        marginBottom: '50px',
                    }}
                />
                <Form
                    name="basic"
                    className="loginForm"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Student ID"
                        name="Student ID"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your student ID!',
                            },
                        ]}
                    >
                        <Input
                            value={id}
                            id="userID"
                            onChange={(e) => {
                                setId(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button
                            id="submit"
                            type="primary"
                            htmlType="submit"
                            style={{
                                margin: 5,
                                width: 80,
                            }}
                            onClick={handleLogin}
                        >
                            Submit
                        </Button>
                        <Button
                            type="default"
                            style={{
                                margin: 5,
                                width: 80,
                            }}
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
