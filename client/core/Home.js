import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import socialMediaImg from './../assets/images/social-media.png';
import Grid from '@material-ui/core/Grid';
import auth from './../auth/auth-helper';
import FindPeople from './../user/FindPeople';
import Newsfeed from './../post/Newsfeed';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(2)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary,
    textAlign: 'center'
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  },
  button: {
    backgroundColor: "#009688"
  },
  cardButton: {
    display: 'flex',
    justifyContent: 'center'
  },
  textLink: {
    textDecoration: 'none'
  }
}));

export default function Home({history}){
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(()=> {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen (() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    }
  }, []);

    return (
      <div className={classes.root}>
        { !defaultPage &&
          <Grid container >
            <Grid item xs={12}>
              <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                  Post. Comment. Like. <strong>Socialize</strong>.
                </Typography>
                <CardMedia className={classes.media} image={socialMediaImg} title="Social Media illustration"/>
                <CardContent className={classes.cardButton}>
                  <Link to="/signup" className={classes.textLink}>
                    <Button size="large">Sign up</Button>
                  </Link>
                  <Link to="/signin" className={classes.textLink}>
                      <Button size="large" className={classes.button}>Sign In</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={12} sm={7} md={12} lg={8}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={12} sm={5} md={12} lg={4}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
      </div>
    );
}


