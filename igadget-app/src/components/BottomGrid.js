import React from "react";
import Iteam from "./Iteam";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function BottomGrid(props) {
  let { iteam } = props;
  let cnt = 0;
  iteam = Array.from(iteam);

  // for mobile-------
  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  

  return (
    <>
      {/* --desktop--- */}
      <div className="bottomGrid DisableCss">
      {iteam.map((a) => {
            return <Iteam key={a._id} iteam={a} />;
          })} 
      </div>

      {/* --Mobile -----------  */}
      <div className="HomeCarousel disableCss DisBlockCss">
        <Carousel responsive={responsive}>
          {iteam.map((a) => {
            return <Iteam key={a._id} iteam={a} />;
          })}
        </Carousel>
      </div>
    </>
  );
}


