// SpeedDialViewer.tsx
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import EmailIcon from "@mui/icons-material/Email"
import SaveIcon from "@mui/icons-material/Save"
import PrintIcon from "@mui/icons-material/Print"

const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <EmailIcon />, name: "Email" },
]

type SpeedDialViewerProps = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  handleAction: (actionName: string) => void
}

const SpeedDialViewer: React.FC<SpeedDialViewerProps> = ({
  open,
  handleOpen,
  handleClose,
  handleAction,
}) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="right" // Specify the direction here
      style={{ width: "70%" }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleAction(action.name)}
        />
      ))}
    </SpeedDial>
  )
}
export default SpeedDialViewer
