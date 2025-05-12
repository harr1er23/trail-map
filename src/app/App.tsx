import { createTheme, MantineProvider, type MantineColorsTuple } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import "./index.scss";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { AppRouter } from './router';

const myColor: MantineColorsTuple = [
  '#f1f1ff',
  '#e0dff2',
  '#bfbdde',
  '#9b98ca',
  '#7d79b9',
  '#6a66af',
  '#605cac',
  '#504c97',
  '#464388',
  '#3b3979'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  fontFamily: 'Open Sans, sans-serif',
});

function App() {
  return (
    <MantineProvider theme={theme}>
    <ToastContainer />
    <AppRouter />
    </MantineProvider>
  )
}

export default App
