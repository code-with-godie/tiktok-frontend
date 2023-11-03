import React from 'react';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
const Container = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: blueviolet; */
    flex-shrink: 0;
`;
const Video = styled.video`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;
const SingleVideo = url => {
    return (
        <Container>
            <Video src={url?.postUrl} />
        </Container>
    );
};

export default SingleVideo;
