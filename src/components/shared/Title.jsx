import { Typography } from '@material-ui/core'

export const Title = ({ content }) => (
  <Typography variant="h4" component="h2" align="center" gutterBottom>
    {content}
  </Typography>
)
