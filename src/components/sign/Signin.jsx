import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actions } from '../../redux/user'
import { AlertDialog } from '../dialog/AlertDialog'
import { EmailInput } from '../form/__shared__/EmailInput'
import { PasswordInput } from '../form/__shared__/PasswordInput'
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
    }
  }
))

export const SignInComponent = () => {
  const needStudentRegister = useSelector(state => state.user.needStudentRegister)
  const needCompanyRegister = useSelector(state => state.user.needCompanyRegister)
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  const dispatch = useDispatch()
  const classes = useStyles()
  const methods = useForm()
  const [modal, setModal] = useState({
    open: false,
    body: ''
  })

  const onSubmit = data => {
    setModal({open: false, body: ''})
    dispatch(actions.signIn(data))
  }

  if (needStudentRegister) return <Redirect to="/register/student"/>
  if (needCompanyRegister) return <Redirect to="/register/company"/>
  if (isSignedIn) return <Redirect to="/app"/>

  return (
    <Paper elevation={3} className={classes.root}>
      {modal.open && <AlertDialog body={modal.body}/>}
      <Title content="Iniciar Sesion"/>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="col">
            <div className="row justify-content-center">
              <EmailInput/>
            </div>
            <div className="row justify-content-center">
              <PasswordInput/>
            </div>
            <div className="row justify-content-center">
              <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}>Entrar</Button>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className={'justify-content-end mt-4'}>
        <Typography align={'right'}>
          ¿No tienes una cuenta? <Link href={'/signup'}>Registrate</Link>
        </Typography>
      </div>
    </Paper>
  )
}
