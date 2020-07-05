import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useAuth from '../auth';
import Layout from '../components/Layout/auth';

export default () => {
  const { login } = useAuth();

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const form: EventTarget & HTMLFormElement = event.currentTarget;
    const email: string = form.email.value as string;
    const password: string = form.password.value as string;

    await login(email, password);
  };

  return (
    <Layout>
      <Typography component="h3">Please log in</Typography>
      <form onSubmit={handleSubmitForm}>
        <div>
          <FormControl margin="normal">
            <TextField id="email" label="Enter email" variant="outlined" />
          </FormControl>
        </div>
        <div>
          <FormControl margin="normal">
            <TextField
              id="password"
              label="Enter password"
              variant="outlined"
              type="password"
            />
          </FormControl>
        </div>
        <div>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Layout>
  );
};
