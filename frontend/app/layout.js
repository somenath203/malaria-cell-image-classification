'use client';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

import './globals.css';
import Navbar from './components/Navbar';
import store from './redux/store';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        <Navbar />

        <Provider store={store}>
        {children}
        </Provider>

        <script
          src="https://kit.fontawesome.com/1b20c7f767.js"
          crossOrigin="anonymous"
        ></script>

      </body>
      
    </html>
  );
}
