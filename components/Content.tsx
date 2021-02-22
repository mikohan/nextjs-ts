import { makeStyles, Theme } from '@material-ui/core/styles';

type VideoProps = {
  url: string;
};

export default function Video({ url }: VideoProps) {}

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '56.25%',
    position: 'relative',
  },
  iframe: {
    border: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
}));
