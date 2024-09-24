import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react'; // ChakraProvider 추가
import AppLayout from './AppLayout.jsx';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AppLayout />
  </ChakraProvider>
);
