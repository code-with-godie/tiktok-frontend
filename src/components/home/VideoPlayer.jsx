import { IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
    BsPause,
    BsVolumeMute,
    BsVolumeUp,
    BsFillPlayFill,
} from 'react-icons/bs';
import { useAppContext } from '../../context/AppContext';
import VideoControls from './VideoControls';
import { MoreHoriz } from '@mui/icons-material';

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
`;
const Top = styled.div``;
const VideoContainer = styled.div`
    flex: 1;
    border-radius: 0.5rem;
    position: relative;
    .icon {
        display: none;
        color: white;
    }
    &.paused .play {
        display: inline;
        pointer-events: none;
    }
    &.paused .controls-container,
    &:hover .controls-container {
        opacity: 1;
    }
    &:not(.paused) .pause {
        display: inline;
        pointer-events: none;
    }
    &.muted .mute {
        display: inline;
    }
    &:not(.muted) .unmute {
        display: inline;
    }
`;
const Video = styled.video`
    max-width: 100%;
    height: 100%;
    max-height: 600px;
    object-fit: contain;
    border-radius: 0.5rem;
    cursor: pointer;
    :hover + .overlay {
        visibility: visible;
    }
`;
const OverLay = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0.5rem;
    height: 100%;
    padding: 0.5rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* visibility: hidden; */
    /* transition: visibility 100ms; */
`;
const OverlayTop = styled.div`
    position: absolute;
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    top: 0;
    .more {
        color: white;
    }
`;
const OverlayBottom = styled.div`
    position: absolute;
    z-index: 100;
    bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
`;
const Volume = styled.input`
    flex: 1;
`;

const VideoPlayer = ({
    url,
    bookmarks,
    likes,
    postID,
    shares,
    observer,
    username,
    muted,
    userID,
    setMuted,
}) => {
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const playBtnRef = useRef(null);
    const muteBtnRef = useRef(null);

    const handlePlayAndPause = () => {
        videoContainerRef.current?.classList.toggle(
            'paused',
            videoContainerRef.current?.paused
        );
    };
    const handleVolumeChange = () => {
        videoContainerRef.current?.classList.toggle(
            'muted',
            videoContainerRef.current?.muted
        );
    };
    const handleMuteAndUnmute = () => {
        setMuted(prev => !prev);
    };
    const togglePlay = () => {
        videoRef.current?.paused
            ? videoRef.current.play()
            : videoRef.current.pause();
    };
    useEffect(() => {
        videoRef.current && observer.observe(videoRef.current);
        videoRef.current?.addEventListener('click', togglePlay);
        muteBtnRef.current?.addEventListener('click', handleMuteAndUnmute);
        videoRef.current?.addEventListener('play', handlePlayAndPause);
        videoRef.current?.addEventListener('pause', handlePlayAndPause);
        videoRef.current?.addEventListener('volumechange', handleVolumeChange);
        return () => {
            videoRef.current?.removeEventListener(
                'volumechange',
                handleVolumeChange
            );
            muteBtnRef.current?.removeEventListener(
                'click',
                handleMuteAndUnmute
            );
            videoRef.current?.removeEventListener('click', togglePlay);
            videoRef.current?.removeEventListener('play', handlePlayAndPause);
            videoRef.current?.removeEventListener('pause', handlePlayAndPause);
        };
    }, [videoRef]);

    return (
        <Container>
            <VideoContainer
                className='container paused'
                ref={videoContainerRef}
            >
                <Video
                    loop
                    muted={muted}
                    src={url}
                    ref={videoRef}
                />
                <OverlayTop>
                    <IconButton className='more'>
                        <MoreHoriz />
                    </IconButton>
                </OverlayTop>
                <OverlayBottom className='controls-container'>
                    <IconButton
                        className='icon-btn'
                        ref={playBtnRef}
                    >
                        <BsPause className='icon pause' />
                        <BsFillPlayFill className='icon play' />
                    </IconButton>
                    <IconButton
                        className='icon-btn'
                        ref={muteBtnRef}
                    >
                        <BsVolumeMute className='icon mute' />
                        <BsVolumeUp className='icon unmute' />
                    </IconButton>
                </OverlayBottom>
            </VideoContainer>
            <VideoControls
                likes={likes}
                bookmarks={bookmarks}
                shares={shares}
                username={username}
                userID={userID}
                postID={postID}
            />
        </Container>
    );
};

export default VideoPlayer;
