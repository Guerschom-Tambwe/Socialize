import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import auth from './../auth/auth-helper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect} from 'react-router-dom';
import {signin} from './api-auth.js';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  });

  const [loadingState, setLoadingState] = useState(false);

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    };

    signin(user).then((data) => {
      setLoadingState(true);
      if (data.error) {
        setValues({ ...values, error: data.error});
        setLoadingState(false);
      } 
      else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true});
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  };

  const {redirectToReferrer} = values
    if (redirectToReferrer) return (<Redirect to={from}/>);

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" margin="normal" fullWidth type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" margin="normal" fullWidth type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
           {
            loadingState && 
            <CircularProgress color="secondary" size={20}/>
          } 
          Sign In</Button>
        </CardActions>
      </Card>
    );
}