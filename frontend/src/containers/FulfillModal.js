import { Modal } from 'antd'
import { useState } from 'react'
const FulfillModal = ({ fulfill, setFulfill, confirmFulfill }) => {
    return (
        <Modal
            title="Modal"
            open={fulfill}
            onOk={() => {
                confirmFulfill()
            }}
            onCancel={() => {
                setFulfill(false)
            }}
            okText="确认"
            cancelText="取消"
        >
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
        </Modal>
    )
}
export default FulfillModal
