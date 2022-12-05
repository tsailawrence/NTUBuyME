import React, { useState } from 'react';
import { Card } from 'antd';

function Chat() {
    let array = ["1", "2", "3"]

    return (
        <div>
            <h1>Chat</h1>
            {array.map((element, key) =>
                <Card title={element} style={{ margin: 20 }}>
                </Card>
            )}
        </div>
    );

}

export default Chat;