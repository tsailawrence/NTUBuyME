import { Modal, Form, Input, Space, Button } from 'antd'
import { useState } from 'react'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
}

const CreateTaskModal = ({ onCreate, onCancel }) => {
    const [form] = Form.useForm()

    return (
        <Modal
            // open={open}
            title="Create New BuyMe Task"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                console.log('hi')
                // form.validateFields()
                //     .then((values) => {
                //         form.resetFields()
                //         onCreate(values)
                //     })
                //     .catch((e) => {
                //         window.alert(e)
                //     })
            }}
        >
            <Form {...layout} name="nest-messages" form={form}>
                <Form.Item
                // name={['user', item]}
                // label={item === 'name' ? 'Name' : 'Bank Account'}
                >
                    {/* <Input placeholder={user.item} /> */}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateTaskModal
