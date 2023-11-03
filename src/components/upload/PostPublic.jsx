import React from 'react';
import styled from 'styled-components';
import {} from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
const Title = styled.h3`
    color: #000000db;
    font-weight: 500;
`;
const Select = styled.select`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 0.5rem;
    background: transparent;
    color: ${props => props.theme.text_primary};
    font-size: 1.3rem;
    border: 1px solid #cdcdcd;
    text-transform: capitalize;
    outline: none;
`;
const Option = styled.option`
    background: ${props => props.theme.bg_primary};
    font-size: 1.2rem;
    text-transform: capitalize;
    border-radius: none;
`;
const PostPublic = () => {
    return (
        <Container>
            <Title>who can see this video</Title>
            <Select>
                <Option>public</Option>
                <Option>private</Option>
            </Select>
        </Container>
    );
};

export default PostPublic;
