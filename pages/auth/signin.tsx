import { useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
} from '@material-ui/core';
import { useAuth } from 'lib/useAuth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signIn } = useAuth();

  const onSubmit = async () => {
    event.preventDefault();
    signIn(email, password);
  };
  return (
    <Container maxWidth="sm">
      <Box my={4} />
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <Typography variant="h4">Sign In</Typography>
        <Box pb={2.5} />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          label="email"
          required
        />
      </form>
    </Container>
  );
}
