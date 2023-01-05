import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
const FulfillModal = ({
    fulfill,
    setFulfill,
    confirmFulfill,
    setChatOpen,
    isInitializer,
}) => {
    console.log(isInitializer)
    const navigate = useNavigate()
    return (
        <Modal
            title="完成訂單"
            open={fulfill}
            okButtonProps={{ disabled: isInitializer }}
            onOk={() => {
                confirmFulfill()
                setFulfill(false)
                setChatOpen(false)
                navigate('/transfer')
            }}
            onCancel={() => {
                setFulfill(false)
            }}
            okText="確認"
            cancelText="取消"
        >
            <p>送出後將結束訂單，請確認您的訂單已經完成。</p>
        </Modal>
    )
}
export default FulfillModal
