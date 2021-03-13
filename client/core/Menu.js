import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import {Link, withRouter} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { ImShare2 } from "react-icons/im";

const isActive = (history, path) => {
  if (history.location.pathname == path) return {color: '#ffa726'};
  else return {color: '#ffffff'};
}

const Menu = withRouter(({history}) => (
  <AppBar position="sticky">
  <Container maxWidth="md">
    <Toolbar 
     style= {{
      display: "flex",
      justifyContent: "center"
     }}>
      <Typography variant="h4" color="inherit">
        <ImShare2 /> 
        <Link to="/" 
        style={{textDecoration: 'none', color: '#ffffff'}}>
        Socialize</Link>
      </Typography>
      {
        !auth.isAuthenticated() && history.location.pathname !== "/" && 
        (<span>
          <Link to="/signup" style= {{textDecoration: "none"}}>
            <Button style={isActive(history, "/signup")} >Sign up
            </Button>
          </Link>
          <Link to="/signin" style= {{textDecoration: "none"}}>
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id} className="text-decoration-none">
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)} >My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
    </Container>
  </AppBar>
))

export default Menu;