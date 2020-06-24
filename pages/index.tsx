import { withApollo } from '../graphql/libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import { HELLO } from '../graphql/gql/allCharacters';

const IndexPage: () => JSX.Element = () => {
  const { loading, error, data } = useQuery(HELLO);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  console.log(data);

  return (
    <>
      <h1>Setting up Apollo GraphQL in Next.js with Server Side Rendering</h1>
      <div>
        <p>{data.hello}</p>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(IndexPage);
