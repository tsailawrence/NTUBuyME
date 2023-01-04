import styled from 'styled-components'

const StyledMessage = styled.div`
    display: flex;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 1px 0px;

    width: 100%;

    $p: last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`
const StyledMsg = styled.p`
    background: ${({ isMe }) => (isMe ? 'white' : '#3d94ff')};
    color: ${({ isMe }) => (isMe ? 'black' : '#faf5f5')};
    // max-width: 60%;
    word-wrap: break-word;
    padding: 2px 5px;
    border-radius: 4px;
`

const Message = ({ name, isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <StyledMsg isMe={isMe}>{message}</StyledMsg>
        </StyledMessage>
    )
}

export default Message
