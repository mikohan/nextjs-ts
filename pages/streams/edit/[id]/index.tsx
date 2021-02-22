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
}

EditStream.getInitialProps = ({ query: { id } }) => {
  return { id };
};
