import React from 'react'
import laptop from '../photos/laptop.png'
import headPhone from '../photos/headPhone.png'
import mobilePhone from '../photos/mobilePhone.png'
import maleWatch from '../photos/maleWatch.png'
import femaleWatch from '../photos/femaleWatch.png'

export default function HomeBanGrid() {
  return (
    <>
      <div className='container' id='homeBanGrid'>
        {/* upper 2 images */}
        <div className="hgbincnt" id='hbgUpperImg'>
            <img src={maleWatch} alt=''/>
            <img src={femaleWatch} alt=''/>
        </div>

        {/* lower 3 images */}
        <div className='hgbincnt' id='hbgLowerImg'>
            <img src={laptop} alt=''/>
            <img src={headPhone} alt=''/>
            <img src={mobilePhone} alt=''/>
        </div>
      </div>
    </>
  )
}
