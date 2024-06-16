import React, { useContext } from 'react'
import SideGrid from './SideGrid'
import mobilePhone from '../photos/mobilePhone.jpg'
import MobileContext from '../contexts/MobileContext.js';
import LoadIndicator from './LoadIndicator';
import { useNavigate } from 'react-router-dom';
import CommonContext from '../contexts/CommonContext.js';

export default function MobileGrid() {

  let {mobile, load} = useContext(MobileContext);
  mobile = Array.from(mobile);

  // to navigate "/prods" page
  const navigate = useNavigate();

  // extracting setCommon from CommonContext 
  let {setCommon} = useContext(CommonContext);

  const searchData = async()=>{
    // api call
    const url = `${process.env.REACT_APP_MY_IP}/product/fetchcategoryprods?category=mobile`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data);
    setCommon(data);
    navigate('/prods');
  }

  while(mobile === undefined)
    return (<><LoadIndicator/></>)
    
  return (
    <>
    {load ? (<div className='ContainerFrame container topmargin flexRow FlexCol'>
        {/* banner division  */}
        <div className='gV1Image marginRight DisableCss' onClick={searchData}>
            <img src={mobilePhone} alt='' />
        </div>

        {/* ---heading for mobile devices-------- */}
        <h1 className="PrimeHeading disableCss DisBlockCss">Mobile Collection</h1>
        {/* iteam division */}
        <SideGrid iteam={mobile} />
    </div>):(
      <LoadIndicator/>
    )}
    
      
    </>
  )
}
