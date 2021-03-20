/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardHeader,
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
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { actions } from '../../../../redux/student'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  cell: {
    padding: '4px',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  head: {
    background: '#f5f5f5',
  },
  rate: {
    padding: '4px',
    lineHeight: '0.9rem'
  },
  box: {
    paddingLeft: '20px'
  }
}))

const LanguagesWidget = ({ className, ...rest }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const langs = rest.languages;
  
const handleDelete = (lang) =>{
  const langsUpd = langs.filter(language => language !== lang)
  console.log({langs: langs, lang: lang, langsUpd: langsUpd})
  dispatch(actions.updateStudent({languages: langsUpd}))
}

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Idiomas" />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box} minWidth={550}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Idioma</TableCell>
                <TableCell className={classes.cell}>Nivel Oral</TableCell>
                <TableCell className={classes.cell}>Nivel Escrito</TableCell>
                <TableCell className={classes.cell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {langs !== null &&
                langs.map(lang => (
                  <TableRow hover key={uuid()}>
                    <TableCell className={classes.cell}>{lang.name}</TableCell>
                    <TableCell className={classes.rate}>
                      <Rating value={lang.speak} readOnly />
                    </TableCell>
                    <TableCell className={classes.rate}>
                      <Rating value={lang.write} readOnly />
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
        <Button color="primary" endIcon={<Add />} size="small" variant="text">
          Agregar Idioma
        </Button>
      </Box>
    </Card>
  )
}

LanguagesWidget.propTypes = {
  className: PropTypes.string,
}

export default LanguagesWidget
