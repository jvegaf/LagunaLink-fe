import { Box, Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/user'
import { StyledAvatar } from '../../avatar/StyledAvatar'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
  },
  username: {
    fontFamily: 'Poppins',
    fontSize: '2rem',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  avatar: {
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
  const { profile, userRole, avatar, isBusy } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const role = userRole === 'ROLE_STUDENT' ? 'Estudiante' : 'Empresa'

  const userName = profile !== null ? `${profile.name} ${profile.surname || ''}` : ''

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box className={classes.avatar}>
            <StyledAvatar size={100} thickness={4} src={avatar} />
          </Box>
          <Typography color="textPrimary" gutterBottom className={classes.username}>
            {userName}
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
