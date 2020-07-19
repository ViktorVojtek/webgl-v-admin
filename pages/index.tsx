import React, { useState } from 'react';
import { withApollo } from '../graphql/libs/apollo';
import { ProtectRoute } from '../auth';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Layout from '../components/Layout';
import CreateProject from '../components/CreateProject';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
  },
  tabsPaper: {
    marginBottom: theme.spacing(3),
  },
}));

const IndexPage: () => JSX.Element = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Paper square className={classes.tabsPaper}>
          <Tabs
            centered
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Create project" />
            <Tab label="List of projects" />
          </Tabs>
        </Paper>
        {value === 0 ? <CreateProject /> : null}
      </div>
    </Layout>
  );
};

export default ProtectRoute(withApollo({ ssr: true })(IndexPage));
