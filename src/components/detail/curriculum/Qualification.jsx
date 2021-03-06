import React from 'react'
import { useStudent } from '../../../hooks/useStudent'
import { Title } from '../../shared/Title'
import { MDBBtn } from 'mdbreact'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '../../form/TextInput'
import { useSnackbar } from 'notistack'
import { DateInput } from '../../form/DateInput'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    maxWidth: 600
  }
}))

export const Qualification = () => {
  const classes = useStyles()
  const {updateStudent, qualification} = useStudent()
  const methods = useForm({
    defaultValues: qualification
  })
  const {enqueueSnackbar} = useSnackbar()

  const onSubmit = data => {
    updateStudent(data).then(status => {
      if (status !== 200) {
        enqueueSnackbar('No se han podido guardar los cambios', {variant: 'error'})
        return
      }
      enqueueSnackbar('Cambios guardados con exito', {variant: 'success'})
      // preloadedValues = data
    })
  }

  return (
    <Paper className={classes.root} elevation={6}>
      <Title content="Titulación"/>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput label="Titulo" name="title"/>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12">
              <DateInput componentName="start_date" label="Comienzo"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DateInput componentName="end_date" label="Finalización"/>
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
