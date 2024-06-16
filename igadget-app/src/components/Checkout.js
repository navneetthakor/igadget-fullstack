// this is for checkout page
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

// to use store
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const product = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // --------------------------  for total--------------------------------
  const [total, setTotal] = useState(0);
  const doTotal = () => {
    let temp = 0;
    for (let i = 0; i < product.length; i++) {
      temp += product[i].prod.sellprice * product[i].ct;
    }
    setTotal(temp);
  };
  useEffect(() => {
    doTotal();
  }, []);

  // to hold address field ---------
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  // -------payment method select logic 
  const [method, setMethod] = useState("cod");
  const handleMethodSelect = (event) =>{
    if(event.target.value !== "cod") setMethod("stripe");
    else setMethod("cod");
  }

  // ----------------payment gateway logic -------------
  const makePayement = async () => {
    const stripe = await loadStripe(
      "pk_test_51OwjhnSB1xcP5JJhrmFmPewWkKnCjsIWhHjxx4k62FWW5f4IVAuH0qqxtgxnGWUv6c3N8pluVlqJ3VQzwvH7Y4oH00kk1xM2J3"
    );

    // check whethe any field is empty or not 
    for(let i in info){
      if(info[i] === "") {
        alert("please fill all the fields");
        return;
      }
    }
    // creating address Object
    const address = {
      first_name: info.first_name,
      last_name: info.last_name,
      street: info.street,
      city: info.city,
      state: info.state,
      country: info.country,
      pincode: info.pincode,
    };
    const body = {
      products: product,
      address: address,
      method: method,
      amount: total,
      mobile: info.mobile,
      email: info.email,
    };

    // creating session
    const response = await fetch(
      `${process.env.REACT_APP_MY_IP}/checkout/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "custmrtoken": localStorage.getItem("custmrtoken")
        },
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    if(session.signal === 'red'){
      alert("Server is not responding please try later!!!");
      return;
    }
    
    if(method === "cod") navigate('/Success');
    
    localStorage.setItem("custmr_session_id", session.id);
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  // if user comes back without canceling or completing payment 
  const checkoutUnsuccesful = async() => {
    if(localStorage.getItem("custmr_session_id")){

      const response2 = await fetch(`${process.env.REACT_APP_MY_IP}/payment/updatePayment`,{
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({session_id: localStorage.getItem('custmr_session_id'), status: 'Cancelled'})
      });
      const data = await response2.json();
      
      if(data.signal === "green") localStorage.removeItem("custmr_session_id");
    }
  }

  useEffect(()=>{
    checkoutUnsuccesful();
  },[]);

  // ---------------to put iteams in checkoutIteamGrid------------------------
  const placeIteams = product?.map((prod) => {
    return (
      <div id="checkoutIteam" className="flexRow">
        {/* image division  */}
        <div id="checkoutIteamImg">
          <img
            src={`${process.env.REACT_APP_MY_IP}/${prod.prod.images[0]}`.replace(
              /\\/g,
              "/"
            )}
            alt=""
          />
        </div>

        {/* content division  */}
        <div className="checkoutIteamContent flexCol">
          <h2 className="checkoutSecHeading">{prod.prod.title}</h2>
          {/* <div>height: {prod.prod.height}</div>
          <div>width: {prod.prod.width}</div> */}
        </div>

        <div className="checkoutIteamContent flexCol">
          <h2 className="checkoutSecHeading">
            Price: {prod.ct * prod.prod.sellprice}
          </h2>
          <div>Qnt: {prod.ct}</div>
        </div>
      </div>
    );
  });

  //   -----------------------------------------------------------------------------------
  //   -----------------------------Main Function----------------------------------------
  //   ----------------------------------------------------------------------------------
  return (
    <>
      <div className="flexCenter" id="chekoutOuterContainer">
        {/* --------------------------container which has all the parts in it ------------------------ */}
        <div id="checkoutInnerContainer" className="flexRow FlexCol">
          {/*---left container (it has only shiping info)--- */}
          <div id="checkoutShipping" className="checkoutShape flexCol">
            <h1 className="checkoutHeading">Shopping Cart</h1>

            {/* to place iteams  */}
            <div id="chekoutIteamGrid">{placeIteams}</div>

            {/* For printing subtotal  */}
            <div id="chekoutShippingTotal">
              <div>
                <h4>Subtotal</h4>
                <h4>{total}.00 Rs.</h4>
              </div>

              <div>
                <h4>Delivery</h4>
                <h4>0.00 Rs.</h4>
              </div>
            </div>

            {/* for printing total */}
            {/* For printing subtotal  */}
            <div id="chekoutShippingTotal" style={{ border: "transparent" }}>
              <div>
                <h4>Total</h4>
                <h4>{total}.00 Rs.</h4>
              </div>
            </div>
          </div>

          {/*---right container (it has delivery info and payment method) ---*/}
          <div id="checkoutRightCont" className="flexCol">
            {/* delivery */}
            <div id="chekcoutDelivery" className="checkoutShape">
              <h1 className="checkoutHeading">Delivery Info</h1>

              {/* for address info */}
              <div id="checkoutDeliveryInput">
                {/* for first and last name  */}
                <div className="checkout2in1">
                  <div className="flexCol">
                    <label htmlFor="fname">First Name</label>
                    <input
                      type="txt"
                      id="fname"
                      name="first_name"
                      placeholder="Navneetkumar"
                      value={info.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flexCol">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="txt"
                      id="lname"
                      name="last_name"
                      placeholder="Thakor"
                      value={info.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* for email and mobile */}
                <div className="checkout2in1">
                  <div className="flexCol">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tnavneet@gmail.com"
                      value={info.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flexCol">
                    <label htmlFor="mobilen">Mobile No.</label>
                    <input
                      type="number"
                      id="mobile"
                      name="mobile"
                      placeholder="9966996699"
                      value={info.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* for address */}
                <div className="flexCol checkout1in1">
                  <label htmlFor="address">Street</label>
                  <input
                    type="txt"
                    id="street"
                    name="street"
                    placeholder="1509, ramdevpura near khankuva, bhalej road"
                    value={info.street}
                    onChange={handleChange}
                  />
                </div>

                {/* for city and state */}
                <div className="checkout2in1">
                  <div className="flexCol">
                    <label htmlFor="city">City</label>
                    <input
                      type="txt"
                      id="city"
                      name="city"
                      placeholder="Anand"
                      value={info.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flexCol">
                    <label htmlFor="state">State</label>
                    <input
                      type="txt"
                      id="state"
                      name="state"
                      placeholder="Gujarat"
                      value={info.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* for city and state */}
                <div className="checkout2in1">
                  <div className="flexCol">
                    <label htmlFor="country">Country</label>
                    <input
                      type="txt"
                      id="country"
                      name="country"
                      placeholder="India"
                      value={info.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flexCol">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="txt"
                      id="pincode"
                      name="pincode"
                      placeholder="388205"
                      value={info.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*------------------------------------------- payment----------------------------- */}
            <div id="checkoutPayment" className="checkoutShape">
              <h1 className="checkoutHeading">Payment</h1>

              {/* patment related content  */}
              <div id="checkoutPaymentInfo">
                <p htmlFor="selectPayment">Payment Method</p>

                <div id="checkoutRadioCont" className="flexCol">
                  <div className="flexRow">
                    <input id="r1" type="radio" name="payment" value="card" onChange={handleMethodSelect} />
                    <label htmlFor="r1">Credit/Debit Card</label>
                  </div>
                  <div className="flexRow">
                    <input id="r2" type="radio" value="netBanking" name="payment" onChange={handleMethodSelect}/>
                    <label htmlFor="r2">Net Banking</label>
                  </div>
                  <div className="flexRow">
                    <input id="r3" type="radio" value="upi" name="payment" onChange={handleMethodSelect}/>
                    <label htmlFor="r3">UPI</label>
                  </div>
                  <div className="flexRow">
                    <input id="r4" type="radio" value="cod" name="payment" onChange={handleMethodSelect}/>
                    <label htmlFor="r4">Cash On Delivery</label>
                  </div>
                </div>

                <button className="primButton" onClick={makePayement}>
                  Proceed
                </button>
              </div>
            </div>

            {/* payment over */}
          </div>
        </div>
      </div>
    </>
  );
}
