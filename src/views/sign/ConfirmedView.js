import { Button, CardMedia, Grid, Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'



const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    height: '100%',
    flexGrow: 1,
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  card: {
    width: 1200,
    height: 500,
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    background:
      'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
      flexDirection: 'row-reverse',
    },
  },
  content: {
    marginLeft: spacing(3)
  },
  media: {
    flexShrink: 0,
    width: '30%',
    paddingTop: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.up('sm')]: {
      marginRight: 'initial',
    },
  },
  overline: {
    lineHeight: 2,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem',
    opacity: 0.7,
  },
  heading: {
    fontWeight: 900,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    paddingLeft: 32,
    paddingRight: 32,
    color: '#ffffff',
    textTransform: 'none',
    marginTop: spacing(4),
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}));

export const ConfirmedView = () => {
  const styles = useStyles()

  return (
    <Grid container className={styles.root} justify={'center'} >
      <Grid item container alignContent={'center'} lg={5} md={5} sm={7} xs={12}>
      <Card className={styles.card}>
      <CardMedia
        className={styles.media}
        image={'https://jkkm.info/ui/images/awards/victory.png'}
      />
      <CardContent className={styles.content}>
        <Typography className={styles.overline} variant={'overline'}>
          Enhorabuena
        </Typography>
        <Typography className={styles.heading} variant={'h1'} gutterBottom>
          Cuenta Confirmada
        </Typography>
        <Button className={styles.button} href='/signin'>Iniciar Sesion</Button>
      </CardContent>
    </Card>
      </Grid>
    </Grid>
  )
}
