import AddIcon from "@mui/icons-material/Add"
import Fab from "@mui/material/Fab"
import MuiLink  from "@mui/material/Link"
import { Link } from "react-router-dom"

type Props = {
    urlPath: string
}

export default function FloatingButton({urlPath}:Props) {
  return (
    <MuiLink component={Link} to={urlPath}>
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '2em', right: '2em' }}>
            <AddIcon/>
        </Fab>
    </MuiLink>
  
  )
}
