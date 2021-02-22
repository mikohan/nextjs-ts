import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as LinkText,
  Switch,
} from '@material-ui/core';

import Link from 'next/link';
import { useAuth } from 'lib/useAuth';

export default function Header({ darckState, handleThemeChange }) {
  const classes = useStyles();
  const { user } = useAuth();

  const link = [
    !user && { label: 'Sign Up', href: '/auth/signup' },
    !user && { label: 'Sign In', href: '/auth/signin' },
    user && { label: 'Create', href: '/streams/new' },
    user && { label: 'Sing Out', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label}</Button>
        </Link>
      );
    });
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));
