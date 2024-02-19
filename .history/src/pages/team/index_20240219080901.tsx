// import { useEffect, useState } from "react"
// import {
//   Box,
//   Button,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Stack,
//   useTheme,
// } from "@mui/material"
// import { DataGrid, GridColDef } from "@mui/x-data-grid"
// import { tokens } from "../../ThemeRegistry/theme"
// import VisibilityIcon from "@mui/icons-material/Visibility"
// import EditIcon from "@mui/icons-material/Edit"
// import DeleteIcon from "@mui/icons-material/Delete"
// import SendIcon from "@mui/icons-material/Send"
// import Header from "../../components/Header"
// import { ReportType, BotType } from "../../types/koreTypes"
// import {
//   decreaseDateByOneDay,
//   formatDate,
//   getLastNDays,
//   increaseDateByOneDay,
// } from "../../utils/dateUtils"
// import {
//   useAllCouchbaseData,
//   useGetCouchbaseDataByID,
//   useDeleteCouchbaseDataByID,
// } from "../../data/hooks/useCouchbaseData"
// import { ArrowLeftIcon, ArrowRightIcon, DatePicker } from "@mui/x-date-pickers"
// import Popup from "../../components/Popup"

// const Team = () => {
//   // State variables
//   const [dateStart, setDateStart] = useState<Date | null>(new Date())
//   const [dateEnd, setDateEnd] = useState<Date | null>(new Date())
//   const [botType, setBotType] = useState<BotType>("appointment")
//   const [reportType, setReportType] = useState<ReportType>("summary")
//   const [isFetchEnabled, setIsFetchEnabled] = useState<boolean>(false)
//   const [apiResponse, setApiResponse] = useState<any | null>(null)
//   const [isRenderable, setIsRenderable] = useState<boolean>(false)
//   const [idSelected, setIdSelected] = useState<string>("")
//   const [objFetchedById, setObjFetchedById] = useState<any | null>(null)
//   const [open, setOpen] = useState<boolean>(false)

//   // Effect to set initial date values
//   useEffect(() => {
//     const { startDate, endDate } = getLastNDays(1)
//     setDateStart(startDate)
//     setDateEnd(endDate)
//   }, [])

//   // Format date values
//   const formattedStartDate = formatDate(dateStart)
//   const formattedEndDate = formatDate(dateEnd)

//   // Fetch data using hooks
//   const { data, isFetching, error, refetch } = useAllCouchbaseData(
//     botType,
//     formattedStartDate,
//     formattedEndDate,
//     reportType,
//     "json",
//     isFetchEnabled
//   )

//   // Log loading, error, or API response
//   if (isFetching) {
//     console.log("Loading...")
//   } else if (error) {
//     console.error("Error fetching data")
//   } else if (data && data !== apiResponse) {
//     console.log("API Response:", data)
//     setApiResponse(data)
//     setIsRenderable(true)
//   }
//   // Fetch one using hook
//   const { data: dataById } = useGetCouchbaseDataByID(idSelected)
//   if (dataById && dataById !== objFetchedById) {
//     console.log("Obj fetched by ID:", dataById)
//     setObjFetchedById(dataById)
//   }

//   // Delete using hook
//   const { mutateAsync: deleteMutation } = useDeleteCouchbaseDataByID(idSelected)

//   // Handle left arrow button click
//   const handleLeftArrowClick = () => {
//     setDateStart(decreaseDateByOneDay(dateStart))
//     setDateEnd(decreaseDateByOneDay(dateEnd))
//   }

//   // Handle right arrow button click
//   const handleRightArrowClick = () => {
//     setDateStart(increaseDateByOneDay(dateStart))
//     setDateEnd(increaseDateByOneDay(dateEnd))
//   }

//   // Handle bot select change
//   const handleBotSelectChange = (event: SelectChangeEvent) => {
//     setBotType(event.target.value as BotType)
//     setIsRenderable(false)
//   }

