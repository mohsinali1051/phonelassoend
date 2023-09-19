import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import PageWrapper from "../ui/PageWrapper";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {
  ADMIN_LOGGED_IN_SECRET,
  ADMIN_LOGGED_IN_STATUS,
} from "../../constants";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  useEffect(() => {
    let isAdminLoggedIn = localStorage.getItem(ADMIN_LOGGED_IN_STATUS);
    if (isAdminLoggedIn === ADMIN_LOGGED_IN_SECRET) {
      props.history.push("/admin");
    }
  }, []);
  const logUserIn = () => {
    setError(null);
    fetch("/api/login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.redirected) {
          localStorage.setItem(ADMIN_LOGGED_IN_STATUS, ADMIN_LOGGED_IN_SECRET);
          props.history.push("/admin");
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (!json) return;
        else if (json.error) setError(json.error.message);
      });
  };

  return (
    <PageWrapper>
      <Paper>
        <div style={{ padding: "20px" }}>
          <div style={{ display:"flex", alignItems: "end", marginTop: "5rem", marginBottom: "20px" }}>
            <span style={{ marginRight: "10px" }}>Username:</span>
            <Input
            
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ display:"flex", alignItems: "end", marginBottom: "20px" }}>
            <span style={{ marginRight: "10px" }}>Password:</span>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" color="primary" onClick={logUserIn}>
            log in
          </Button>
          <div style={{ marginTop: "20px" }}>{error}</div>
        </div>
      </Paper>
    </PageWrapper>
  );
}
export default withRouter(Login);
