import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Logo from '../ui/image/phone-lasso.png';


import BannerHamburger from './BannerHamburger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Banner.css'; // Import your CSS file here


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    display: "flex",
    flex: 1,

  },
  storeName: {
    color: "black",
    marginTop: "16px",
    display: "inline-block"
  },
  menuButton: {
    marginRight: "30px",
    textDecoration: "none",
    color: "black"
  },
  appbar: {
    background: "transparent",
    padding: "20px 60px",
    boxShadow: "none",
    position: "absolute",
    top: "0",
    [theme.breakpoints.down('md')]: {
      padding: "20px 10px"
    }
  }
});

const Banner = ({ classes, quantity, config, width }) => {
  const externalLink = 'http://www.phonelasso.net'; // Updated link


  const number = quantity ? ` (${quantity})` : "";

  const productLink = <Link to={`/product`} style={{ flex: 1, textAlign: 'end' }} className={classes.menuButton}>
    <Typography variant="button" gutterBottom>Shop</Typography>
  </Link>

  let menu;
  if (isWidthDown('sm', width)) {
    menu = <BannerHamburger productLink={productLink} number={number} />
  } else {
    menu = (<span className={classes.buttons}>
      {productLink}
      <Link to={`/cart`} className={`${classes.menuButton} cart-button`}  style={{ marginRight: 0 }}>
        <Typography variant="button" gutterBottom>Cart{number}</Typography>
      </Link>
    </span>)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
        <a href={externalLink} target="_blank" rel="noopener noreferrer" className={classes.menuButton}>
            <div className="logo" />
            <img src={Logo} width={150} alt="yo" height={75} />
          
          </a>
          {menu}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withWidth()(withStyles(styles)(Banner));




