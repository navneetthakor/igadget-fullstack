import React, { useContext } from "react";
import laptopBanner from "../photos/laptopGridBan.png";
import BottomGrid from "./BottomGrid";
import LaptopContext from "../contexts/LaptopContext.js";
import LoadIndicator from "./LoadIndicator";
import { useNavigate } from "react-router-dom";
import CommonContext from "../contexts/CommonContext.js";

export default function LaptopGrid() {
  let { laptop, load } = useContext(LaptopContext);
  laptop = Array.from(laptop);

  // to navigate "/prods" page
  const navigate = useNavigate();

  // extracting setCommon from CommonContext
  let { setCommon } = useContext(CommonContext);

  const searchData = async () => {
    // api call
    const url = `${process.env.REACT_APP_MY_IP}/product/fetchcategoryprods?category=laptop`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCommon(data);
    navigate("/prods");
  };

  while (laptop === undefined)
    return (
      <>
        <LoadIndicator />
      </>
    );

  return (
    <>
      {load ? (
        <div style={{height: "80vh"}} className="ContainerFrame container topmargin flexCol">
          {/* ---heading for mobile devices-------- */}
          <h1 style={{marginBottom:"2vh"}} className="PrimeHeading disableCss DisBlockCss">
            Laptop Collection
          </h1>
          <div  className="gH1Image" onClick={searchData}>
            <img src={laptopBanner} alt="" />
          </div>

          {/* gottom grid  */}
          <BottomGrid iteam={laptop} />
        </div>
      ) : (
        <LoadIndicator />
      )}
    </>
  );
}
