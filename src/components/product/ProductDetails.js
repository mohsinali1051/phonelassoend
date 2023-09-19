import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { calculatePriceWithTwoDecimal } from "../../helper";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "lightbox2/dist/css/lightbox.min.css";
import "lightbox2/dist/js/lightbox-plus-jquery";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  tabsBar: {
    position: "relative",
    overflow: "visible",
    background: "#fff",

    "& .MuiTabs-fixed": {
      overflow: "visible !important",

      [theme.breakpoints.down("md")]: {
        "& .MuiTabs-flexContainer": {
          flexWrap: "wrap",
        },
      },
    },
  },
  tabView: {
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  tabBtn: {
    border: "1px solid #d3ced2",
    backgroundColor: "#ebe9eb",
    color: "#515151",
    display: "inline-block",
    position: "relative",
    zIndex: 0,
    borderRadius: "4px 4px 0 0",
    margin: " 0 -5px",
    padding: "0 1em",
    minWidth: "fit-content",
    textTransform: "capitalize",
    fontWeight: "bold",

    "&.Mui-selected": {
      background: "#fff",
      color: "#515151",
      zIndex: 2,
      borderBottomColor: "#fff",
    },
  },
  directionTab: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "0.4rem",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1,1fr)",
    },
    "& img": {
      height: "auto",
      maxWidth: "100%",
      padding: "4px",
      lineHeight: 1.42857143,
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const FlexWrapper = styled.div`
  margin: 20px 0 40px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  > label {
    line-height: 34px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
    text-transform: capitalize;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0 20px;
  align-items: baseline;
  flex-wrap: wrap-reverse;
`;
const Description = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
`;
const Details = styled.div`
  clear: both;
  font-size: 14px;
  margin-top: 20px;
  > ul {
    margin: 0;
    padding: 0 20px 0;
    > li {
      font-weight: bolder;
      margin-bottom: 10px;
    }
  }
`;

function ProductDetails(props) {
  const [product, setProduct] = useState(props.product);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const { classes, variants } = props;

  const handleChange = (name) => (event) => {
    const newProduct = Object.assign({ ...product }, { [name]: event.target.value });
    setProduct(newProduct);

    const index = event.target.selectedIndex;
    const selectedOption = event.target.childNodes[index];
    const sku_id = selectedOption.getAttribute("sku_id");
    const price = selectedOption.getAttribute("price");
    if (sku_id) props.updateSkuPrice(sku_id, price);
  };

  const handleQuantityChange = (e) => {
    // Get the updated quantity from the input field
    const updatedQuantity = parseInt(e.target.value, 10);

    // Check if the updated quantity is less than or equal to 0
    if (updatedQuantity <= 0) {
      // If it's negative or zero, set it to 0
      props.setQuantity(0);
    } else {
      // Otherwise, update the quantity
      props.setQuantity(updatedQuantity);
    }
  };

  return (
    <div>
      <span style={{ marginTop: "0", fontSize: "26px", fontWeight: 600,  }}>
        {product.name}
      </span>
      <p>
        <span
          style={{
            color: "#f04e25",
            fontSize: "2.25em",
            fontWeight: 400,
            
          }}
        >
          ${product.price}
        </span>{" "}
        <sub>each</sub>
      </p>
      <p style={{ fontSize: "20px", fontWeight: 600 }}>Be Fearless</p>
      <Description>{product.description}</Description>
      {product.details && (
        <Details>
          <ul>
            {product.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </Details>
      )}
      <div style={{ backgroundColor: "#f7f7f7", padding: "1px 29px 1px 30px" }}>
        {!!variants.length && (
          <FlexWrapper>
            {variants.map((variant, i) => {
              return (
                <Row key={i}>
                  <label>{variant.name.replace("_", " ")}</label>
                  <Select
                    native
                    value={product[variant.name]}
                    onChange={handleChange(variant.name)}
                    style={{
                      width: "155px",
                      fontSize: "14px",
                      height: "29px",
                    }}
                  >
                    {variant.options.map((option, j) => {
                      if (isNaN(option.label)) {
                        option.label =
                          option.label.charAt(0).toUpperCase() +
                          option.label.slice(1);
                      }
                      return (
                        <option
                          key={j}
                          value={option.label}
                          sku_id={option.sku_id}
                          price={option.price}
                        >
                          {option.label}
                        </option>
                      );
                    })}
                  </Select>
                </Row>
              );
            })}
          </FlexWrapper>
        )}

        <div style={{ fontWeight: "600", textAlign: "right" }}>
          {/* ${props.price } */}$
           {/* eslint-disable-next-line */}
          {calculatePriceWithTwoDecimal(
            // eslint-disable-next-line
            parseInt(props.quantity) * product.price
          )}
        </div>
        <Right>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.addToCart(product)}
          >
            Add To Cart
          </Button>
          <TextField
            value={props.quantity}
            onChange={handleQuantityChange}
            type="number"
            margin="normal"
            style={{ width: "40px", margin: "0 30px 0" }}
          />
        </Right>
      </div>
      <Link to="/product" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px", display: "block", marginTop: "20px" }}
          onClick={() => {
            // Add your functionality here for the "Browse Now" button.
          }}
        >
          Browse Other Items
        </Button>
      </Link>
      <AppBar
        style={{ marginTop: "30px", boxShadow: "none", overflow: "visible" }}
        position="static"
        color="default"
      >
        <Tabs
          variant="standard"
          value={value}
          onChange={handleTabChange}
          indicatorColor="none"
          textColor="primary"
          aria-label="full width tabs example"
          className={classes.tabsBar}
        >
          <Tab className={classes.tabBtn} label="More Info" {...a11yProps(0)} />
          <Tab className={classes.tabBtn} label="Q&A" {...a11yProps(1)} />
          <Tab
            className={classes.tabBtn}
            label="Directions"
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tabBtn}
            label="Installation Video"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        className={classes.tabView}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <h5>What’s in the Box Includes</h5>
          <p>{product.info_tab}</p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h5> Asked and Answered</h5>
          <div>
            {product.questions.map((question, i) => (
              <div key={i}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Q:</span>{" "}
                  {question.question}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>A:</span>{" "}
                  {question.answer}
                </p>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p>
            Before you can use Phone Lasso four ways, you have to get it on
            your phone! Once you’ve figured out where you want your patch, on
            your phone or on your case, trim if necessary so it fits just
            right. Next, peel off the backing and get ready to see that insanely
            sticky patch in action! After you’ve got your patch placed, remove
            the clip and slide the tab through your charging port. Once through
            the port, return clip and add your wrist or neck lanyard, or even
            leave it as is. You’re now ready to use it four ways, on your neck,
            wrist, waist, or gear!
          </p>
          <div className={classes.directionTab}>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step1-placement.jpg"
              data-lightbox="steps"
            >
              <img
                src="https://www.phonelasso.com/wp-content/uploads/step1-placement.jpg"
                alt="A1"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step2-trim.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step2-trim.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step3-peel.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step3-peel.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step4-stick.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step4-stick.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step5-case.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step5-case.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step6-return-carabiner.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step6-return-carabiner.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step7-wrist-strap-1.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step7-wrist-strap-1.jpg"
              />
            </a>
            <a
              href="https://www.phonelasso.com/wp-content/uploads/step8-neck.jpg"
              data-lightbox="steps"
            >
              <img
               alt="A1"
                src="https://www.phonelasso.com/wp-content/uploads/step8-neck.jpg"
              />
            </a>
          </div>
        </TabPanel>
        <TabPanel style={{ padding: 0 }} value={value} index={3}>
          <div style={{ maxWidth: "100%" }}>
            <iframe
              width="560"
              height="315"
              style={{ width: "100%" }}
              src="https://www.youtube.com/embed/C5LW-3FyCNE?si=nhPJ81BF0kX2sism"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
              allowFullScreen
            ></iframe>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default withStyles(styles)(ProductDetails);
