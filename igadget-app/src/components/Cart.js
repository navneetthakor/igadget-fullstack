import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add,remove } from "../store/CartSlice";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// importing remove icon 
import removeIcon from "../photos/removeIcon.png"

export default function Cart() {
  const product = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_MY_IP}/cart/deleteToCart`


  //function to remove iteam from card
  const removeToCart = async (prod) => {
    dispatch(remove(prod.prod._id));
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "custmrtoken": localStorage.getItem("custmrtoken")
      },
      body: JSON.stringify({"product_id": prod.prod._id}),
    })
    const res = await response.json();
    console.log(res);
    if(res.signal === "red"){
      alert(res);
      dispatch(add(prod));
    }

  };

  // for navigation
  const navigate = useNavigate();

  // to navigate checkout page 
  const checkOutNavigate = () =>{
    if(product.length > 0) navigate('/checkout');
    else alert('cart is empty');
  }

  // function to display all the iteams that are in the cart
  const cards = product?.map((prodp) => {
    return (
      <div  className="fCart flexRow FlexCol">
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
            {/* <div>height: {prodp.prod.height}</div>
            <div>width: {prodp.prod.width}</div> */}
          </div>

          <div className="CartContentIteam cartIteamTitle flexCol">
            <h2 className="fCartExt checkoutSecHeading">Price: {prodp.prod.sellprice * prodp.ct}</h2>
            <div className="fCartExt">Qnt: {prodp.ct}</div>
          </div>

          <button className="secButton DisableCss" onClick={() => removeToCart(prodp)}>
            Remove
          </button>
        </div>

        {/* <button id="mobileButton" className="secButton disableCss" onClick={() => removeToCart(prodp)}>
            Remove
          </button> */}
      </div>
    );
  });
  return (
    <>
      <Navbar />
      <div id="cartPage" className=" checkoutShape">
        <div className="cartMain flexCol">
          <h1 className="checkoutHeading"> Your Cart</h1>
          {/* to add headings  */}
          <div className="cartHead flexCol">
            {cards}
          </div>

          {/* to proceed for chekout  */}

          <button
          style={{display: "inline", marginInline: "auto"}}
            className="primButton"
            onClick={() => checkOutNavigate()}
            >
            Chekout
          </button>
        </div>
      </div>
    </>
  );
}
