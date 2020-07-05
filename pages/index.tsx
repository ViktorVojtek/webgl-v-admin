import React, { useState } from 'react';
import { withApollo } from '../graphql/libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import { HELLO } from '../graphql/gql/allCharacters';
import { ProtectRoute } from '../auth';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
    width: 500,
  },
}));
const IndexPage: () => JSX.Element = () => {
  const [value, setValue] = useState(0);
  const { loading, error, data } = useQuery(HELLO);
  const classes = useStyles();

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  console.log(data);
  console.log(value);

  return (
    <>
      <h1>Welcome to WebGL konfigurator admin</h1>

      <div className={classes.root}>
        <Paper square>
          <Tabs
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
        <p>{data.hello}</p>
      </div>
    </>
  );
};

export default ProtectRoute(withApollo({ ssr: true })(IndexPage));
