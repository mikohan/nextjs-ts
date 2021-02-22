import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddStreamMutation } from 'lib/graphql/addStream.graphql';

import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
} from '@material-ui/core';

export default function CreateStream() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const router = useRouter();

  const [addStream] = useAddStreamMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // create a new stream
      const { data } = await addStream({
        variables: { input: { title, description, url } },
      });
      if (data.addStream._id) {
        router.push('/streams');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Create Strim</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5}>
            <TextField
              autoFocus
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>
          <Box pb={2.5}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
          <Box pb={2.5}>
            <TextField
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
}
