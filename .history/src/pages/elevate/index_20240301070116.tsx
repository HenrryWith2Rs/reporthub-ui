import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../ThemeRegistry/theme';

import { mockDataElevate } from '../../data/mockElevate';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

const Properties = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const properties = mockDataElevate;

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'oooRMSAvailable', headerName: 'OOO RMS Available', flex: 1 },
    { field: 'leftToSell', headerName: 'Left to Sell', flex: 1 },
    { field: 'onTheBooks', headerName: 'On the Books', flex: 1 },
    { field: 'totalOccPerc', headerName: 'Total Occ Perc', flex: 1 },
    { field: 'adr', headerName: 'ADR', flex: 1 },
    { field: 'revenue', headerName: 'Revenue', flex: 1 },
    { field: 'revPar', headerName: 'RevPar', flex: 1 },
    { field: 'groupOtb', headerName: 'Group OTB', flex: 1 },
    { field: 'groupBlock', headerName: 'Group Block', flex: 1 },
    { field: 'barOtb', headerName: 'Bar OTB', flex: 1 },
    { field: 'bar8WeekRolling', headerName: 'Bar 8 Week Rolling', flex: 1 },
    { field: 'rooms', headerName: 'Rooms', flex: 1 },
    { field: 'biForecast', headerName: 'BI Forecast', flex: 1 },
    { field: 'r28Avg', headerName: 'R28 Avg', flex: 1 },
    { field: 'optimalBar', headerName: 'Optimal Bar', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="PROPERTIES" subtitle="List of Properties" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={properties}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Properties;
