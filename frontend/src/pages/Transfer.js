import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Input, Layout, Space, List, Card, Divider, Button } from 'antd'
import { useApp } from '../UseApp'
import axios from '../api'

const { Header, Content } = Layout
const { Search } = Input

function Transfer({ collapsed, setCollapsed }) {
    const { status, setStatus } = useApp()
    const [id, setId] = useState()
    const [idList, setIdList] = useState([])
    const [qrCode, setQrCode] = useState('')

    const searchId = async (id) => {
        const {
            data: { message, content },
        } = await axios.get('/transfer', {
            params: {
                userId: id,
            },
        })
        // console.log(content)
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
                setIdList([content])
        }
    }
    // useEffect(() => {
    //     console.log(idList)
    // }, [idList])

    const handleQRcode = (account) => {
        const corsURL = 'https://cors-anywhere.herokuapp.com/'
        const apiURL =
            'https://i-tw.org/twpay/api?Bank=' +
            account.bank_id +
            '&Acc=' +
            account.bankaccount_id

        fetch(`${corsURL}${apiURL}`)
            .then((res) => {
                const data = res.json()
                return data
            })
            .then((data) => {
                setQrCode(<img src={data.QR} alt="new" width="200" />)
            })
    }

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
                    // width: '80%',
                    marginRight: '10%',
                }}
            >
                <h1>Transfer</h1>
                <Search
                    placeholder="請輸入想要查找的學號"
                    enterButton
                    value={id}
                    onSearch={searchId}
                />
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={idList}
                    style={{ marginTop: 20 }}
                    renderItem={(item) => (
                        <Card>
                            <Space
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                }}
                            >
                                <Space>
                                    <b>學號: </b>
                                    {item.id}
                                </Space>
                                <Space>
                                    <b>姓名: </b>
                                    {item.name}
                                </Space>
                                <Space>
                                    <b>銀行代碼: </b>
                                    {item.bankaccount.bank_id}
                                </Space>
                                <Space>
                                    <b>戶頭帳號: </b>
                                    {item.bankaccount.bankaccount_id}
                                </Space>
                                <Space id="QRimage">{qrCode}</Space>
                                <Button
                                    onClick={() =>
                                        handleQRcode(item.bankaccount)
                                    }
                                >
                                    QR Code
                                </Button>
                            </Space>
                        </Card>
                    )}
                ></List>
            </Content>
        </Layout>
    )
}

export default Transfer
