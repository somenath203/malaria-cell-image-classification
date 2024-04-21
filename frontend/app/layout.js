'use client';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react'

import './globals.css';
import Navbar from './components/Navbar';
import store from './redux/store';


const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        <Navbar />

        <ChakraProvider>
          <Provider store={store}>{children}</Provider>
        </ChakraProvider>

        <ToastContainer />

        <script
          src="https://kit.fontawesome.com/1b20c7f767.js"
          crossOrigin="anonymous"
        ></script>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
