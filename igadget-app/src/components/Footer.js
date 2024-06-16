import React from "react";
import '../css/desktop.css'
import '../css/mobile.css'

export default function Footer() {

  return (
    <>
      <div id="footer" className="flexRow topmargin DisableCss">
        {/* navigation provided in footer  */}
        <div id="footnav" className="flexCol">
          <h3>navigation</h3>
          <a href="nk">Home</a>
          <a href="nk">today's deal</a>
          <a href="nk">sell</a>
          <a href="nk">customer support</a>
        </div>

        <div id="footcategory" className="flexCol">
          <h3>Categories</h3>
          <a href="nk">Watches</a>
          <a href="nk">Laptop</a>
          <a href="nk">Mobiles</a>
          <a href="nk">Head Phones</a>
        </div>

        {/* location about physical stores  */}
        <div id="footlocation" className="flexCol">
          <h3>OUr stores</h3>
          <h4>Mumbai</h4>
          <h4>Delhi</h4>
          <h4>Los Angelos</h4>
          <h4>New Yourk</h4>
          <h4>Washington</h4>
        </div>
      </div>

      {/* for mobile devices ----------- */}
      <div id="footer" className="FlexCol disableCss DisBlockCss">
        {/* navigation provided in footer  */}
        <div className="FlexRow" >
        <div id="footnav" className="flexCol FlexCenter">
          <h3>navigation</h3>
          <a href="nk">Home</a>
          <a href="nk">today's deal</a>
          <a href="nk">sell</a>
          <a href="nk">customer support</a>
        </div>

        <div id="footcategory" className="flexCol FlexCenter">
          <h3>Categories</h3>
          <a href="nk">Watches</a>
          <a href="nk">Laptop</a>
          <a href="nk">Mobiles</a>
          <a href="nk">Head Phones</a>
        </div>
        </div>

        {/* location about physical stores  */}
        <div id="footlocation" className="flexCol FlexCenter">
          <h3>OUr stores</h3>
          <h4>Mumbai</h4>
          <h4>Delhi</h4>
          <h4>Los Angelos</h4>
          <h4>New Yourk</h4>
          <h4>Washington</h4>
        </div>
      </div>
    </>
  );
}
