import React from "react"
import Button from "@mui/material/Button"
import Dialog, { DialogProps } from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"

type PopupProps = {
  data: any
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({ data, open, onClose }) => {
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper")

  const descriptionElementRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{data.date}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.resultSet.map((item: any, index: number) => (
          <ListItem key={index}>
            {item.Description}: {item.Result}
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
