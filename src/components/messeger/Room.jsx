import { Avatar, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { useFetch } from '../../api/useFetch';
import { AirplaneTicket } from '@mui/icons-material';
const Container = styled.div`
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    :not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.border};
    }
    :hover {
        background: ${props => props.theme.gray_semi_transparent};
        color: ${props => props.theme.bg_primary};
    }
    :hover p {
        color: ${props => props.theme.bg_primary};
    }
    .profile {
        position: relative;
    }
`;
const DescriptionContainer = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
        flex: 1;
        gap: 0.3rem;
        flex-direction: column;
    }
`;
const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.3rem;
`;
const Username = styled.h3`
    font-size: 1rem;
    /* color: #000000d4; */
`;
const LastMessage = styled.p`
    font-size: 0.9rem;
    color: ${props => props.theme.text_gray};
    /* color: #000000b0; */
    font-family: 'Poppins', sans-serif;
`;
const Time = styled(LastMessage)``;
const Online = styled.div`
    border-radius: 50%;
    padding: 0.4rem;
    background-color: #1ce21c;
    position: absolute;
    top: 4px;
    right: 8px;
    z-index: 100;
    transition: 100ms;
    visibility: hidden;
    &.show {
        visibility: visible;
    }
`;
const Room = ({ setCurrentConversation, members, _id: roomID }) => {
    const {
        user: { _id: userID },
        onlineUsers,
        socket,
    } = useAppContext();

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const friendID = members.find(item => item !== userID);
    const [user, setUser] = useState(null);
    const [online, setOnline] = useState(
        onlineUsers?.some(users => users.id === friendID)
    );
    const [lastMessage, setLastMessage] = useState('');
    const { data } = useFetch(`/users/${friendID}`);
    const { data: tempMessage } = useFetch(
        `/messeges/last-room-messege/${roomID}`
    );

    const handleCLick = () => {
        const currentChat = {
            profile: user?.profilePic,
            username: user?.username,
            receiverID: friendID,
            roomID,
            online,
        };
        setCurrentConversation(currentChat);
        socket?.emit('JOIN_ROOM', roomID);
    };
    useEffect(() => {
        if (tempMessage) {
            setLastMessage(tempMessage.messege[0]);
        }
    }, [tempMessage]);
    useEffect(() => {
        if (data) {
            setUser(data.user);
        }
    }, [data]);
    useEffect(() => {
        setOnline(onlineUsers?.some(users => users.id === friendID));
    }, [onlineUsers]);
    useEffect(() => {
        if (lastMessage) {
            const date = new Date(lastMessage?.createdAt);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const time = `${hour}:${minute}`;
            const MyDate = `${day}/${month}/${year}`;
            setTime(time);
            setDate(MyDate);
        }
    }, [lastMessage]);
    return (
        <Container onClick={handleCLick}>
            <IconButton className='profile'>
                <Avatar src={user?.profilePic} />
                <Online className={`${online && 'show'}`} />
            </IconButton>
            <DescriptionContainer>
                <Username> {user?.username} </Username>
                {lastMessage ? (
                    <>
                        <Description>
                            <LastMessage> {lastMessage.title} </LastMessage>
                            <Time>
                                {' '}
                                <AirplaneTicket />{' '}
                            </Time>
                        </Description>
                        <Description>
                            <LastMessage> {date} </LastMessage>
                            <Time> {time} </Time>
                        </Description>
                    </>
                ) : (
                    <Description>
                        <LastMessage> say Hi </LastMessage>
                    </Description>
                )}
            </DescriptionContainer>
        </Container>
    );
};

export default Room;
