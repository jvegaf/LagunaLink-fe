import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: 'flex',
    padding: spacing(2),
    borderRadius: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: '0.75rem',
  },
  rating: {
    verticalAlign: 'text-top',
  },
  content: {
    padding: spacing(0, 2),
    flexGrow: 1
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.secondary.main,
    letterSpacing: '0.5px',
    marginBottom: 0,
    flexGrow: 1,
    display: 'inline-block',
  },
  body: {
    fontSize: 22,
  },
  date: {
    fontSize: 16,
    display: 'inline-block',
    color: palette.grey[500]
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: '1rem',
  },
  footer: {
    display: 'flex',
    paddingTop: spacing(2),
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: '1.2rem',
    verticalAlign: 'bottom',
  },
}));

export const JobCard = props => {
  const { thumbnail, company, createdAt, position, id } = props
  const styles = useStyles();
  return (
    <Card className={styles.card} elevation={0}>
      <Avatar className={styles.logo} variant={'rounded'} src={thumbnail} />
      <CardContent className={styles.content}>
        <Box mb={1} display="flex">
          <h3 className={styles.heading}>{company}</h3>
          <p className={styles.date}>{createdAt}</p>
        </Box>
        <p className={styles.body}>{position}</p>
        <Divider className={styles.divider} light />
        <div className={styles.footer}>
          <Link
            className={styles.textFooter}
            component={RouterLink}
            to={`/app/detail/job_opening/${id}`}
          >
            Ver Detalle <ArrowForwardIos className={styles.icon}/>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};