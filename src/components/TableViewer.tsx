import React from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { tokens } from "../ThemeRegistry/theme"
import { useTheme } from "@mui/material"
import Box from "@mui/material/Box"

type TableViewerProps = {
  data: any[]
}

const columns: GridColDef[] = [
  { field: "Order", headerName: "Order", flex: 1 },
  { field: "Description", headerName: "Description", flex: 1 },
  { field: "Result", headerName: "Result", type: "number", flex: 1 },
  {
    field: "Percentage",
    headerName: "Percentage",
    type: "number",
    flex: 1,
    valueFormatter: ({ value }) => `${value}%`,
  },
  { field: "Tags", headerName: "Tags", flex: 1 },
]

const TableViewer: React.FC<TableViewerProps> = ({ data }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const rows = data.map((item) => ({
    id: item.Order, // Use the "Order" field as the id
    ...item,
    Result: parseFloat(item.Result), // Convert to number if needed
    Percentage: parseFloat(item.Percentage), // Convert to number if needed
  }))

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      width="95%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid rows={rows} columns={columns} checkboxSelection />
    </Box>
  )
}

export default TableViewer
