import React from 'react'
import { Grid, Typography, Paper, Link, makeStyles, withStyles } from '@material-ui/core'

const StyledPaper = withStyles({
  root: {
    padding: 20,
    marginBottom: 10
  },
})(Paper)

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    minHeight: 70,
  },
  clearContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
}))

export default function MessageGrid(props) {
  const classes = useStyles()
  const { message, type, removeMessage, datakey } = props

  return (
        <StyledPaper 
            style={{ backgroundColor: type.color }}
          >
            <Grid container spacing={2} alignContent="flex-end">
              <Grid sm item className={classes.messageContainer}>
                <Typography variant="body2">
                  {message.message} 
                </Typography>
              </Grid>
              <Grid item className={classes.clearContainer} >
                <Typography variant="body2">
                  <Link color="inherit" href="#" className={classes.button} onClick={() => removeMessage(datakey)}>Clear</Link> 
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>
  )

}
