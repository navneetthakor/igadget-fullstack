import React, { useLayoutEffect, useState } from 'react'

// importing photo (this is just for sample)
import Avtar from '../photos/avtar.svg';
import Navbar from './Navbar';
import CustomerLogin from './CustomerLogin';
import { useNavigate } from 'react-router-dom';

export default function UserAcount() {
    // to store user data 
    const [user, setUser] = useState();
    const getUser = async() =>{
        const url = `${process.env.REACT_APP_MY_IP}/customer/getcustmr`;
        const response = await fetch(url, {
            method :"POST",
            headers: {
                "Content-Type": "application/json",
                "custmrtoken": localStorage.getItem('custmrtoken')
              },
        });
        const data = await response.json();
        console.log(data.custmr);
        setUser(data.custmr);
    }

    // for navigation 
    const navigate = useNavigate();

    // logout button logic 
    const handleLogout = () => {
        localStorage.removeItem('custmrtoken');
        navigate('/');
    }
    

    useLayoutEffect(()=>{
        getUser();
    },[]);


  return (
    <>
   {
    user?
   (<>
    <Navbar/>
    <div id='user2OuterCont' className='flexCenter'>
        <div id='user2Container' className='flexCol' >
            <div id='user2ImgCont' className=' flexCenter'>
                <div className='flexCenter'>
                    {user.image !== "" &&    <img  src={`${process.env.REACT_APP_MY_IP}/${user.image}`.replace(/\\/g,"/")} alt=''/>}
                    {user.image === "" &&    <img  src={Avtar} alt=''/>}
                </div>
            </div>

            <h2 className='checkoutHeading' style={{marginInline: "auto"}}>{user.name}</h2>

            <div className='user2Btn checkout2in1'>
                <button className='primButton'>Purchases</button>
                <button className='primButton'>Orders</button>
            </div>
            <div className='user2Btn checkout2in1'>
                <button className='primButton'>Edit</button>
                <button className='primButton' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
    </>):(<CustomerLogin setUser={setUser} />)}
      
    </>
  )
}
