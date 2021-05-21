import { Box, Button, CircularProgress, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actions } from '../../redux/user'
import { EmailInput } from '../form/__shared__/EmailInput'
import { PasswordInput } from '../form/__shared__/PasswordInput'
import { RememberMeCB } from '../form/__shared__/RememberMeCB'
import { Logo } from '../logo/Logo'
import { Title } from '../shared/Title'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2em',
    width: '90%',
  },
  button: {
    paddingLeft: '4em',
    paddingRight: '4em',
  },
  wrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
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
  flexCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberCnt: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    height: '80px',
    width: '80px',
  },
  titleContainer: {
    marginTop: theme.spacing(3)
  }
}))

export const SignInComponent = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const needStudentRegister = useSelector(state => state.user.needRegister)
  const needCompanyRegister = useSelector(state => state.user.needCompanyRegister)
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  const isBusy = useSelector(state => state.user.isBusy)
  const inactiveError = useSelector(state => state.user.inactiveError)
  const signinError = useSelector(state => state.user.signinError)
  const dispatch = useDispatch()
  const classes = useStyles()
  const methods = useForm()

  const onSubmit = data => {
    dispatch(actions.signIn(data))
  }

  useEffect(() => {
    dispatch(actions.getCredentials())
  }, [])

  useEffect(() => {
    if (needStudentRegister === true) {
      history.push('/register/student')
    }
  }, [needStudentRegister])

  useEffect(() => {
    if (needCompanyRegister === true) {
      history.push('/register/company')
    }
  }, [needCompanyRegister])

  useEffect(() => {
    if (isSignedIn === true) {
      history.push('/app/dashboard')
    }
  }, [isSignedIn])

  useEffect(() => {
    if (inactiveError === true) {
      enqueueSnackbar('Verificacion de Correo necesaria. Mira en tu buzon de correo', { variant: 'warning' })
    }
  }, [inactiveError])

  useEffect(() => {
    if (signinError === true) {
      enqueueSnackbar('Correo/Contrasena incorrectos', { variant: 'error' })
    }
  }, [signinError])

  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.flexCnt}>
        <Logo className={classes.logo} />
      </Box>
      <Box className={classes.titleContainer}>
        <Title content="Iniciar Sesion" />
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Grid item className={classes.flexCnt}>
              <EmailInput />
            </Grid>
            <Grid item className={classes.flexCnt}>
              <PasswordInput />
            </Grid>
            <Grid item className={classes.flexCnt}>
              <div className={classes.wrapper}>
                <Button color="primary" className={classes.button} disabled={isBusy} variant="contained" type="submit">
                  Entrar
                </Button>
                {isBusy && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
            <Grid item className={classes.rememberCnt}>
              <RememberMeCB />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Box>
        <Typography align={'right'} gutterBottom>
          ¿No tienes una cuenta? <Link href={'/signup'}>Registrate</Link>
        </Typography>
      </Box>
    </Paper>
  )
}