//   // Handle report select change
//   const handleReportSelectChange = (event: SelectChangeEvent) => {
//     setReportType(event.target.value as ReportType)
//     setIsRenderable(false)
//   }

//   // Handle form submission
//   const handleSubmit = () => {
//     setIsFetchEnabled(true) // Enable fetching
//     refetch() // Trigger API call
//     setIsFetchEnabled(false) // Disable fetching once more until next submit
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleRead = async (id: string) => {
//     console.log(`Read action for id: ${id}`)
//     setIdSelected(id)
//     setOpen(true)
//     try {
//       console.log(dataById)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleUpdate = async (id: string) => {
//     console.log(`Update action for id: ${id}`)
//   }

//   const handleDelete = async (id: string) => {
//     console.log(`Delete action for id: ${id}`)
//     setIdSelected(id)
//     try {
//       await deleteMutation()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const theme = useTheme()
//   const colors = tokens(theme.palette.mode)
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", flex: 1 },
//     {
//       field: "date",
//       headerName: "Date",
//       flex: 1,
//     },
//     {
//       field: "read",
//       headerName: "Read",
//       sortable: false,
//       renderCell: ({ row }) => (
//         <Button
//           startIcon={<VisibilityIcon />}
//           onClick={() => handleRead(row.id)}
//           style={{ color: colors.grey[100] }}
//         />
//       ),
//     },
//     {
//       field: "update",
//       headerName: "Update",
//       sortable: false,
//       renderCell: ({ row }) => (
//         <Button
//           startIcon={<EditIcon />}
//           onClick={() => handleUpdate(row.id)}
//           style={{ color: colors.grey[100] }}
//         />
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       sortable: false,
//       renderCell: ({ row }) => (
//         <Button
//           startIcon={<DeleteIcon />}
//           onClick={() => handleDelete(row.id)}
//           style={{ color: colors.grey[100] }}
//         />
//       ),
//     },
//   ]

//   return (
//     <Box m="20px">
//       <Header title="TEAM" subtitle="Managing the Reports" />
//       <Stack direction="row" spacing={2}>
//         <IconButton onClick={handleLeftArrowClick}>
//           <ArrowLeftIcon />
//         </IconButton>
//         <DatePicker
//           label="Start Date"
//           format="yyyy-MM-dd"
//           value={dateStart}
//           onChange={(newValue) => setDateStart(newValue)}
//         />
//         <DatePicker
//           label="End Date"
//           format="yyyy-MM-dd"
//           value={dateEnd}
//           onChange={(newValue) => setDateEnd(newValue)}
//         />
//         <IconButton onClick={handleRightArrowClick}>
//           <ArrowRightIcon />
//         </IconButton>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Bot</InputLabel>
//           <Select value={botType} label="Bot" onChange={handleBotSelectChange}>
//             <MenuItem value={"appointment"}>Appointment</MenuItem>
//             <MenuItem value={"billing"}>Billing</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Report</InputLabel>
//           <Select
//             value={reportType}
//             label="Report"
//             onChange={handleReportSelectChange}
//           >
//             <MenuItem value={"summary"}>Summary</MenuItem>
//             <MenuItem value={"detailed"}>Detailed</MenuItem>
//           </Select>
//         </FormControl>
//         <Button
//           variant="contained"
//           endIcon={<SendIcon />}
//           onClick={handleSubmit}
//         >
//           Fetch
//         </Button>
//       </Stack>
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         width="60%"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         {isRenderable ? (
//           <DataGrid
//             checkboxSelection={false}
//             rows={apiResponse}
//             columns={columns}
//           />
//         ) : (
//           <div>Click on the submit button to generate a report</div>
//         )}
//         {objFetchedById !== null && open ? (
//           <Popup data={objFetchedById} open={open} onClose={handleClose} />
//         ) : null}
//       </Box>
//     </Box>
//   )
// }

// export default Team
