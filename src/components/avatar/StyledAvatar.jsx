import Avatar from '@material-ui/core/Avatar'
import { useOnlineAvatarStyles } from '@mui-treasury/styles/avatar/online'
import React from 'react'


export const StyledAvatar = props => {
  const { size, src } = props

  const styles = useOnlineAvatarStyles({
    color: '#9495c9',
    size: size,
    thickness: 4,
    gap: 2,
  })

  return (
      <div className={styles.root}>
        <Avatar src={src} />
      </div>
  )
}
