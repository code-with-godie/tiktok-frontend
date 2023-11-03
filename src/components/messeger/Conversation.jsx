import React, { useState } from 'react';
import styled from 'styled-components';
import Chats from './Chats';
import Preview from './Preview';

const Container = styled.div`
    flex: 1;
    height: 90%;
    /* box-shadow:0 0 5px 5px rgba(215, 215, 215, 0.3) ; */
    max-width: 700px;
    box-shadow: 0 0 5px 3px #c4c4c44a;
    border-radius: 0.5rem;
    background-color: white;
    background: ${props => props.theme.bg_primary};
    color: ${props => props.theme.text_primary};
`;
const Conversation = ({ currentConversation }) => {
    return (
        <Container>
            {currentConversation ? (
                <Chats currentConversation={currentConversation} />
            ) : (
                <Preview />
            )}
        </Container>
    );
};

export default Conversation;
