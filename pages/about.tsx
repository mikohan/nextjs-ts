import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from 'next/link';

function About() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about">
          <Button variant="contained" color="primary">
            About Page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
export default About;
