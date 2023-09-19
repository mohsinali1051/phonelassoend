import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  max-width: 100%;
  margin: 0px auto 50px;
`;

const PageWrapper = props => (
  <Wrapper>
    { props.children}
  </Wrapper>
);
export default PageWrapper;