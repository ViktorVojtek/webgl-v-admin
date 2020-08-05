import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../../auth';

interface ILayout {
  children?: ReactNode;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      marginTop: theme.spacing(12),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default ({ children }: ILayout) => {
  const classes = useStyle();

  return (
    <Container fixed maxWidth='sm'>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Menu
          </Typography>
          <Button onClick={logoutUser} color='inherit'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>{children}</div>
    </Container>
  );
};
