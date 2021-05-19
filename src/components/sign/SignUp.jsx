import { Box, Button, CircularProgress, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions } from '../../redux/user'
import { AlertDialog } from '../dialog/AlertDialog'
import { EmailInput } from '../form/__shared__/EmailInput'
import { PasswordInput } from '../form/__shared__/PasswordInput'
import { RoleSelectInput } from '../form/__shared__/RoleSelectInput'
import { Logo } from '../logo/Logo'
import { Title } from '../shared/Title'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2em',
    width: '100%'
  },
  button: {
    paddingLeft: '4em',
    paddingRight: '4em',
    marginTop: '2em',
    marginBottom: '2em'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  logo: {
    height: '80px',
    width: '80px',
  },
  flexCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}
))

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    open: false,
    body: '',
    handleOK: null
  })
  const methods = useForm()
  const classes = useStyles()

  const isBusy = useSelector(state => state.user.isBusy)
  const isSignedUp = useSelector(state => state.user.isSignedUp)
  const prevRegisteredError = useSelector(state => state.user.prevRegisteredError)

  const onSubmit = data => {
    dispatch(actions.signUp(data))
  }

  const modalRedirect = () => history.push('/signin')

  useEffect(() => {
    if(isSignedUp === true){
      setModal({
        open: true,
        body: 'Email de confirmacion enviado. Mira en tu buzon',
        handleOK: modalRedirect
      })
    }
  }, [isSignedUp])

  useEffect(() => {
    if(prevRegisteredError === true){
      setModal({
        open: true,
        body: 'El Email ya estaba registrado anteriormente. Ingresa en tu cuenta',
        handleOK: modalRedirect
      })
    }
  }, [prevRegisteredError])

  return (
    <Paper elevation={3} className={classes.root}>
      <AlertDialog {...modal} />
      <Box className={classes.flexCnt}>
        <Logo className={classes.logo} />
      </Box>
      <Box className={classes.title}>
      <Title content="Registro nueva cuenta"/>
      </Box>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Grid item>
              <RoleSelectInput />
            </Grid>
            <Grid item>
              <EmailInput/> 
            </Grid>
            <Grid item>
              <PasswordInput/>
            </Grid>
            <Grid item className={classes.flexCnt}>
              <div className={classes.wrapper}>
                <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}>Crear Cuenta</Button>
                {isBusy && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <div className={'justify-content-end mt-4'}>
        <Typography align={'right'}>
        ¿Ya tienes una cuenta? <Link href={'/signin'}>Ingresa</Link>
        </Typography>
      </div>
    </Paper>
  )
}
