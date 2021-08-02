import react from 'react'
import { Button, Snackbar, SnackbarContent } from '@material-ui/core'
import { messageTypes } from '../consts'

export default function MessageSnackbar(props){
  const { snackbar, handleCloseSnackbar } = props
  return (
    <Snackbar 
        open={snackbar.open} 
        key={snackbar.message} 
        onClose={handleCloseSnackbar} 
        autoHideDuration={2000} 
        anchorOrigin={{vertical: 'top',horizontal: 'right'}}
      >
        <SnackbarContent 
          style={{backgroundColor: messageTypes.error.color}}
          message= {snackbar.message}
          action={
            <Button onClick={() => handleCloseSnackbar()} color="inherit" size="small">
              X
            </Button>
          }
        />
      </Snackbar>
  )
}