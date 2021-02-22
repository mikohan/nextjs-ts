import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apollo';
import { useEditStreamMutation } from 'lib/graphql/editStream.graphql';
import { useDeleteStreamMutation } from 'lib/graphql/deleteStream.graphql';
import { StreamDocument } from 'lib/graphql/stream.graphql';

import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
} from '@material-ui/core';

export default function EditStream({ id }) {
  const router = useRouter();
  const [editStream] = useEditStreamMutation();
  const [deleteStream] = useDeleteStreamMutation();
  const [state, setState] = useState({
    _id: '',
    title: '',
    description: '',
    url: '',
  });

  const { _id, title, description, url } = state;
  // fetch stream and inititalize state with properties
  const fetchStream = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: StreamDocument,
      variables: { streamId: id },
    });
    setState(data.stream);
  };

  useEffect(() => {
    fetchStream();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await editStream({
        variables: { input: { id: _id, title, description, url } },
      });
      if (data.editStream._id) {
        router.push('/stream');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onDelete = async (event) => {
    event.preventDefalt();

    try {
      const { data } = await deleteStream({
        variables: { id },
      });
      if (data.deleteStream) {
        router.push('/streams');
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Edit Stream</Typography>
        <form>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Description"
            value={description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            required
          />
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="URL"
            value={url}
            onChange={(e) => setState({ ...state, url: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Box pb={2.5} />
          <Button onClick={onDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </form>
      </Box>
    </Container>
  );
}

EditStream.getInitialProps = ({ query: { id } }) => {
  return { id };
};
