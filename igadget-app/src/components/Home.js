import React from 'react';
import HomeBanner from './HomeBanner';
import WatchGrid from './WatchGrid';
import MobileGrid from './MobileGrid';
import HeadPhoneGrid from './HeadPhoneGrid';
import HorizontalBanner from './HorizontalBanner';

// image to provide in horizontalbanner component 
import laptopBanner from '../photos/laptopBanner.png'
import LaptopGrid from './LaptopGrid';
import Footer from './Footer';
import Navbar from './Navbar';
export default function Home() {
  
  return (
    <div>
      <Navbar/>
      <HomeBanner/>
      <WatchGrid/>
      <MobileGrid/>
      <div className='DisableCss'>
      <HeadPhoneGrid/>
      <HorizontalBanner image={laptopBanner}/>
      </div>
      <LaptopGrid/>

      <div className='disableCss DisBlockCss'>
      <HeadPhoneGrid/>

      </div>
      <Footer/>
    </div>
  )
}
