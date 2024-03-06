// Dialog index.tsx
import { useState, useEffect } from 'react';
import { tokens } from '../../ThemeRegistry/theme';
import Header from '../../components/Header';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReportType } from '../../types/koreTypes';
import { getMockUCIDdata } from '../../data/mockUCIDdata';

const Dialog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variables
  const [UCID, setUCID] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [reportType, setReportType] = useState<ReportType>('summary');
  const [isFetchEnabled, setIsFetchEnabled] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [isRenderable, setIsRenderable] = useState<boolean>(false);

  // Effect to set initial date values
  useEffect(() => {}, []);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUCID(event.target.value);
  };

  // Handle select change
  const handleSelectChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as ReportType);
    setIsRenderable(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Check if UCID is 16 characters long and only alphanumeric
    if (!/^[a-zA-Z0-9]{16}$/.test(UCID)) {
      console.log('UCID', UCID);
      setErrorMsg('UCID must be 16 characters long and only alphanumeric.');
      return; // Exit the function early
    }

    // If UCID is valid, continue with the rest of the logic
    const mockData = getMockUCIDdata();
    console.log('mockData', mockData);

    const isUCIDMatch = mockData.some((item) => {
      return item.ucid === UCID; // Ensure you return the comparison result
    });

    if (!isUCIDMatch) {
      setErrorMsg('UCID not found in the db');
    } else {
      setErrorMsg(''); // Reset error message when UCID is correct
    }
  };

  return (
    <Box m="20px">
      <Header title="UCID Search" subtitle="Analyze dialog flow" />
      <Box m="40px 0 0 0" height="75vh">
        <Stack direction="row" spacing={2}>
          <TextField
            id="outlined-basic"
            label="Please Enter a UCID"
            variant="outlined"
            color="secondary"
            onChange={handleTextFieldChange}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Report</InputLabel>
            <Select
              value={reportType}
              label="Report"
              onChange={handleSelectChange}
            >
              <MenuItem value={'summary'}>Summary</MenuItem>
              <MenuItem value={'detailed'}>Detailed</MenuItem>
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
          <Box height="100vh">
            {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
          </Box>
          : (<div>Click on the submit button to generate a report</div>)
        </Box>
      </Box>
    </Box>
  );
};

export default Dialog;
