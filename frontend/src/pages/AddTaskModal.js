import { Modal, Form, Input, Space, Button } from "antd";
import { useState } from "react";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
}

const EditAccModal = ({ user , item, open, onCreate, onCancel }) => {
    const [form] = Form.useForm()

    return (
        <Modal open={open}
            title="Edit Account Details"
            okText="Save Changes"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                .then((values)=>{
                    form.resetFields();
                    onCreate(values);
                })
                .catch((e) => {
                    window.alert(e)
                })
            }}>
            <Form
                {...layout}
                name="nest-messages"
                form={form}
            >
               
                <Form.Item name={['user', item]} label={item==='name'?'Name':'Bank Account'}>
                    <Input placeholder={user.item}/>
                </Form.Item>
           
            </Form>
        </Modal>
    )
}

export default EditAccModal;
