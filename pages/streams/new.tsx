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
}
