import { Typography, Button, Box, Grid, Paper } from '@material-ui/core';
import Link from 'next/link';

import { Theme, makeStyles } from '@material-ui/core/styles';
import { Stream } from 'lib/graphql/stream.graphql';

import { useAuth } from 'lib/useAuth';

interface Props {
  stream: Stream;
}

export default function Hero({ stream }: Props) {
  const styles = useStyles();
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
