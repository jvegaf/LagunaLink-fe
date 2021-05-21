import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
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
    width: '50%',
  },
  actions: {
    width: '100%',
  },
}))

export const Profile = props => {
  const { userRole, prefName, avatar, isBusy } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const role = userRole === 'ROLE_STUDENT' ? 'Estudiante' : 'Empresa'

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {prefName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {role}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input accept="image/*" className={classes.input} onChange={(e) => dispatch(actions.uploadAvatar(e.target.files[0]))} id="button-file" type="file" />
        <label className={classes.actions} htmlFor="button-file">
          <Button variant="text" color="primary" component="span" disabled={isBusy} className={classes.button}>
            Subir Imagen
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => dispatch(actions.deleteAvatar())}
            disabled={avatar === '' || isBusy}
            className={classes.button}
          >
            Eliminar
          </Button>
        </label>
      </CardActions>
    </Card>
  )
}
