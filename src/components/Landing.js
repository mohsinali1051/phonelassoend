import React from "react";
import styled from "styled-components";

import PageWrapper from "./ui/PageWrapper";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ProductList from "./product/ProductList";

const Hero = styled.div`
  height: 800px;
  background-image: url("https://www.phonelasso.com/wp-content/uploads/phone-lasso-backpacker-2.jpg");
  color: #f44336;
  font-size: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// removed below css due to scroll issue
// margin: -40px -40px 60px;
const Landing = ({ config }) => (
  <PageWrapper>
    <Paper style={{ padding: "0px" }}>
      <Hero>
        <div style={{ display: "inline-block", maxWidth: "100%" }}>
          <p>Special TV Offer</p>
        </div>
      </Hero>
      <Divider style={{ margin: "40px 0" }} />
      <ProductList config={config} />
      <ProductList config={config} />
    </Paper>
  </PageWrapper>
);

export default Landing;
