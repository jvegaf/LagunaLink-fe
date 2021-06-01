import Avatar from '@material-ui/core/Avatar'
import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient'
import React from 'react'


export const StyledAvatar = props => {
  const { size, thickness, src } = props

  const styles = useGradientAvatarStyles({
    size: size,
    thickness: thickness,
    gap: 1,
    gapColor: '#f4f7fa',
    color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
  })

  return (
      <div className={styles.root}>
        <Avatar src={src} />
      </div>
  )
}
