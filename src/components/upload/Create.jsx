import React, { useState } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview';
import SelectVideo from './SelectVideo';
const Wrapper = styled.div`
    flex: 3;
`;
const Create = () => {
    const [file, setFile] = useState(null);
    return (
        <Wrapper>
            {file ? (
                <PostPreview
                    file={file}
                    setFile={setFile}
                />
            ) : (
                <SelectVideo setFile={setFile} />
            )}
        </Wrapper>
    );
};

export default Create;
