import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PageWrapper from "../ui/PageWrapper";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckoutHeader from "./CheckoutHeader";
import Email from "./Email";
import Shipping from "./Shipping";
import CreditCards from "./CreditCards";
import CartSmall from "../cart/CartSmall";
import { SHIPPING_COST } from "../../constants";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 12 * 2,
    color: theme.palette.text.secondary,
    marginBottom: "20px",
  },
  inputInfo: {
    fontSize: "16px",
    marginTop: "20px",
    color: "black",
  },
});

function Checkout(props) {
  const [items, setItems] = useState([]);
  const [pane, setPane] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState();

  const { classes, config } = props;

  useEffect(() => {
    const slug = `${props.config.store_slug}_products`;
    let newItems = JSON.parse(localStorage.getItem(slug));
    setItems(newItems ? newItems : []);
  }, []);

  const createOrder = (newAddress) => {
    setAddress(newAddress);

    if (!items.length) {
      return
    }
    const postBody = {
      items: items,
      shipping: {
        cost: SHIPPING_COST,
        name: `${newAddress.givenName} ${newAddress.familyName}`,
        address: {
          line1: newAddress.address1,
          line2: newAddress.address2,
          city: newAddress.locality,
          state: newAddress.region,
          country: "US",
          postal_code: newAddress.postalCode,
        },
      },
      email: email,
    };

    setOrder(postBody)

  };

  const setToken = (token) => {
    if (!order) {
      setError(true);
      return;
    }
    fetch("/order/pay", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        orderBody: order,
        source: token,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        const slug = `${props.config.store_slug}_products`;
        localStorage.setItem(slug, JSON.stringify([]));
        props.history.push({
          pathname: "/confirm",
          state: { order },
        });
      });
  };

  let displayAddress;
  if (address.postalCode) {
    displayAddress = (
      <div className={classes.inputInfo}>
        <div>
          {address.givenName} {address.familyName}
        </div>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>
          {address.locality}, {address.region}
        </div>
        <div>{address.postalCode}</div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <Grid
        container
        // className={classes.root}
        // spacing={5}
        direction={"row-reverse"}
        style={{ marginTop: "5rem", }}
      >
        <Grid
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          item
          md={4}
          xs={12}
        >
          <Paper className={classes.paper}>
            <CartSmall items={items} config={config} />
          </Paper>
        </Grid>
        <Grid
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
          item
          md={8}
          xs={12}
        >
          <Paper className={classes.paper}>
            <CheckoutHeader
              text={"Your Email"}
              classes={classes.heading}
              pane={0}
              currentPane={pane}
              changePane={() => setPane(0)}
            />
            {pane === 0 ? (
              <Email
                email={email}
                handleChange={setEmail}
                changePane={() => setPane(1)}
              />
            ) : (
              <div className={classes.inputInfo}>{email}</div>
            )}
          </Paper>
          <Paper className={classes.paper}>
            <CheckoutHeader
              text={"Shipping Address"}
              classes={classes.heading}
              pane={1}
              currentPane={pane}
              changePane={() => setPane(1)}
            />
            {pane === 1 ? (
              <Shipping
                address={address}
                createOrder={createOrder}
                changePane={() => setPane(2)}
              />
            ) : (
              displayAddress
            )}
          </Paper>
          <Paper className={classes.paper}>
            <CheckoutHeader
              text={"Payment"}
              classes={classes.heading}
              pane={2}
              currentPane={pane}
              changePane={() => setPane(2)}
            />
            {error && (
              <p style={{ color: "#f40" }}>
                Sorry, an error has occurred. Please refresh the page and try
                again.
              </p>
            )}
            {!error && pane === 2 && <CreditCards setToken={setToken} />}
          </Paper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
export default withRouter(withStyles(styles)(Checkout));
