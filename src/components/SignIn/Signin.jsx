import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { ModalView } from '../ModalView/ModalView'
import { HeadTitle } from '../shared/HeadTitle'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../form/EmailInput'
import { PasswordInput } from '../form/PasswordInput'
import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      padding: '3rem',
      
    },
    button: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
      marginTop: '2rem',
      marginBottom: '2rem'
    }
  }
))

export const SignInComponent = () => {
  const classes = useStyles()
  const history = useHistory()
  const {status, setStatus, signIn} = useUser()
  const methods = useForm()
  const [modal, setModal] = useState({
    open: false,
    body: ''
  })

  const onSubmit = data => {
    setStatus(0)
    setModal({open: false, body: ''})
    signIn(data)
  }

  useEffect(() => {
    switch (status) {
      case 200:
        history.push('/main')
        break
      case 230:
        history.push('/register/student')
        break
      case 231:
        history.push('/register/company')
        break
      case 400:
        setModal({open: true, body: 'Correo o Contraseña erroneo'})
        break
      case 450:
        setModal({
          open: true,
          body: 'Necesitas verificar tu cuenta antes de ingresar'
        })
        break
    }
  }, [history, status, setModal])

  return (
    <Paper elevation={3} className={classes.root}>
      {modal.open && <ModalView open={modal.open} body={modal.body}/>}
      <HeadTitle content="Iniciar Sesion"/>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="text-center">
            <EmailInput/>
            <PasswordInput/>
            <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}>Entrar</Button>
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
