import React, { useContext } from "react";
import SideGrid from "./SideGrid";
import headPhone from "../photos/headPhone.png";
import HeadphContext from "../contexts/HeadphContext.js"
import LoadIndicator from "./LoadIndicator";
import { useNavigate } from "react-router-dom";
import CommonContext from "../contexts/CommonContext.js";

export default function HeadPhoneGrid() {
  // taking data from context 
  let {headph, load} = useContext(HeadphContext);
  headph = Array.from(headph);

  // to navigate "/prods" page
  const navigate = useNavigate();

  // extracting setCommon from CommonContext 
  let {setCommon} = useContext(CommonContext);

  const searchData = async()=>{
    // api call
    const url = `${process.env.REACT_APP_MY_IP}/product/fetchcategoryprods?category=headph`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    setCommon(data);
    navigate('/prods');
  }

  while(headph === undefined)
    return (<><LoadIndicator/></>)

  return (
    <>
    {load ? (<div className="ContainerFrame container flexRow topmargin FlexCol">
      {/* ---heading for mobile devices-------- */}
      <h1 className="PrimeHeading disableCss DisBlockCss">HeadPh Collection</h1>

        {/* grid area for iteams */}
        <SideGrid iteam={headph} />

        {/* image division  */}
        <div className="gV1Image marginLeft DisableCss" onClick={searchData}>
          <img src={headPhone} alt="" />
        </div>
      </div>):(
        <LoadIndicator/>
      )}
      
    </>
  );
}
