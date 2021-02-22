import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
} from '@material-ui/core';

import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Stream } from 'lib/graphql/stream.graphql';

interface Props {
  stream: Stream[];
}
