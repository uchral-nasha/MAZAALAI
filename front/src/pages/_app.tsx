import '../styles/global.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { MainLayout } from '@/layout/MainLayout';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ChakraProvider>
);

export default MyApp;
