import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from 'react-query'
import { theme } from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={ queryClient }>
      <ChakraProvider theme={ theme }>
          <Component { ...pageProps } />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
