import {
  Avatar,
  Box,
  Button,

  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/user'
import '../../shared/styles.css'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
  },
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 10,
    opacity: 100,
  },
  input: {
    display: 'none',
  },
  button: {
    flexGrow: 1
  },
  actions: {
    flexGrow: 1
  },
}))

const Profile = ({role, prefName, avatar, isBusy}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userRole = role === 'ROLE_STUDENT' ? 'Estudiante' : 'Empresa'
  const [file, setFile] = useState('')


  useEffect(() => {
    if (file !== '') {
      dispatch(actions.uploadAvatar(file))
    }
  }, [file])
  
  const handleChange = e => setFile(e.target.files[0])
  
  const remove = () => {
    dispatch(actions.deleteAvatar())
  }


  return (
    <Card className={classes.root}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {prefName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${userRole}`}
          </Typography>
          <Typography className={classes.dateText} color="textSecondary" variant="body1"></Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input accept="image/*" className={classes.input} onChange={handleChange} id="button-file" type="file" />
        <label className={classes.actions} htmlFor="button-file">
          <Button variant="text" color="primary" component="span" disabled={isBusy}  className={classes.button}>
            Subir Imagen
          </Button>
        </label>
        <Button variant="text" color="primary" onClick={remove} hidden={avatar === ''} component="span" disabled={isBusy} className={classes.button}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}

export default Profile
