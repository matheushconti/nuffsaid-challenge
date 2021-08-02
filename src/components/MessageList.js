import React, { Component, useState, useEffect } from 'react'
import { Grid, Button, Typography, Divider, Container, makeStyles, withStyles } from '@material-ui/core'
import Api from '../api'
import MessageGrid from './MessageGrid'
import MessageSnackbar from './MessageSnackbar'
import { messageTypes } from '../consts'

const snackbarDefault = {open: false, message: ""}

const StyledButton = withStyles({
  root: {
    backgroundColor: '#88FCA3',
    fontWeight: 'bold',
    "&:hover, &:focus": {
      backgroundColor: '#6ee089'
    },
  }
})(Button)

const useStyles = makeStyles((theme) => ({
  buttonsContent: {
    marginBottom: 40,
    marginTop: 10
  }
}))

export default function MessageList(){
  const classes = useStyles()
  const [isApiStarted, setIsApiStarted] = useState(true)
  const [message, setMessage] = useState({})
  const [messagesError, setMessagesError] = useState([])
  const [messagesWarning, setMessagesWarning] = useState([])
  const [messagesInfo, setMessagesInfo] = useState([])
  const [snackbar, setSnackbar] = useState(snackbarDefault)

  const [api] = useState(new Api({
    messageCallback: (message) => {
      setMessage(message)
    },
  }))

  useEffect(() => {
    api.start()
  },[api])

  useEffect(() => {
    console.log(message)
    switch(message.priority){
      case 1:
        handleOpenSnackbar(message.message)
        setMessagesError([message, ...messagesError])
        return
      case 2:
        setMessagesWarning([message, ...messagesWarning])
        return
      case 3:
        setMessagesInfo([message, ...messagesInfo])
        return
      default:
        return
    }
  },[message])

  const handleStart = () => {
    if (isApiStarted) {
      api.stop()
    } else {
      api.start()
    }
    setIsApiStarted(!isApiStarted)
  }

  const handleClear = () => {
    setMessagesError([])
    setMessagesWarning([])
    setMessagesInfo([])
  }

  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar(snackbarDefault)
  }
  const handleOpenSnackbar = (message) => {
    setSnackbar(snackbarDefault)
    setSnackbar({open: true, message: message})
  }

  return (
    <Grid container>
      <MessageSnackbar snackbar={snackbar} handleCloseSnackbar={handleCloseSnackbar} />
      
      <Grid item xs={12}>
        <Typography gutterBottom variant="h5">
          nuffsaid.com Coding Challenge
        </Typography>
        <Divider />
      </Grid>
      <Container>
        <Grid container justifyContent="center" className={classes.buttonsContent}>
          <StyledButton
            variant="contained"
            onClick={() => handleStart()}
            style={{marginRight:10}}
          >
            {isApiStarted ? 'Stop' : 'Start'}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => handleClear()}
          >
            Clear
          </StyledButton>
        </Grid>
        <Grid container direction="row" spacing={2}>
            <MessageGrid messages={messagesError} setMessages={setMessagesError} type={messageTypes.error} />
            <MessageGrid messages={messagesWarning} setMessages={setMessagesWarning} type={messageTypes.warning} />
            <MessageGrid messages={messagesInfo} setMessages={setMessagesInfo} type={messageTypes.info} />
        </Grid>
      </Container>
    </Grid>
  )
}