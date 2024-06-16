import React, { useState } from 'react'

// importing image 
import igadgeLogo from "../photos/igadgetnobg.png"
import { useNavigate } from 'react-router-dom'


export default function CustomerLogin(props) {

  // for navigation 
  const navigate = useNavigate();
  // to store user inputs 
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  })

  const handleChange =  (event) =>{
    const {name, value} = event.target;

    setdata({...data, [name]: value});
  }

  // to change logic 
  const [logic, setLogic] = useState("sign in");

  const changeLogic = () => {
    if(logic === "sign up") setLogic("sign in");
    else setLogic("sign up");
  }

  // to handle form submit 
  const handleSubmit = async () =>{
    let url = process.env.REACT_APP_MY_IP;
    if(logic === "sign up") url += "/customer/createcustmr";
    else url += "/customer/login";
    console.log(data);

    const response = await fetch(url,{
      method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":data.email, "password":data.password, "name": data.name, "mobile": data.mobile})
    });
    const res = await response.json();
    if(res.signal === "green"){
      localStorage.setItem("custmrtoken", res.custmrtoken);
      navigate(-1);
    }
    else{
      alert(res.error);
    }
  }

  return (
    <div className='loginContainer'>
      {/* left heading part  */}
      <div className='loginLeftHeading'>
        <img src={igadgeLogo} alt='igadget'/>
        <h2> Your own electronic shop</h2>
        <h3> login/signup to buy gadgets at the minimum cost</h3>
        <h3> because taking care of your budget is</h3>
        <h3> our responsibility</h3>
      </div>

      <div className='loginFormContainer'>
        <div className='loginForm'>
            <h2>{logic}</h2>


            {logic === "sign up" && <div className='loginFormField'>
                <input type='txt' id='name' name='name' value={data.name}  onChange={handleChange} required="required"/>
                <span style={{opacity: "0.5"}}>Name</span>
            </div>}
            <div className='loginFormField'>
                <input type='email' id='email' name='email' value={data.email}  onChange={handleChange} required="required"/>
                <span style={{opacity: "0.5"}}>Email</span>
            </div>
            {logic === "sign up" && <div className='loginFormField'>
                <input type='number' id='mobile' name='mobile' value={data.mobile}  onChange={handleChange} required="required"/>
                <span style={{opacity: "0.5"}}>Mobile</span>
            </div>}
            
            <div className='loginFormField'>
                <input type='password' id='password' name='password' value={data.password}  onChange={handleChange} required="required"/>
                <span style={{opacity: "0.5"}}>Password</span>
            </div>

            <div className='loginFormLink'>
              {logic === "sign in" &&   <p style={{opacity: "0.5"}}>Forgot password</p>}
                <p onClick={changeLogic}>{logic === "sign up" ? "sign in" : " sign up" }</p>
            </div>

            <button type='submit' onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  )
}
