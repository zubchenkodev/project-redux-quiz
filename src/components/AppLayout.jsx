import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='layout'>
        <Header/>
        <main className='container'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout