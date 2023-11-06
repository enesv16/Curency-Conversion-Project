import * as React from 'react';
import Routes from './routes';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  return (
    <Routes/>
  );
}
