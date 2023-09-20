import Snackbar from "@mui/material/Snackbar";
import SnackbarCloseReason from "@mui/material/SnackbarCloseReason";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Marketers() {
  const [state, setState] = useState(false)
  const [state2, setState2] = useState(true)
  type HandleClose = ((event?: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void) | undefined
  
  const handleClose:HandleClose = (_, reason)=>{

    setState(false)
    if (state2)
      alert('Hello')
  }
  return (
    <div>Marketers
      <Button onClick={()=>setState(true)}>
      submit
      </Button>
      <Snackbar
        message='Form submitted successfully'
        open={state}
        autoHideDuration={5000}
        onClose={handleClose}
        action={<button onClick={()=>{setState(false)}}>Fuck</button>}
        anchorOrigin={{ 
          horizontal: 'right',
          vertical: 'bottom'
         }}
      />
    </div>
  )
}
