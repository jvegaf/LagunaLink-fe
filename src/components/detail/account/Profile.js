import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { apiProvider } from '../../../services/api/api-provider'
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
  actions: {
    width: '100%',
  },
}))

const Profile = ({ prefName, role, avatar }) => {
  const classes = useStyles()
  const [busy, setBusy] = useState(false)

  const user = useSelector(state => state.user)
  const userRole = role === 'ROLE_STUDENT' ? 'Estudiante' : 'Empresa'
  const toggleBusy = () => setBusy(!busy)

  const handleChange = e => {
    const file = e.target.files[0]
    toggleBusy()
    const formData = new FormData()
    const element = 'image'
    formData.append(element, file)
    apiProvider
      .upload(user.userId, formData, user.token)
      .then(res => {
        if (res.status === 200) {
          toggleBusy()
        }
      })
      .catch(e => {
        toggleBusy()
        console.log({ e })
      })
  }

  const deleteAvatar = () => {
    toggleBusy()
    apiProvider.removeAvatar(user.userId, user.token)
    .then(res => {
      if (res.status === 200) {
        toggleBusy()
      }
    })}

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <ButtonBase
            disabled={busy}
            onClick={deleteAvatar}
            style={{
              width: avatar.width,
            }}
          >
            <Avatar className={classes.avatar} src={avatar} />
          </ButtonBase>
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
          <Button variant="text" color="primary" component="span" disabled={busy} fullWidth>
            Subir Imagen
          </Button>
        </label>
      </CardActions>
    </Card>
  )
}

export default Profile
