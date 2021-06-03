import {
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { actions } from '../../../../redux/student'
import { FormDialog } from '../../../dialog/FormDialog'
import { LanguageForm } from '../../../form/student/language'
import { LinkCard } from '../../../shared/Card'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cell: {
    padding: '0.5em 2em',
    fontSize: '1.1rem',
    textAlign: 'center'
  },
  infocell: {
    padding: theme.spacing(0.5),
    textAlign: 'center'
  },
  actions: {
    justifyContent: 'flex-end',
  },
  head: {
    background: '#f5f5f5',
  },
  rate: {
    paddingLeft: theme.spacing(6)
  },
  box: {
    paddingLeft: '20px'
  }
}))

export const LanguagesWidget = props => {
  const { languages } = props
  const [dialog, setDialog] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  
const handleDelete = (lang) =>{
  const langsUpd = languages.filter(language => language !== lang)
  dispatch(actions.updateStudent({languages: langsUpd}))
}

const hide = () => setDialog(false)

const formProps = { hide }

const addLangprops = {
  title: 'Nuevo Idioma',
  body: <LanguageForm {...formProps} />,
  hide,
  open: dialog
}


const handleAdd = () => {
  setDialog(true)
}

  return (
    <LinkCard title="Idiomas" className={classes.root}>
      <FormDialog {...addLangprops} />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box} minWidth={550}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.infocell}>Idioma</TableCell>
                <TableCell className={classes.infocell}>Nivel Oral</TableCell>
                <TableCell className={classes.infocell}>Nivel Escrito</TableCell>
                <TableCell className={classes.infocell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {languages &&
                languages.map(lang => (
                  <TableRow hover key={uuid()}>
                    <TableCell className={classes.cell}>{lang.name}</TableCell>
                    <TableCell className={classes.rate}>
                      <Rating value={Number(lang.speak)} readOnly />
                    </TableCell>
                    <TableCell className={classes.rate}>
                      <Rating value={Number(lang.write)} readOnly />
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <IconButton aria-label="edit" >
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="remove" onClick={() => handleDelete(lang)} >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button color="primary" endIcon={<Add />} onClick={handleAdd} size="small" variant="text">
          Agregar Idioma
        </Button>
      </Box>
    </LinkCard>
  )
}
