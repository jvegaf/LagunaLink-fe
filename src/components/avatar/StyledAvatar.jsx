import Avatar from '@material-ui/core/Avatar'
import { useOnlineAvatarStyles } from '@mui-treasury/styles/avatar/online'
import React from 'react'


export const StyledAvatar = props => {
  const { size, thickness, src } = props

  const styles = useOnlineAvatarStyles({
    color: '#8d6e63',
    size: size,
    thickness: thickness,
    gap: 1,
  })

  return (
      <div className={styles.root}>
        <Avatar src={src} />
      </div>
  )
}
