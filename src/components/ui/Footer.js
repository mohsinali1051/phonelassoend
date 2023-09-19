import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const styles = (theme) => ({
  footer: {
    background: "#f2f5f8",
    paddingTop: "4em",
    paddingBottom: 0,
    position: "relative",

    "& .row": {
      display: "flex",

      [theme.breakpoints.down("md")]: {
        gap: "2rem",
        flexDirection: "column"
      }
    },

    [theme.breakpoints.down("md")]: {
      "& img": {
        maxWidth: "100%"
      }
    }

  },
  socialNetworksList: {
    margin: 0,
    padding: 0,


    "& li": {
      listStyle: "none",
      display: "inline-block",
      width: "46px",
      borderRadius: "50%",
      height: "46px",
      background: "#fff",
      textAlign: "center",
      margin: "0em 0.75em 0em 0.75em",
    }
  },
  menuList: {
    flexGrow: 1,
    "& ul": {
      display: "flex",
      paddingLeft: 0,
      marginLeft: "-5px",
      listStyle: "none",


      "& a": {
        color: "#65abd0",
        fontWeight: 900,
        fontSize: "16px",
        display: "block",
        marginRight: "1.5em",
        textDecoration: "none",
      },

      [theme.breakpoints.down("md")]: {
        flexDirection: "column"
      }
    }
  },
  copyright: {
    fontWeight: 300,
    fontSize: "14px",
    textAlign: "center",
    color: "#b6c5d3",
    paddingBottom: "16px",

    "& a": {
      fontWeight: 400,
      color: "#b6c5d3",
    }
  }
});

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <Container>
        <div className="row">
          <div >
            <div id="text-2" className="widget widget_text">
              <h3 className="widgettitle">Never break another phone again</h3>
              <div className="textwidget">
                <p>
                  Screen repairs can be costly, as well as purchasing an entire
                  new phone! Secure your phone to yourself and never end up
                  needing another repair ever again.
                </p>
              </div>
            </div>
            <img
              src="https://www.phonelasso.com/wp-content/themes/Brasco-2015-Theme/img/payments-accepted.png"
              alt="Payment Methods Accepted"
              style={{
                height: "auto",
                maxWidth: "100%"
              }}
            />
          </div>
          <div>
            <a
              href="https://www.phonelasso.com/product/phone-lasso/"
              className="cta"
            >
              <img
                src="https://www.phonelasso.com/wp-content/themes/Brasco-2015-Theme/img/buy-phone-lasso-2.png"
                alt="Buy Phone Lasso"
                style={{
                  height: "auto",
                  marginTop: "3rem",

                }}
              />
            </a>
            <ul className={classes.socialNetworksList}>
              <li>
                <a
                  href="https://www.pinterest.com/phonelasso/"
                  target="_blank"
                  className="pinterest"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-pinterest"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/phonelasso/"
                  target="_blank"
                  className="instagram"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCRAGF8bQMe9lp4JkDrPjaIA/videos"
                  target="_blank"
                  className="youtube"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/PhoneLasso"
                  target="_blank"
                  className="twitter"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className={classes.menuList}>
            <ul >
              <li
                id="menu-item-969"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-160 current_page_item menu-item-969"
              >
                <a href="https://www.phonelasso.com/" aria-current="page">
                  Home
                </a>
              </li>
              <li
                id="menu-item-970"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-970"
              >
                <a href="https://www.phonelasso.com/product/phone-lasso/">
                  Buy Now
                </a>
              </li>
              <li
                id="menu-item-1451"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1451"
              >
                <a href="https://www.phonelasso.com/installation/">
                  Installation Instructions
                </a>
              </li>
              <li
                id="menu-item-518"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-518"
              >
                <a href="https://www.phonelasso.com/blog/">Blog</a>
              </li>
              <li
                id="menu-item-917"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-917"
              >
                <a href="https://www.phonelasso.com/dealers/">
                  Authorized Dealers
                </a>
              </li>
              <li
                id="menu-item-340"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-340"
              >
                <a href="https://www.phonelasso.com/contact/">Contact</a>
              </li>
              <li
                id="menu-item-338"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-338"
              >
                <a href="https://www.phonelasso.com/terms-of-use/">
                  Terms of Use
                </a>
              </li>
              <li
                id="menu-item-339"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-339"
              >
                <a href="https://www.phonelasso.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
            </ul>
            <hr style={{
              marginTop: "20px",
              marginBottom: "20px",
              border: 0,
              borderTop: "1px solid #eee"
            }} />
          </div>
        </div>
        <div className="row">
          <div style={{ marginTop: "4em", flexGrow: 1 }}>
            <p className={classes.copyright}>
              <i className="fa fa-copyright"></i> 2023 Phone Lasso. All Rights
              Reserved. <br />
              <a
                href="http://brascomarketing.com/our_design_work/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web Design
              </a>{" "}
              &amp;{" "}
              <a
                href="http://brascomarketing.com/what-we-do/web-development/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Development
              </a>{" "}
              by{" "}
              <a href="http://brascomarketing.com" rel="noopener noreferrer" target="_blank">
                Brasco <span style={{ fontWeight: 500 }}>/</span>
              </a>
            </p>
          </div>
        </div>
      </Container>
      {/* eslint-disable-next-line */}
      <a href="/#" className="scroll-up">
        <i className="fa fa-angle-up"></i>
      </a>
    </footer>
  );
};
export default withStyles(styles)(Footer);
