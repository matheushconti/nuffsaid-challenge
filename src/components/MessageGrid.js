import React from 'react'
import { Grid, Typography, Link, makeStyles } from '@material-ui/core'
import Message from './Message'

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginBottom: 15
  },
  title: {
    fontWeight: 'bold'
  }
}))

export default function MessageGrid(props) {
  const classes = useStyles()
  const { messages, type, setMessages } = props

  const removeMessage = (k) => {
    let newMessage = messages.filter((item, key) => key !== k)
    setMessages(newMessage)
  }

  return (
      <Grid item xs={4}>
        <Grid className={classes.titleContainer}>
          <Typography variant="h5" className={classes.title}>
            {type.title}
          </Typography>
          <Typography variant="body2">
            {`Count ${messages.length}`}
          </Typography>
        </Grid>
        <Grid>
          {messages && messages.map((message,key) => 
            <Message 
              key={key} 
              datakey={key} 
              message={message}
              type={type}
              removeMessage={removeMessage}
            />
          )}
        </Grid>
      </Grid>
  )

}
