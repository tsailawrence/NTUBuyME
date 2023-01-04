import styled from 'styled-components'

const StyledMessage = styled.div`
    
    display: flex;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 1px 0px;
    

    & p: first-child {
        margin: 0 5px;
    }


    $p: last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        marginL auto 0;
    }
`

const Message = ({ name, isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <p
                style={{
                    background: '#e3e3e3',
                    maxWidth: '60%',
                    wordWrap: 'break-word',
                    padding: '2px 5px',
                    borderRadius: '4px',
                }}
            >
                {message}
            </p>
        </StyledMessage>
    )
}

export default Message
