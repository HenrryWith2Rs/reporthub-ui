import React from "react"
import { tokens } from "../ThemeRegistry/theme"
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"

interface TransferListProps {
  leftItems: string[]
  setLeftItems: React.Dispatch<React.SetStateAction<string[]>>
  rightItems: string[]
  setRightItems: React.Dispatch<React.SetStateAction<string[]>>
}
function not(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) === -1)
}
function intersection(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) !== -1)
}
const TransferList: React.FC<TransferListProps> = ({
  leftItems,
  setLeftItems,
  rightItems,
  setRightItems,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // state variables
  const [checked, setChecked] = React.useState<string[]>([])
  const leftChecked = intersection(checked, leftItems)
  const rightChecked = intersection(checked, rightItems)
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const handleAllRight = () => {
    setRightItems(rightItems.concat(leftItems))
    setLeftItems([])
  }
  const handleCheckedRight = () => {
    setRightItems(rightItems.concat(leftChecked))
    setLeftItems(not(leftItems, leftChecked))
    setChecked(not(checked, leftChecked))
  }
  const handleCheckedLeft = () => {
    setLeftItems(leftItems.concat(rightChecked))
    setRightItems(not(rightItems, rightChecked))
    setChecked(not(checked, rightChecked))
  }
  const handleAllLeft = () => {
    setLeftItems(leftItems.concat(rightItems))
    setRightItems([])
  }
  return (
    <Grid container spacing={2} justifyContent="start" alignItems="center">
      <Grid item>{customList(leftItems)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleAllRight}
            disabled={leftItems.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleAllLeft}
            disabled={rightItems.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(rightItems)}</Grid>
    </Grid>
  )

  function customList(items: readonly string[]) {
    return (
      <Paper
        sx={{
          width: 200,
          height: 250,
          overflow: "auto",
          backgroundColor: colors.primary[500],
          border: `1px solid ${colors.primary[100]}`,
        }}
      >
        <List dense component="div" role="list">
          {items.map((value: string, index: number) => {
            const labelId = `transfer-list-item-${value}-label`
            return (
              <React.Fragment key={value}>
                <ListItem role="listitem" button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItem>
                {index !== items.length - 1 && <Divider />}
              </React.Fragment>
            )
          })}
        </List>
      </Paper>
    )
  }
}
export default TransferList
