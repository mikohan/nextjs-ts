import { useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';

import Posts from 'components/Posts';
import { useStreamQuery, Stream } from 'lib/graphql/stream.graphql';

export function Streams() {
  const { data, loading, refetch } = useStreamQuery({ errorPolicy: 'ignore' });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Streams</Typography>
      </Box>
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </Container>
  );
}