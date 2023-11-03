import { Bookmark, HelpCenter, Settings } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { Switch } from '@mui/material';

const Container = styled.div`
    position: absolute;
    box-shadow: 0 0 5px 2px #efefef;
    top: 60px;
    background: ${props => props.theme.bg_primary};
    right: 5px;
    width: 100vw;
    max-width: 250px;
    z-index: 1000;
    padding: 0.5rem;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const OptionsContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.text_primary};
    gap: 0.5rem;
    :hover {
        background: ${props => props.theme.gray_semi_transparent};
        color: ${props => props.theme.bg_primary};
    }
`;
const Options = styled.p`
    font-size: 1rem;

    /* color: #000000ef; */
    padding: 0.5rem;
`;
const ProfileOptions = ({ open }) => {
    const navigate = useNavigate();
    const { user, darkMode, updateDarkmode, logout } = useAppContext();
    const gotoProfileFavourites = () => {
        navigate(`/profile/@${user?.username}`, {
            state: { userID: user?._id, slug: 'favourite' },
        });
        close();
    };
    const gotoProfile = () => {
        close();
        navigate(`/profile/@${user?.username}`, {
            state: { userID: user?._id },
        });
    };
    const close = () => {
        open(false);
    };
    const gotoSettings = () => {
        close();
        console.log('dark mode');
    };
    const handleDarkMode = () => {
        close();
        updateDarkmode();
    };
    return (
        <Container>
            <OptionsContainer onClick={gotoProfile}>
                <Options>View profile</Options>
            </OptionsContainer>
            <OptionsContainer onClick={gotoProfileFavourites}>
                <Bookmark />
                <Options>Favourites</Options>
            </OptionsContainer>
            <OptionsContainer onClick={gotoSettings}>
                <Settings />
                <Options>Settings</Options>
            </OptionsContainer>
            <OptionsContainer>
                <HelpCenter />
                <Options>Feedback and help</Options>
            </OptionsContainer>
            <OptionsContainer>
                <Options>Keyboard shortcuts</Options>
            </OptionsContainer>
            <OptionsContainer>
                <Options>
                    Dark mode
                    <Switch
                        checked={darkMode}
                        onChange={handleDarkMode}
                    />{' '}
                </Options>
            </OptionsContainer>
            <OptionsContainer onClick={logout}>
                <Options>Logout</Options>
            </OptionsContainer>
        </Container>
    );
};

export default ProfileOptions;
