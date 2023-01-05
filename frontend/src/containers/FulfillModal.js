import React, { useState } from 'react'
import { Button, Modal, Space } from 'antd'
const FulfillModal = () => {
    const [open, setOpen] = useState(false)
    const showModal = () => {
        setOpen(true)
    }
    const hideModal = () => {
        setOpen(false)
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Modal
            </Button>
            <Modal
                title="Modal"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        </>
    )
}
export default FulfillModal
