import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../ThemeRegistry/theme';
import { mockTransactions } from '../../data/mockData';
import {
  useAppointmentData,
  useBillingData,
} from '../../data/hooks/useKoreBotData';
import { getLastNDays, formatDate } from '../../utils/dateUtils';
import { processArrayAtIndex } from '../../data/utils/koreDataUtils';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import GeographyChart from '../../components/GeographyChart';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';

const Dashboard = () => {
  // State variables
  const [dateStart, setDateStart] = useState<Date | null>(new Date());
  const [dateEnd, setDateEnd] = useState<Date | null>(new Date());
  const [isFetchEnabled, setIsFetchEnabled] = useState<boolean>(true);
  const [apptDtldDataHolder, setApptDtldDataHolder] = useState<any | null>(
    null
  );
  const [apptSmmrDataHolder, setApptSmmrDataHolder] = useState<any | null>(
    null
  );
  const [billSmmrDataHolder, setBillSmmrDataHolder] = useState<any | null>(
    null
  );

  // Effect to set initial date values
  useEffect(() => {
    const { startDate, endDate } = getLastNDays(5);
    setDateStart(startDate);
    setDateEnd(endDate);
  }, []);

  // Format date values
  const formattedStartDate = formatDate(dateStart);
  const formattedEndDate = formatDate(dateEnd);

  /* Fetch data */
  // ApptDtld
  const {
    data: ApptDtldData,
    isFetching: ApptDtldIsFetching,
    error: ApptDtldError,
  } = useAppointmentData(
    'appointment',
    formattedStartDate,
    formattedEndDate,
    'detailed',
    'json',
    isFetchEnabled
  );

  // ApptSmmr
  const {
    data: ApptSmmrData,
    isFetching: ApptSmmrIsFetching,
    error: ApptSmmrError,
  } = useAppointmentData(
    'appointment',
    formattedStartDate,
    formattedEndDate,
    'summary',
    'json',
    isFetchEnabled
  );

  // BillSmmr
  // const {
  //   data: BillSmmrData,
  //   isFetching: BillSmmrIsFetching,
  //   error: BillSmmrError,
  // } = useBillingData(
  //   'billing',
  //   formattedStartDate,
  //   formattedEndDate,
  //   'summary',
  //   'json',
  //   isFetchEnabled
  // );

  // Log loading, error, or API response
  if (ApptSmmrIsFetching || ApptDtldIsFetching) {
    console.log('Loading...');
  } else if (ApptSmmrError || ApptDtldError) {
    console.error('Error fetching data');
  } else {
    if (ApptDtldData !== apptDtldDataHolder) {
      setApptDtldDataHolder(ApptDtldData);
      // console.log("ApptDtldData: ", ApptDtldData)
    }
    if (ApptSmmrData !== apptSmmrDataHolder) {
      setApptSmmrDataHolder(ApptSmmrData);
      // console.log("ApptSmmrData: ", ApptSmmrData)
    }
    // if (BillSmmrData !== billSmmrDataHolder) {
    //   setBillSmmrDataHolder(BillSmmrData);
    //   // console.log("BillSmmrData: ", BillSmmrData)
    // }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              apptSmmrDataHolder?.[apptSmmrDataHolder.length - 1]
                .resultSet?.[17].Result
            }
            subtitle="Appt Calls Deflected"
            progress={0.75}
            increase={
              apptSmmrDataHolder
                ? processArrayAtIndex(apptSmmrDataHolder, 17)
                : 'loading...'
            }
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              apptDtldDataHolder?.[apptDtldDataHolder.length - 1]
                .resultSet?.[28].Result
            }
            subtitle="Appt Reschedule Success"
            progress={0.75}
            increase={
              apptDtldDataHolder
                ? processArrayAtIndex(apptDtldDataHolder, 28)
                : 'loading...'
            }
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress={0.3}
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress={0.8}
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            // colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={125} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: '30px 30px 0 30px' }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} filteredData={[]} checked={false} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: '15px' }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
