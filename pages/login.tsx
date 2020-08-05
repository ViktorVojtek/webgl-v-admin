import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { login } from '../auth';
import Layout from '../components/Layout/auth';

const useStyles = makeStyles((Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
    },
    form: {
      margin: '0 auto',
      width: '50%',
    },
    loginBtn: {
      display: 'block',
      margin: '0 auto',
    },
  })
);

export default () => {
  const classes = useStyles();

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email: string = (form.querySelector('#email') as HTMLInputElement)
      .value as string;
    const password: string = (form.querySelector(
      '#password'
    ) as HTMLInputElement).value as string;

    await login(email, password);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <form onSubmit={handleSubmitForm} className={classes.form}>
          <Typography component='h3'>Please log in</Typography>
          <div>
            <FormControl fullWidth margin='normal'>
              <TextField id='email' label='Enter email' variant='outlined' />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth margin='normal'>
              <TextField
                id='password'
                label='Enter password'
                variant='outlined'
                type='password'
              />
            </FormControl>
          </div>
          <div>
            <Button
              type='submit'
              size='large'
              variant='contained'
              color='primary'
              className={classes.loginBtn}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
