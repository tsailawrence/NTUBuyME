import React, { useState } from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;

function Transfer() {
    return (
        <>
            <h1>Transfer</h1>
            <Search placeholder="Input Student ID" enterButton />
        </>
    );

}

export default Transfer;