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

const EditAccModal = ({ user, item, open, onCreate, onCancel }) => {
    const [form] = Form.useForm()
    return (
        <Modal
            open={open}
            title="Edit Account Details"
            okText="Save Changes"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields()
                    })
                    .catch((e) => {
                        window.alert(e)
                    })
            }}
        >
            <Form {...layout} name="nest-messages" form={form}>
                {item === 'name' ? (
                    <Form.Item name={['user', item]} label="Name">
                        <Input placeholder={user.item} />
                    </Form.Item>
                ) : (
                    <>
                        <b>Bank Account</b>
                        <Form.Item name={['user', 'bank_id']} label="Bank id">
                            <Input placeholder={user.item} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'bankaccount_id']}
                            label="Bank Account id"
                        >
                            <Input placeholder={user.item} />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    )
}

export default EditAccModal
