import React from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div`
  padding: 40px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

const BgMountains = styled.div`
  background: url('https://www.phonelasso.com/wp-content/themes/Brasco-2015-Theme/img/internal-page-bg-5.jpg');
  width: 100%;
  height: 482px;
  background-size: cover;
  `

const Products = ({ config }) => (
  <PageWrapper>
    <BgMountains />
    <Paper
      style={{
        position: 'relative',
        top: '-200px',
        width: '90%',
        margin: 'auto'
      }}
    >
      <Wrapper >
        <h2 style={{ fontWeight: 600 }}>All Products</h2>
        <ProductList config={config} />
      </Wrapper>
    </Paper>
  </PageWrapper>
);
export default Products;