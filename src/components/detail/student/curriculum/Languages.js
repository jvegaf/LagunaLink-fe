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
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuid } from 'uuid'

const useStyles = makeStyles(() => ({
  root: {},
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
  }
}))

const LanguagesWidget = ({ className, ...rest }) => {
  const classes = useStyles()
  const langs = rest.languages

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Idiomas" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={550}>
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
                      <IconButton aria-label="remove" >
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
