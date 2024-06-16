import React from "react";
import Iteam from "./Iteam";

export default function SideGrid(props) {
  let { iteam } = props;
  iteam = Array.from(iteam);

  return (
    <>
        <div className="sideGrid">
          {iteam.map((a) => {
            return <Iteam key={a._id} iteam={a} />;
          })}
        </div>
    </>
  );
}
