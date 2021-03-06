import React from 'react'
import { MDBBtn } from 'mdbreact'
import { useHistory } from 'react-router-dom'
import { useStudent } from '../../../../hooks/useStudent'
import { Title } from '../../../shared/Title'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '../../../form/TextInput'
import { RatingInput } from '../../../form/RatingInput'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    maxWidth: 600
  }
}))

export const LanguageRegister = () => {
  const classes = useStyles()
  const methods = useForm()
  const history = useHistory()
  const {addLanguage} = useStudent()

  const onSubmit = data => {
    addLanguage(data).then(status => {
      if (status === 200) {
        history.goBack()
      }
    })
  }

  return (
    <Paper className={classes.root} elevation={6}>
      <Title content="Agregar Idioma"/>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput label="Idioma" name="name"/>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12">
              <RatingInput componentName={'speak'} label={'Nivel Oral'}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <RatingInput componentName={'write'} label={'Nivel Escrito'}/>
            </div>
          </div>
          {methods.formState.isDirty && (
            <div className="text-center mt-5">
              <MDBBtn type="submit" color="default">
                Guardar
              </MDBBtn>
            </div>
          )}
        </form>
      </FormProvider>
    </Paper>
  )
}
