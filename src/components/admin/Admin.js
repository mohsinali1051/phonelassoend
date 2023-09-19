import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import AdminTable from "./AdminTable";
import PageWrapper from "../ui/PageWrapper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  ADMIN_LOGGED_IN_SECRET,
  ADMIN_LOGGED_IN_STATUS,
} from "../../constants";

function Admin(props) {
  const [viewStatus, setViewStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [shipping, setShipping] = useState([]);

  useEffect(() => {
    getOrders(viewStatus);
  }, []);
  useEffect(() => {
    let isAdminLoggedIn = localStorage.getItem(ADMIN_LOGGED_IN_STATUS);
    if (isAdminLoggedIn !== ADMIN_LOGGED_IN_SECRET) {
      props.history.push("/login");
    }
  }, []);

  const getOrders = (status) => {
    fetch("/orders/" + status, {
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.redirected) props.history.push("/login");
        else return res.json();
      })
      .then((results) => {
        if (!results) return;

        if (results.error) {
          logout();
        } else {
          console.log(results)
          const newStatuses = results.map(
            (o) => o.status || "Ordered"
          );
          const newShipping = results.map((o) => "");
          setOrders(results);
          setStatuses(newStatuses);
          setShipping(newShipping);
        }
      });
  };


  const logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    }).then((res) => {
      localStorage.removeItem(ADMIN_LOGGED_IN_STATUS);
      props.history.push("/login");
    });
  };

  const switchView = (event, view_status) => {
    setViewStatus(view_status);
    getOrders(view_status);
  };

  const updateStatus = (i, status) => {
    let newStatuses = [...statuses];
    newStatuses[i] = status;
    setStatuses(newStatuses);
  };

  const updateShipping = (i, tracking) => {
    let newOrders = [...orders];
    orders[i].shipping.tracking_number = tracking;
    setOrders(newOrders);
  };

  const updateOrder = async (index) => {
    const order = orders[index]

    fetch("/order/update/", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((json) => {
        let newOrders = [...orders];
        newOrders[index] = json;
        setOrders(newOrders);
        console.log(newOrders);
      });

  };

  return (
    <PageWrapper >
      <Paper style={{ position: "relative " }}>
        <div style={{ marginTop: "6rem" }}>
          <Button
            color="primary"
            onClick={logout}
            style={{
              position: "absolute",
              right: "20px",
              top: "10px",
              zIndex: "999",
            }}
          >
            Logout
          </Button>
          <AdminTable
            view_status={viewStatus}
            orders={orders}
            statuses={statuses}
            shipping={shipping}
            updateOrder={updateOrder}
            updateShipping={updateShipping}
            updateStatus={updateStatus}
            switchView={switchView}
          />
        </div>

      </Paper>
    </PageWrapper >
  );
}
export default withRouter(Admin);
