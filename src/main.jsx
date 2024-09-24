import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ScssTest from './ScssTest.jsx';
import { ChakraProvider } from '@chakra-ui/react'; // ChakraProvider 추가

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
)
