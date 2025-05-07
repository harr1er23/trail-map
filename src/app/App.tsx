import '@mantine/core/styles.css';
import { createTheme, MantineProvider, type MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import "./index.scss";
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
    <Notifications position="top-right" />
    <AppRouter />
    </MantineProvider>
  )
}

export default App
