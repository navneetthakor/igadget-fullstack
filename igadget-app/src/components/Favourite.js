import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fadd, fremove } from "../store/FavoriteSlice";
import { add } from "../store/CartSlice";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// importing remove icon 
import removeIcon from "../photos/removeIcon.png"

export default function Cart() {
  const product = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_MY_IP}/cart/deleteToFav`

  //function to remove iteam from card
  const removeToCart = async (prod) => {
    dispatch(fremove(prod._id));

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "custmrtoken": localStorage.getItem("custmrtoken")
      },
      body: JSON.stringify({"product_id": prod._id}),
    })
    const res = await response.json();
    console.log(res);
    if(res.signal === "red"){
      alert(res);
      dispatch(fadd(prod));
    }
  };

  // for navigation 
  const navigate = useNavigate();

//------------------function add to cart-------------------
const handleAddToCart = () =>{
    for(let i=0; i<product.length; i++){
      dispatch(add(product[i]));
    }

    navigate('/cart')
} 

  // function to display all the iteams that are in the cart
  const favs = product?.map((prodp) => {
    return (
      <div className="fCart flexRow FlexCol">
       <img className="disableCss DisBlockCss" style={{margin: "5px 15px"}} src={removeIcon} height="15px" width="15px" alt="remove" onClick={() => removeToCart(prodp)} />
        <div className="cartIteamImg ">
          <img
            src={`${process.env.REACT_APP_MY_IP}/${prodp.prod.images[0]}`.replace(/\\/g, "/")}
            alt=""
          />
        </div>

        <div className="CartContent cartIteamContent flexRow">
          <div className="CartContentIteam cartIteamTitle flexCol">
            <h2 className="checkoutSecHeading">{prodp.prod.title}</h2>
            {/* <div>height: {prodp.height}</div>
            <div>width: {prodp.width}</div> */}
          </div>

          <div className="CartContentIteam cartIteamTitle flexCol">
            <h2 className="fCartExt checkoutSecHeading">Price: {prodp.prod.sellprice * prodp.ct}</h2>
            <div className="fCartExt">Qnt: {prodp.ct}</div>
          </div>

          <button className="secButton DisableCss" onClick={() => removeToCart(prodp)}>
            Remove
          </button>
        </div>

        {/* <button style={{display:"inline", marginInline:"auto", marginBottom: "2%"}} className="secButton disableCss" onClick={() => removeToCart(prodp)}>
            Remove
          </button> */}
      </div>
    );
  });
  return (
    <>
      <Navbar/>
      <div id="cartPage" className=" checkoutShape">
        <div className="cartMain flexCol">
          <h1 className="checkoutHeading"> Your Favorites</h1>
          {/* to add headings  */}
          <div className="cartHead flexCol">
            {favs}
          </div>

          {/* to proceed for chekout  */}

          <button
            style={{display: "inline", marginInline:"auto"}}
            className="primButton"
            onClick={handleAddToCart}
            >
            Chekout
          </button>
        </div>
      </div>
    </>
  );
}
