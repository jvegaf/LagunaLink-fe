/* eslint-disable no-unused-vars */
import { Button, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailInput } from '../form/EmailInput'
import { PasswordInput } from '../form/PasswordInput'
import { RoleSelectInput } from '../form/RoleSelectInput'
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

export const SignUp = () => {
  const methods = useForm()
  const classes = useStyles()

  const onSubmit = data => {
    // signUp(data)
    //   .then(status => {
    //     if (status === 201) {
    //       setModal({
    //         open: true,
    //         body: 'Email de confirmacion enviado. Mira en tu buzon',
    //         redirect: '/signin',
    //       })
    //     }

    //     if (status === 430) {
    //       setModal({
    //         open: true,
    //         body: 'El Email ya estaba registrado. Ingresa en tu cuenta',
    //         redirect: '/signin',
    //       })
    //     }
    //   })
    //   .catch(e => console.log(e))
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Title content="Registro"/>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="col">
            <div className="row justify-content-center">
              <RoleSelectInput />
            </div>
            <div className="row justify-content-center">
              <EmailInput/> 
            </div>
            <div className="row justify-content-center">
              <PasswordInput/>
            </div>
            <div className="row justify-content-center">
              <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}>Crear Cuenta</Button>
            </div>
          </div>
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
