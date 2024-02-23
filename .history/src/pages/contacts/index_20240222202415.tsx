import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../ThemeRegistry/theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'guestName', headerName: 'Guest Name', flex: 1 },
    { field: 'guestFirstName', headerName: 'Guest First Name', flex: 1 },
    { field: 'guestLastName', headerName: 'Guest Last Name', flex: 1 },
    { field: 'checkInDate', headerName: 'Check-in Date', flex: 1 },
    { field: 'checkOutDate', headerName: 'Check-out Date', flex: 1 },
    { field: 'channel', headerName: 'Channel', flex: 1 },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      flex: 1,
      valueFormatter: ({ value }) => `$${value}`,
    },
    {
      field: 'airbnbExpectedPayoutAmount',
      headerName: 'Airbnb Expected Payout Amount',
      flex: 1,
      valueFormatter: ({ value }) => `$${value}`,
    },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'listing', headerName: 'Listing', flex: 1 },
    {
      field: 'cleaningFee',
      headerName: 'Cleaning Fee',
      flex: 1,
      valueFormatter: ({ value }) => `$${value}`,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
