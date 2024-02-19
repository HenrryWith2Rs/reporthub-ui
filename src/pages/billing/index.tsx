// billing index.tsx
import { useState, useEffect } from "react"
import { tokens } from "../../ThemeRegistry/theme"
import Header from "../../components/Header"
import {
  useTheme,
  Box,
  Stack,
  Button,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import WebIcon from "@mui/icons-material/Web"
import TableViewIcon from "@mui/icons-material/TableView"
import BarChartIcon from "@mui/icons-material/BarChart"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { DatePicker, ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers"
import {
  getLastNDays,
  formatDate,
  decreaseDateByOneDay,
  increaseDateByOneDay,
} from "../../utils/dateUtils"
import { ReportType } from "../../types/koreTypes"
import { useBillingData } from "../../data/hooks/useKoreBotData"
// import BotReport from "../../components/BotReport"
import { renderByFormat } from "../../data/utils/koreDataUtils"

const Billing = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // State variables
  const [dateStart, setDateStart] = useState<Date | null>(new Date())
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date())
  const [reportType, setReportType] = useState<ReportType>("summary")
  const [isFetchEnabled, setIsFetchEnabled] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<any | null>(null)
  const [isRenderable, setIsRenderable] = useState<boolean>(false)
  const [viewAs, setViewAs] = useState<string>("html")

  // Effect to set initial date values
  useEffect(() => {
    const { startDate, endDate } = getLastNDays(1)
    setDateStart(startDate)
    setDateEnd(endDate)
  }, [])

  // Format date values
  const formattedStartDate = formatDate(dateStart)
  const formattedEndDate = formatDate(dateEnd)

  // Fetch data using useBotData
  const { data, isFetching, error, refetch } = useBillingData(
    "billing",
    formattedStartDate,
    formattedEndDate,
    reportType,
    "json",
    isFetchEnabled
  )

  // Log loading, error, or API response
  if (isFetching) {
    console.log("Loading...")
  } else if (error) {
    console.error("Error fetching data")
  } else if (data && data !== apiResponse) {
    console.log("API Response:", data)
    setApiResponse(data)
    setIsRenderable(true)
  }
  // Handle left arrow button click
  const handleLeftArrowClick = () => {
    setDateStart(decreaseDateByOneDay(dateStart))
    setDateEnd(decreaseDateByOneDay(dateEnd))
  }

  // Handle right arrow button click
  const handleRightArrowClick = () => {
    setDateStart(increaseDateByOneDay(dateStart))
    setDateEnd(increaseDateByOneDay(dateEnd))
  }

  // Handle select change
  const handleSelectChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as ReportType)
    setIsRenderable(false)
  }

  // Handle Tabs
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setViewAs(newValue)
    // console.log("viewAs -> ", viewAs)
  }

  // Handle form submission
  const handleSubmit = () => {
    setIsFetchEnabled(true) // Enable fetching
    refetch() // Trigger API call
    setIsFetchEnabled(false) // Disable fetching once more until next submit
  }

  return (
    <Box m="20px">
      <Header title="Billing" subtitle="Kore Billing Bot reports" />
      <Box m="40px 0 0 0" height="75vh">
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleLeftArrowClick}>
            <ArrowLeftIcon />
          </IconButton>
          <DatePicker
            label="Start Date"
            format="yyyy-MM-dd"
            value={dateStart}
            onChange={(newValue) => setDateStart(newValue)}
          />
          <DatePicker
            label="End Date"
            format="yyyy-MM-dd"
            value={dateEnd}
            onChange={(newValue) => setDateEnd(newValue)}
          />
          <IconButton onClick={handleRightArrowClick}>
            <ArrowRightIcon />
          </IconButton>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Report</InputLabel>
            <Select
              value={reportType}
              label="Report"
              onChange={handleSelectChange}
            >
              <MenuItem value={"summary"}>Summary</MenuItem>
              <MenuItem value={"detailed"}>Detailed</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
        <Box m="40px 0 0 0">
          {isFetching ? (
            <CircularProgress sx={{ color: colors.greenAccent[400] }} />
          ) : error ? (
            <div>Error fetching data. Please try again.</div>
          ) : isRenderable ? (
            <Box height="100vh">
              <Tabs
                value={viewAs}
                onChange={handleTabChange}
                aria-label="icon label tabs"
                textColor="inherit"
                sx={{
                  "& .Mui-selected": {
                    color: `${colors.primary[100]}`,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: `${colors.greenAccent[400]}`,
                  },
                  marginBottom: "40px",
                }}
              >
                <Tab value="html" icon={<WebIcon />} label="HTML" />
                <Tab value="graph" icon={<BarChartIcon />} label="GRAPH" />
                <Tab value="table" icon={<TableViewIcon />} label="TABLE" />
              </Tabs>
              {renderByFormat(
                apiResponse,
                "billing",
                reportType,
                viewAs,
                formatDate(dateStart)
              )}
            </Box>
          ) : (
            <div>Click on the submit button to generate a report</div>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Billing
