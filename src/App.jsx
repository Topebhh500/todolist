import { useState } from 'react';
import TodolistGrid from './components/TodoListGrid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Home component
function Home() {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My Todolist App
      </Typography>
      <Typography variant="body1" paragraph>
        This is a simple todo application built with React and Material UI.
        You can use it to manage your tasks efficiently.
      </Typography>
      <Typography variant="body1">
        Navigate to the "Todos" tab to start managing your tasks!
      </Typography>
    </Paper>
  );
}

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Todo Application
            </Typography>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" />
              <Tab label="Todos" />
            </Tabs>
          </Toolbar>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TodolistGrid />
        </TabPanel>
      </Container>
    </LocalizationProvider>
  );
}

export default App;