import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import { BsPeople } from 'react-icons/bs';
import { BiVideo } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useFetch } from '../../api/useFetch';
import AccountsSkeleton from '../skeletons/AccountsSkeleton';
import effect from '../../assets/effects.png';
import NavFooter from './NavFooter';
const Container = styled.div`
    border-right: 1px solid #f1f1f2;
    display: flex;
    overflow: auto;
    flex-direction: column;
    color: ${props => props.theme.text_primary};
    @media screen and (min-width: 1200px) {
        flex: 1;
        border-right: none;
    }
`;
const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid #e8e8e8;
    .link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: inherit;
        text-decoration: none;
        .icon {
            font-size: 2rem;
            transition: 300ms;
            color: ${props => props.theme.text_primary};
        }
        .active {
            color: #fe496c;
            font-size: 2.1rem;
        }
        :hover {
            background-color: #f1f1f2;
        }
    }
`;
const NavItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: ${props => props.theme.text_primary};
    text-decoration: none;
    .icon {
        font-size: 2rem;
        transition: 300ms;
        color: ${props => props.theme.text_primary};
    }
    .active {
        color: #fe496c;
        font-size: 2.1rem;
    }
    :hover {
        background-color: ${props => props.theme.gray_semi_transparent};
        color: ${props => props.theme.bg_primary};
        .icon,
        .link {
            color: ${props => props.theme.bg_primary};
        }
    }
`;
const NavLabel = styled.h2`
    display: none;
    font-size: 1.3rem;
    text-transform: capitalize;
    @media screen and (min-width: 768px) {
        display: inline;
    }
`;
const FollowingContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    .profile {
        width: 35px;
        height: 35px;
    }
`;
const FollowingWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
    align-items: center;
    :hover {
        color: ${props => props.theme.bg_primary};
        background-color: ${props => props.theme.gray_semi_transparent};
    }
`;
const FollowingDescription = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
        gap: 0.3rem;
        flex-direction: column;
        flex: 1;
        padding: 0.5rem;
    }
`;
const FollowingTitle = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.text_primary};
`;
const FollowingName = styled.p`
    font-size: 0.9rem;
    font-weight: 100;
    color: gray;
`;
const Effect = styled.img`
    display: none;
    @media screen and (min-width: 768px) {
        display: inline;
        max-width: 200px;
        height: auto;
        padding: 0.5rem;
        border-radius: 0.5rem;
        object-fit: contain;
        cursor: pointer;
    }
`;
const Sidenav = () => {
    const { user, handleLoginModel } = useAppContext();
    const [accounts, setAccounts] = useState([]);
    const { loading, error, data } = useFetch(
        `/users/followings/account/${user?._id}`
    );
    const navigate = useNavigate();
    const handleNavigation = () => {
        if (!user) {
            handleLoginModel();
            return;
        }
        navigate('/following');
    };
    const gotoProfile = (username, userID) => {
        navigate(`/profile/@${username}`, { state: { userID } });
    };
    useEffect(() => {
        data && setAccounts(data?.accounts);
    }, [data]);
    return (
        <Container>
            <NavContainer>
                <Link
                    className='link'
                    to='/'
                >
                    <IconButton>
                        {' '}
                        <Home className='icon ' />
                    </IconButton>
                    <NavLabel>for you</NavLabel>
                </Link>
                <NavItem
                    className='link'
                    onClick={handleNavigation}
                >
                    <IconButton className='icon '>
                        {' '}
                        <BsPeople />{' '}
                    </IconButton>
                    <NavLabel>following</NavLabel>
                </NavItem>
                <Link
                    className='link'
                    to='/explore'
                >
                    <IconButton>
                        {' '}
                        <MdOutlineExplore className='icon ' />{' '}
                    </IconButton>
                    <NavLabel>explore</NavLabel>
                </Link>
                <Link
                    className='link'
                    to='/'
                >
                    <IconButton>
                        {' '}
                        <BiVideo className='icon' />{' '}
                    </IconButton>
                    <NavLabel>live</NavLabel>
                </Link>
            </NavContainer>
            <Effect src={effect} />
            {loading ? (
                <AccountsSkeleton />
            ) : (
                <FollowingContainer>
                    {accounts.map(account => (
                        <FollowingWrapper
                            onClick={e =>
                                gotoProfile(account?.username, account?._id)
                            }
                        >
                            <IconButton>
                                <Avatar
                                    className='profile'
                                    src={account?.profilePic}
                                    alt={account?.username}
                                />
                            </IconButton>
                            <FollowingDescription>
                                <FollowingTitle>
                                    {account?.username}
                                </FollowingTitle>
                                <FollowingName>{account?.name}</FollowingName>
                            </FollowingDescription>
                        </FollowingWrapper>
                    ))}
                </FollowingContainer>
            )}
            <NavFooter />
        </Container>
    );
};

export default Sidenav;
